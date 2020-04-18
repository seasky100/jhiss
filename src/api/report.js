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
    data: params
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

// 层级评价
export function findWorknotePage (params) {
  return request({
    url: DEFAULT_URL.post.findWorknotePage,
    method: 'get',
    params
  })
}

// 工作日志统计 
export function countWorkNote (params) {
  return request({
    url: DEFAULT_URL.post.countWorkNote,
    method: 'get',
    params
  })
}

// 工作日志评分
export function noteAduit (params) {
  return request({
    url: DEFAULT_URL.post.noteAduit,
    method: 'post',
    params
  })
}

// 个人廉政风险岗位预警 GET /risk/getRiskByUserId
export function getRiskByUserId (params) {
  return request({
    url: DEFAULT_URL.post.getRiskByUserId,
    method: 'get',
    params
  })
}

// 年度报告
export function getUserList (params) {
  return request({
    url: DEFAULT_URL.post.getUserList,
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
// 申报 即报 审批
export function updateApproval (params) {
  return request({
    url: DEFAULT_URL.report.updateApproval,
    method: 'post',
    data: params
  })
}

// 年度报告列表 分页
export function findAnnualReportPage (params) {
  return request({
    url: DEFAULT_URL.annualReport.findAnnualReportPage,
    method: 'get',
    params
  })
}

// 年度报告新增
export function saveAnnualReport (params) {
  return request({
    url: DEFAULT_URL.annualReport.saveAnnualReport,
    method: 'post',
    data: params
  })
}

// 1. 6. 7. 本人婚姻情况
export function saveMarrageAnnual (params) {
  return request({
    url: DEFAULT_URL.saveAnnualReport.saveMarrageAnnual,
    method: 'post',
    data: params
  })
}
// 3. 4. 5. 本人因私出国情况 POST /declareExit/saveDeclareExitAnnual
export function saveDeclareExitAnnual (params) {
  return request({
    url: DEFAULT_URL.saveAnnualReport.saveDeclareExitAnnual,
    method: 'post',
    data: params
  })
}

// 8. 年度报告详情信息新增信息
export function saveRelativesAbroadAnnual (params) {
  return request({
    url: DEFAULT_URL.saveAnnualReport.saveRelativesAbroadAnnual,
    method: 'post',
    data: params
  })
}
// 

