import { request } from './request'

// 请求用户列表
export function getUserList(params) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    url: '/users',
    params
  })
}
// 请求用户列表
export function changUserState(info) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    method: 'put',
    url: `users/${info.id}/state/${info.mg_state}`
  })
}
// 添加用户
export function addUser(data) {
  return request({
    method: 'post',
    url: '/users',
    data
  })
}
// 根据用户id查询信息
export function getUserInfo(id) {
  return request({
    method: 'get',
    url: '/users/' + id
  })
}
// 根据用户id修改用户信息
export function editUserInfo(data) {
  return request({
    method: 'put',
    url: '/users/' + data.id,
    data
  })
}
// 根据用户id删除用户信息
export function delUser(id) {
  return request({
    method: 'delete',
    url: '/users/' + id
  })
}
