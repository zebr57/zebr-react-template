import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUserInfo } from "../../http/test";
import store from "../../store/toolkitIndex";
import { changeCancelToken } from "../../store/common";

function Login() {
  let username = "admin";
  let password = "abc123";
  const navigate = useNavigate();
  const [search] = useSearchParams();
  // 组件挂载
  useEffect(() => {
    console.log("effect");
    getUserInfo
      .request()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // 组件摧毁
  useEffect(() => {
    return () => {
      cancelAllRequest();
    };
  }, []);

  // 取消所有请求
  const cancelAllRequest = () => {
    const cancelTokenList = store.getState().httpReducer.cancelTokens;
    cancelTokenList.forEach((cb) => cb());
    store.dispatch(changeCancelToken([]));
  };

  const handleLogin = () => {
    if (password === "abc123") {
      const res = {
        code: "200",
        data: {
          username,
          token: "usertoken",
          auth: "userInfo,menu:son1,menu:son2",
        },
        message: "登录成功",
      };
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("auth", res.data.auth);
      // 跳转
      const redirect = search.get("redirect") || "/";
      navigate(redirect, { replace: true });
    }

    /* =====================================  ===================================== */
    // fastMock官网发布说明：关闭服务，所有请求返回404
    // if (getUserToken.cancelToken) {
    //   getUserToken.cancelToken();
    // }
    // getUserToken
    //   .request({ username, password })
    //   .then((res) => {
    //     if (res.code === "200") {
    //       localStorage.setItem("token", res.data.token);
    //       localStorage.setItem("username", res.data.username);
    //       localStorage.setItem("auth", res.data.auth);
    //       // 跳转
    //       const redirect = search.get("redirect") || "/";
    //       navigate(redirect, { replace: true });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div>
      用户名：
      <input
        onInput={(e) => {
          username = e.target.value;
        }}
      ></input>
      密码：
      <input
        onInput={(e) => {
          password = e.target.value;
        }}
      ></input>
      <button onClick={handleLogin}>登录</button>
      <button onClick={cancelAllRequest}>取消所有请求</button>
    </div>
  );
}

export default Login;
