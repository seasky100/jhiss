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

// 预警详情
export function getWarnInfo (params) {
  return request({
    url: DEFAULT_URL.warn.getWarnInfo,
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
// 检查通报详情
export function getBulletinById (params) {
  return request({
    url: DEFAULT_URL.warn.getBulletinById,
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

// 公车使用分析
export function getCarTimesStatistics (params) {
  return request({
    url: DEFAULT_URL.warn.carTimesStatistics,
    method: 'get',
    params
  })
}

export function getDepartmentTimes (params) {
  return request({
    url: DEFAULT_URL.warn.departmentTimesStatistics,
    method: 'get',
    params
  })
}

export function getCarRecordPage (params) {
  return request({
    url: DEFAULT_URL.warn.findCarRecordPage,
    method: 'get',
    params
  })
}

export function usedCarsStatistics (params) {
  return request({
    url: DEFAULT_URL.warn.usedCarsStatistics,
    method: 'get',
    params
  })
}

export function carStatusStatistics (params) {
  return request({
    url: DEFAULT_URL.warn.carStatusStatistics,
    method: 'get',
    params
  })
}

export function getCarExceptionStatistics (params) {
  return request({
    url: DEFAULT_URL.warn.carExceptionStatistics,
    method: 'get',
    params
  })
}
// 车辆轨迹详情
export function getCarCoordinates (params) {
  return request({
    url: DEFAULT_URL.warn.carCoordinatesStatistics,
    method: 'get',
    params
  })
}
// 首页分类风险预警提醒
export function allWarnByType (params) {
  return request({
    url: DEFAULT_URL.warn.allWarnByType,
    method: 'get',
    params
  })
}
 //查询七天上班时间统计数据
export function indexRecordDeatil (params) {
  return request({
    url: DEFAULT_URL.warn.indexRecordDeatil,
    method: 'get',
    params
  })
}
 //查询上班时间统计数据
 export function indexRecordCountDeatil (params) {
  return request({
    url: DEFAULT_URL.warn.indexRecordCountDeatil,
    method: 'get',
    params
  })
}
// 查询部门平均上班时间数据
export function sectorAverageStatistics (params) {
  return request({
    url: DEFAULT_URL.tClockRecord.sectorAverageStatistics,
    method: 'get',
    params
  })
}
// 查询工资数据
export function findPayroll (params) {
  return request({
    url: DEFAULT_URL.payroll.findPayroll,
    method: 'get',
    params
  })
}
// 查询奖金数据
export function findrewardList (params) {
  return request({
    url: DEFAULT_URL.payroll.findrewardList,
    method: 'get',
    params
  })
}
// 查询其他加班费的数据
export function findOvertimePay (params) {
  return request({
    url: DEFAULT_URL.payroll.findOvertimePay,
    method: 'get',
    params
  })
}
// 查询车贴费的数据
export function findCarSubsidy (params) {
  return request({
    url: DEFAULT_URL.carSubsidy.findCarSubsidy,
    method: 'get',
    params
  })
}
// 涉嫌违法管控分页
export function findIllgalPage (params) {
  return request({
    url: DEFAULT_URL.vacation.findIllgalPage,
    method: 'get',
    params
  })
}
// 按天统计
export function illgalByDayStatistics (params) {
  return request({
    url: DEFAULT_URL.vacation.illgalByDayStatistics,
    method: 'get',
    params
  })
}
// 来源统计
export function illgalBySource (params) {
  return request({
    url: DEFAULT_URL.vacation.illgalBySource,
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

// 曝光内容
export function findExposurePage (params) {
  return request({
    url: DEFAULT_URL.exposure.findExposurePage,
    method: 'get',
    params
  })
}

export function queryPeriodStudy (params) {
  return request({
    url: DEFAULT_URL.exposure.queryPeriodStudy,
    method: 'get',
    params
  })
}
