import axios from 'axios'
import config from '../config'
import uuidv1 from 'uuid/v1'
import md5 from 'js-md5'

let baseUrl = config.url
let appid = config.appid
let token = config.token

let uuid = uuidv1()
let timestamp = Date.parse(new Date())
let sign = md5(appid + token + timestamp)

var instance = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  baseURL: baseUrl,
  timeout: 10000,
  withCredentials: false
})

instance.interceptors.response.use((response) => {
  if (response.status === 200 && response.data) {
    return response.data
  }
}, (error) => {
  return Promise.reject(error)
})

const setHeader = () => {
  instance.defaults.headers['X-Request-ID'] = uuid
  instance.defaults.headers['appid'] = appid
  instance.defaults.headers['timestamp'] = timestamp
  instance.defaults.headers['sign'] = sign
}

export default {
  get: (url = '', data = {}) => {
    setHeader()
    return instance.get(url, { params: data })
  }
}
