import { request } from './request'

export function getCateList(params) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    url: '/categories',
    params
  })
}
export function addCategory(data) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    method: 'post',
    url: '/categories',
    data
  })
}
export function editCategory(data) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    method: 'put',
    url: '/categories/' + data.cat_id,
    data
  })
}
export function delCategory(id) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    method: 'delete',
    url: '/categories/' + id
  })
}
