import axios from 'axios'
// 加载进度条
import NProgress from 'nprogress'

export function request(config) {
  // 1,创建axios实例
  const instance = axios.create({
    // baseURL: 'https://www.liulongbin.top:8888/api/private/v1/',
    baseURL: 'http://127.0.0.1:8888/api/private/v1/',
    timeout: 20000
  })

  // 请求拦截
  instance.interceptors.request.use(
    // 回调函数，请求成功拦截
    (config) => {
      // console.log(config)
      // 给请求头部添加token
      NProgress.start()
      config.headers.Authorization = window.sessionStorage.getItem('token')
      return config
    },
    // 请求失败的拦截
    (err) => {
      console.log(err)
    }
  )

  // 响应拦截
  instance.interceptors.response.use(
    // 响应成功的拦截
    (res) => {
      NProgress.done()
      return res
    },
    // 响应失败的拦截
    (err) => {
      console.log(err)
    }
  )

  return instance(config)
}
