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
// 谈话谈心列表 详情
export function getInterViewById (params) {
  return request({
    url: DEFAULT_URL.report.getInterViewById,
    method: 'get',
    params
  })
}
// 谈话谈心列表 删除
export function deleteInterView (params) {
  return request({
    url: DEFAULT_URL.report.deleteInterView,
    method: 'delete',
    params
  })
}
// 谈话谈心列表 新增
export function saveInterView (params) {
  return request({
    url: DEFAULT_URL.report.saveInterView,
    method: 'post',
    data: params
  })
}
// 谈话谈心列表 修改
export function updateInterView (params) {
  return request({
    url: DEFAULT_URL.report.updateInterView,
    method: 'put',
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

// 层级管理 查询层级树
export function treeAndUser (params) {
  return request({
    url: DEFAULT_URL.post.treeAndUser,
    method: 'get',
    params
  })
}

// 因私出境
export function saveDeclareExit (params) {
  return request({
    url: DEFAULT_URL.report.saveDeclareExit,
    method: 'post',
    data: params
  })
}
// 房产变更
export function saveDeclareHouse (params) {
  return request({
    url: DEFAULT_URL.report.saveDeclareHouse,
    method: 'post',
    data: params
  })
}
// 婚姻情况
export function saveMarrage (params) {
  return request({
    url: DEFAULT_URL.report.saveMarrage,
    method: 'post',
    data: params
  })
}
// 婚姻宴请
export function saveWeddingBanquet (params) {
  return request({
    url: DEFAULT_URL.report.saveWeddingBanquet,
    method: 'post',
    data: params
  })
}
// 收受礼金
export function saveCashGift (params) {
  return request({
    url: DEFAULT_URL.report.saveCashGift,
    method: 'post',
    data: params
  })
}
// 亲属就业
export function saveRelativesWork (params) {
  return request({
    url: DEFAULT_URL.report.saveRelativesWork,
    method: 'post',
    data: params
  })
}
// 移居国外
export function saveRelativesAbroad (params) {
  return request({
    url: DEFAULT_URL.report.saveRelativesAbroad,
    method: 'post',
    data: params
  })
}
// 境外投资
export function saveOverseasInvestment (params) {
  return request({
    url: DEFAULT_URL.report.saveOverseasInvestment,
    method: 'post',
    data: params
  })
}
// 亲属经商
export function saveRelativesBusiness (params) {
  return request({
    url: DEFAULT_URL.report.saveRelativesBusiness,
    method: 'post',
    data: params
  })
}
// 境外存款
export function saveOverseasDeposit (params) {
  return request({
    url: DEFAULT_URL.report.saveOverseasDeposit,
    method: 'post',
    data: params
  })
}
// 担保借贷
export function saveSecuredLoan (params) {
  return request({
    url: DEFAULT_URL.report.saveSecuredLoan,
    method: 'post',
    data: params
  })
}
// 涉纪涉诉事项
export function saveRelativesIllegal (params) {
  return request({
    url: DEFAULT_URL.report.saveRelativesIllegal,
    method: 'post',
    data: params
  })
}
// 其它事项报告
export function saveOtherReport (params) {
  return request({
    url: DEFAULT_URL.report.saveOtherReport,
    method: 'post',
    data: params
  })
}
// 事项报告新增
export function saveAffairApply (params) {
  return request({
    url: DEFAULT_URL.report.saveAffairApply,
    method: 'post',
    data: params
  })
}
// 事项，个人报告列表 详情
export function getApprovalById (params) {
  return request({
    url: DEFAULT_URL.report.getApprovalById,
    method: 'get',
    params
  })
}
