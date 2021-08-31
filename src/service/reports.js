import { request } from './request'

// 获取报表数据
export function getReportData() {
  return request({
    url: '/reports/type/1'
  })
}
