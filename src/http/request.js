import axios from "axios";
import store from "../store/toolkitIndex";
import { changeCancelToken } from "../store/common";
// json: 请求体为 json
// form-data 请求体为formData，用于上传文件
// blob 用于post请求下载文件，get请求则用 getUrl 获取 url 后 window.open
const requestTypeMap = {
  json: "json",
  formData: "form-data",
  arraybuffer: "arraybuffer",
  blob: "blob"
};
const baseUrl = "https://www.fastmock.site/mock/0c9368c9f0ac24733913c755609726b9";
// const baseUrl = process.env === "development" ? "http://localhost:8084" : window.location.origin;

export default class HttpRequest {
  constructor({ desc, apiCode, url, method, type, headers, params }) {
    this.xhr_desc = desc; // API 描述
    this.xhr_api_code = apiCode; // API 文档编码
    this.xhr_params = params ? params : {}; // API 入参
    this.xhr_type = type ? type : ""; // API 请求方式 json 、from-data 、blob
    this.xhr_header = this.getHeaderInType(headers); // 请求头
    this.xhr_url = url; // 请求路径
    this.xhr_method = method ? method.toLocaleLowerCase() : "get"; // 请求方式

    this.xhr_service = axios.create({
      timeout: 60000 // request timeout
    }); // axios.create

    this.cancelToken = null; // 存放取消请求方法

    this.setRequestInterceptors(); // 请求拦截
    this.setResponseInterceptors(); // 返回拦截
  }
  // 获取完整的请求 URL
  getUrl() {
    const url = this.xhr_url;
    return `${baseUrl}${url.charAt(0) === "/" ? "" : "/"}${url}`;
  }

  // 获取 headers
  getHeaderInType(headers = {}) {
    let xhr_header = {};

    switch (this.xhr_type) {
      case requestTypeMap.json:
        xhr_header = {
          "Content-Type": "application/json"
        };
        break;
      case requestTypeMap.formData:
        xhr_header = {
          "Content-Type": "multipart/form-data"
        };
        break;
      case requestTypeMap.blob:
        xhr_header = {
          responseType: "blob"
        };
        break;
      case requestTypeMap.arraybuffer:
        xhr_header = {
          responseType: "arraybuffer"
        };
        break;
      default:
        break;
    }

    return Object.assign(xhr_header, headers);
  }

  // 获取 params
  getParams(data) {
    switch (this.xhr_type) {
      case requestTypeMap.formData:
        let formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value);
        });

        return formData;
      default:
        return data;
    }
  }

  // 发起请求
  request(data) {
    if (!this.xhr_desc) {
      console.error("请填写 API 描述（desc）");
      return;
    }
    if (!this.xhr_api_code) {
      console.error(
        "请填写 接口文档 编码（https://apidoc.datastory.com.cn/doc/79vEfaoSkP => apiCode: 79vEfaoSkP）"
      );
      return;
    }

    const paramsKey = ["get", "delete"].includes(this.xhr_method) ? "params" : "data";
    const requestData = this.getParams(data);
    const url = this.getUrl();

    return this.xhr_service({
      method: this.xhr_method,
      url,
      headers: this.xhr_header,
      [paramsKey]: requestData,
      cancelToken: new axios.CancelToken((callback) => {
        this.cancelToken = callback;
        // 存至全局状态，之后做离开页面时取消所有请求功能。
        const cancelTokenList = store.getState().httpReducer.cancelTokens;
        store.dispatch(changeCancelToken([...cancelTokenList, callback]));
        // setTimeout(() => {
        //   console.log(store.getState().httpReducer.cancelTokens);
        // }, 1000);
      })
    })
      .then((res) => {
        return Promise.resolve(res);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  // 取消请求
  cancel(msg = "取消请求") {
    console.log("this.cancelToken--------------", this.cancelToken);
    this.cancelToken && this.cancelToken(msg);
  }

  // 请求拦截
  setRequestInterceptors() {
    this.xhr_service.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = localStorage.getItem("token");
        return config;
      },
      (error) => {
        throw error;
      }
    );
  }
  // 返回拦截
  setResponseInterceptors() {
    this.xhr_service.interceptors.response.use(
      (response) => {
        this.cancelToken = null;
        const code = response.data.code;
        switch (code) {
          case "A0500":
            console.error("请求服务异常");
            break;
          case "A0200":
            console.error("用户密码校验失败");
            break;
          case "A0230":
            console.error("用户登录token失效");
            localStorage.removeItem("token");
            // router.push("/login");
            break;
          case "A0300":
            console.error("访问权限未授权");
            break;
          case "A0400":
            console.error("请求参数错误");
            break;
          default:
            break;
        }
        return response.data;
      },
      (error) => {
        let message = error.message;
        if (error.message.includes("timeout")) message = "网络请求超时！";
        if (error.message.includes("Network"))
          message = window.navigator.onLine ? "服务端异常！" : "您断网了！";

        console.warn("err message", message);
        throw error;
      }
    );
  }
}

// Example --------------------------------- Start

// import DsXhr from "@/lib/xhr"

// export const requestList = new DsXhr({
//     desc: '请求列表',
//     apiCode: '79v7XKuhwb',
//     method: 'post',
//     type: 'json',
//     headers: {
//         Authorization: this.$store.state.token,
//     },
//     url: '/api/v0.1/ba/soldData/attentionList',
// });

//   xhr
//     .connect(params)
//     .then((res) => {
//       console.log('res--------------', res);
//     })
//     .catch((err) => {
//       console.log('err--------------', err);
//     });

//  xhr.cancel()  // 取消请求（需用在connect后）

// Example --------------------------------- End

// 请求 origin，本地须在 vue.config.js 配置如下代理：
// '/dev': {
//     target: "http://scrm.shendengshuju.com",
//     ws: true,
//     changOrigin: true,
//     urlRewrite: {
//       '^/dev': '',
//     },
//   },
