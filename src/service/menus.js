import { request } from './request'

export function getMenuList() {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    url: '/menus'
  })
}
