import request from './request'

request.config({
  baseURL: 'https://pre.wwttxx2.online',
})


export default {
  getUserInfo: request.POST(`/user/info`), // 获取信息
  createBot: request.POST(`/ai/createBot`), // 创建机器人
  getBot: request.POST(`/ai/getBot`), // 获取机器人信息
  platformBind: request.POST(`/platform/bind`), // 绑定/解绑第三方
  // platformBind: request.POST(`/platform/bind`), // 解除绑定
}
