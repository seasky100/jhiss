import request from '@/utils/request';
import DEFAULT_URL from '@/config/rest-url';

// 获取考勤预警按人员名称统计
export function getHumanStatistics (params) {
  return request({
    url: DEFAULT_URL.warn.humanStatistics,
    method: 'get',
    params
  })
}

// 预警处置情况统计x未反馈，已反馈，y轴对应次数
export function getWarnStatusStatistics (params) {
  return request({
    url: DEFAULT_URL.warn.warnStatusStatistics,
    method: 'get',
    params
  })
}

// 预获取违规预警信息分页
export function getWarnPage (params) {
  return request({
    url: DEFAULT_URL.warn.findWarnPage,
    method: 'get',
    params
  })
}

// 检查通报 分页
export function findBulletinPage (params) {
  return request({
    url: DEFAULT_URL.warn.findBulletinPage,
    method: 'get',
    params
  })
}
// 图表
export function bulletinTypeStatistics (params) {
  return request({
    url: DEFAULT_URL.warn.bulletinTypeStatistics,
    method: 'get',
    params
  })
}

export function bulletinExceptionStatistics (params) {
  return request({
    url: DEFAULT_URL.warn.bulletinExceptionStatistics,
    method: 'get',
    params
  })
}

export function bulletinTimesStatistics (params) {
  return request({
    url: DEFAULT_URL.warn.bulletinTimesStatistics,
    method: 'get',
    params
  })
}

// 违规用车管控
export function findIlluseCarPage (params) {
  return request({
    url: DEFAULT_URL.warn.findIlluseCarPage,
    method: 'get',
    params
  })
}

export function monthIllUsecarStatistics (params) {
  return request({
    url: DEFAULT_URL.warn.monthIllUsecarStatistics,
    method: 'get',
    params
  })
}

export function illUsecarHumanStatistics (params) {
  return request({
    url: DEFAULT_URL.warn.illUsecarHumanStatistics,
    method: 'get',
    params
  })
}
// addCertificateApportion(params) {
//   return request({
//     url: URL.addZSFP,
//     method: 'post',
//     data: params
//   });
// }
