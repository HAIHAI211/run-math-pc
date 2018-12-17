import axios from 'axios'
import store from '../store'
import {Message} from 'element-ui'
const config = {
  // baseURL: 'http://192.168.40.188:9999/service-system',
  timeout: 6000
}
const instance = axios.create(config)

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  store.state.loading = true
  return config
}, function (error) {
  // 对请求错误做些什么
  store.state.loading = false
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  store.state.loading = false
  // 对响应数据做点什么
  if (response.data && response.data.code === 0) { // 成功
    return response.data
  }
  // this.$message.error(response.data.errMsg)
  Message.error({
    showClose: true,
    message: response.data.data.detailMessage || response.data.msg
  })
  return Promise.reject(response.data)
}, function (error) {
  store.state.loading = false
  // 对响应错误做点什么
  Message.error({
    showClose: true,
    message: error.message
  })
  return Promise.reject(error)
})

export default function (url, method, config = {}) {
  return instance({
    url,
    method,
    ...config
  })
}
