import { request } from './request'

/**
 * ====================================================================
 * 商品管理-商品分类请求
 */
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
/**
 * ====================================================================
 * 商品管理-分类参数请求
 */
// 获取产品参数列表请求
export function getParamsData(id, sel) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    url: `categories/${id}/attributes`,
    params: { sel }
  })
}
// 添加产品属性请求
export function addGoodsParams(id, name, sel, vals) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    method: 'post',
    url: `categories/${id}/attributes`,
    data: { attr_name: name, attr_sel: sel, attr_vals: vals }
  })
}
// 根据产品属性ID发起查询请求
export function getGoodsParams(id, attrId, sel, vals) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    url: `categories/${id}/attributes/${attrId}`,
    params: { attr_sel: sel, attr_vals: vals }
  })
}
// 根据产品属性ID发起编辑请求
export function editGoodsParams(id, attrId, name, sel, vals) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    method: 'put',
    url: `categories/${id}/attributes/${attrId}`,
    data: { attr_name: name, attr_sel: sel, attr_vals: vals }
  })
}
// 删除属性请求
export function delParams(id, attrId) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    method: 'delete',
    url: '/categories/' + id + '/attributes/' + attrId
  })
}
// 编辑属性参数
export function editAttrVals(id, attrId, name, sel, vals) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    method: 'put',
    url: `categories/${id}/attributes/${attrId}`,
    data: { attr_name: name, attr_sel: sel, attr_vals: vals }
  })
}
