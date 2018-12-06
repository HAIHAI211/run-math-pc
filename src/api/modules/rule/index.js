import fetch from '../../config'

export default {
  getRules (config) { return fetch('/setting/rules/get', 'get', config) }
}
