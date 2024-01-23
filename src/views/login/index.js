import { getUserToken, getUserInfo } from "../../http/test";
import { useEffect } from "react";
import store from "../../store/toolkitIndex";
import { changeCancelToken } from "../../store/common";

function Login() {
  let username = "admin1";
  let password = "123456";

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
    if (getUserToken.cancelToken) {
      getUserToken.cancelToken();
    }
    getUserToken
      .request({ username, password })
      .then((res) => {
        if (res.code === "200") {
          console.log(res);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.username);
        }
        console.log("登录请求完成");
        // router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
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
