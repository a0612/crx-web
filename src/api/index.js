import request from './request'

request.config({
  // baseURL: 'https://pre.wwttxx2.online',
  baseURL: 'https://server.grownapp.io',
})


export default {
  getUserInfo: request.POST(`/user/info`), // 获取信息
  checkHasPlugin: request.POST(`/ai/hasInstalledPlugin`), // 获取信息
  createBot: request.POST(`/ai/createBot`), // 创建机器人
  getBot: request.POST(`/ai/getBot`), // 获取机器人信息
  platformBind: request.POST(`/platform/bind`), // 绑定/解绑第三方
  getLoginUrl: request.POST(`/platform/get_login_url`), // 获取第三方平台登录链接
  getProfile: request.POST(`/profile`), 
}
