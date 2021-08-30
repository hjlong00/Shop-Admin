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
/**
 * ====================================================================
 * 商品管理-商品列表请求
 */
// 获取商品列表
export function getGoodsList(params) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    url: '/goods',
    params
  })
}
// 根据商品ID发起查询请求
export function getInfoById(id) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    url: '/goods/' + id
  })
}
// 根据商品ID发起删除请求
export function removeById(id) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    method: 'delete',
    url: '/goods/' + id
  })
}
// 添加商品请求
export function addGoods(data) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    method: 'post',
    url: '/goods/',
    data
  })
}
// 根据商品ID发起修改请求
export function editGoods(data) {
  return request({
    // 请求方法 ， 不写的话 默认是 'get'
    method: 'put',
    url: '/goods/' + data.goods_id,
    data
  })
}
