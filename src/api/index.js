import request from './request'

request.config({
  baseURL: 'https://pre.wwttxx2.online',
})


export default {
  getUserInfo: request.POST(`/user/info`), // 获取信息
  setUserInfo: request.POST(`/profile/edit`), // 编辑个人信息
}
