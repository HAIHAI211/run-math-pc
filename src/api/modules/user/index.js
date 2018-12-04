import fetch from '../../config'

export default {
  login (config) { return fetch('/api/login', 'get', config) }
}
