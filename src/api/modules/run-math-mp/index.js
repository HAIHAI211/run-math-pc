import fetch from '../../config'
import config from '@/config.js'
function get (url, params) {
  return fetch(url, 'get', {params})
}
function post (url, data) {
  return fetch(url, 'post', {data})
}
const pageSize = config.pageSize
export default {
  getRules () {
    return get('/service-system/setting/rules/get')
  },
  updateRule (data) {
    return post('/service-system/setting/rules/update', data)
  },
  getDocGifts (pageNum) {
    return get('/service-system/setting/present/get', {
      pageSize,
      pageNum,
      type: 0
    })
  },
  getVideoGifts (pageNum) {
    return get('/service-system/setting/present/get', {
      pageSize,
      pageNum,
      type: 1
    })
  },
  getRealGifts (pageNum) {
    return get('/service-system/setting/present/get', {
      pageSize,
      pageNum,
      type: 2
    })
  }
}
