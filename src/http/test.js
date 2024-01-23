import HttpRequest from "./request";

export const getUserToken = new HttpRequest({
  desc: '请求登录',
  apiCode: '79v7XKuhwb',
  method: 'post',
  type: 'json',
  headers: {
    Authorization: 'user token'
  },
  params: {},
  url: '/api_v1/login'
})

export const getUserInfo = new HttpRequest({
  desc: '请求用户信息',
  apiCode: '79v7XKuhwb',
  method: 'post',
  type: 'json',
  headers: {
    Authorization: 'user token'
  },
  params: {},
  url: '/api_v1/login'
})