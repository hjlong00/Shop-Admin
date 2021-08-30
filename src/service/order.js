import { request } from './request'

// export function getOrderList() {
//   return request({
//     url: '/orders'
//   })
// }
// 查询订单列表
export const getOrderList = (params) => {
  return request({
    url: '/orders',
    params
  })
}
// 查询物流信息
export const getExpressInfo = () => {
  return request({
    url: '/kuaidi/804909574412544580'
  })
}
