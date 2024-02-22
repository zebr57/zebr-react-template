import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import { getUserInfo } from "../../http/test";
import store from "../../store/toolkitIndex";
import { changeCancelToken } from "../../store/common";

import { Button, Form, Input, Flex } from "antd";

function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [search] = useSearchParams();
  // 组件挂载
  useEffect(() => {
    console.log("effect");
    // getUserInfo
    //   .request()
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
  /* ===================================== Form submit ===================================== */
  // 提交成功
  const onFinish = (values) => {
    // console.log("Success:", values);
    handleLogin(values);
  };
  // 提交失败
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };
  const handleLogin = ({ username, password }) => {
    if (password === "abc123") {
      const res = {
        code: "200",
        data: {
          username,
          token: "usertoken",
          auth: "userInfo,menu:son1,menu:son2"
        },
        message: "登录成功"
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
    <Flex
      style={{
        height: "100vh",
        with: "100%"
      }}
      justify={"center"}
      align={"center"}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8
        }}
        wrapperCol={{
          span: 16
        }}
        style={{
          maxWidth: 400
        }}
        initialValues={{
          remember: true
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!"
            }
          ]}
        >
          <Input placeholder="请输入用户名" autoComplete="on" />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!"
            }
          ]}
        >
          <Input.Password autoComplete="on" placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            onClick={() => setLoading(true)}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}

export default Login;
