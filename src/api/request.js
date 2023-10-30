import axios from 'axios'
import * as qs from 'qs'
import Cookies from 'js-cookie';

let userConfig = {}

const axiosRequest =
  (method) =>
  (url, requestConfig) =>
  (data = {}) => {
    const isNeedBody = ['post', 'put', 'patch'].find((m) => m === method.toLowerCase())
    const headers = requestConfig?.headers || {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      'token': Cookies.get('token')
    }
    //支持多种content-type 数据传输
    const isJsonContentType = !/application\/x-www-form-urlencoded/.test(headers['Content-Type'])
    const jsonContentTypeData = isJsonContentType ? { data } : { data: qs.stringify(data, { arrayFormat: 'repeat' }) }
    const requestParams = isNeedBody ? jsonContentTypeData : { params: data }
    // 链接/{param}方式传参处理
    if (url) {
      url = url.replace(/{(\w+)}/g, (a, b) => {
        const m = data[b]
        delete data[b]
        return m
      })
    }
    return axios({
      method,
      url,
      withCredentials: true,
      headers,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
      ...requestParams,
      ...userConfig,
      ...requestConfig,
    })
  }

const config = (c) => {
  userConfig = c
}

export default {
  axios,
  config,
  GET: axiosRequest('get'),
  POST: axiosRequest('post'),
  DELETE: axiosRequest('delete'),
  PUT: axiosRequest('put'),
  PATCH: axiosRequest('patch'),
}
