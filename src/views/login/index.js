import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUserToken, getUserInfo } from "../../http/test";
import store from "../../store/toolkitIndex";
import { changeCancelToken } from "../../store/common";

function Login() {
  let username = "admin1";
  let password = "123456";
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
    if (getUserToken.cancelToken) {
      getUserToken.cancelToken();
    }
    getUserToken
      .request({ username, password })
      .then((res) => {
        if (res.code === "200") {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("auth", res.data.auth);
          // 跳转
          const redirect = search.get("redirect") || "/";
          navigate(redirect, { replace: true });
        }
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
