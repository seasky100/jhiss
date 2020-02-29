import request from '@/utils/request';
import DEFAULT_URL from '@/config/rest-url';

// 谈话谈心列表 分页
export function findInterViewPage (params) {
  return request({
    url: DEFAULT_URL.report.findInterViewPage,
    method: 'get',
    params
  })
}
// 事项申报列表 分页
export function findReportPage (params) {
  return request({
    url: DEFAULT_URL.report.findReportPage,
    method: 'get',
    params
  })
}
