import { request } from './request'

export function getLoginData (data) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    method: 'post',
    url: '/login',
    // 这里需要传一个对象，如果进来的data是对象，就这样写就行。如果进来的不是，那就要写成 data:{a,b}
    data
  })
}
