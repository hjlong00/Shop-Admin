import { request } from './request'

// 请求权限列表
export function getRightsList(type) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    url: `/rights/${type}`
  })
}
// 请求角色列表
export function getRolesList() {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    url: '/roles'
  })
}
// 请求添加角色
export function addRole(data) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    method: 'post',
    url: '/roles',
    data
  })
}
// 根据角色id查询信息
export function getRoleInfo(id) {
  return request({
    method: 'get',
    url: '/roles/' + id
  })
}
// 根据角色id修改角色信息
export function editRoleInfo(data) {
  return request({
    method: 'put',
    url: '/roles/' + data.roleId,
    data
  })
}
// 根据角色id删除用户信息
export function delRole(id) {
  return request({
    method: 'delete',
    url: '/roles/' + id
  })
}
// 根据角色id删除角色权限
export function delRight(role, rightId) {
  return request({
    method: 'delete',
    url: `/roles/${role.id}/rights/${rightId}`
  })
}
// 根据角色Id，已选权限Id 修改角色权限
export function setRoleRight(id, rids) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    method: 'post',
    url: `/roles/${id}/rights`,
    data: { rids }
  })
}
