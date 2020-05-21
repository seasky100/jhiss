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

// 获取预警人员列表
export function warnInfoUserStatistics (params) {
  return request({
    url: DEFAULT_URL.warn.warnInfoUserStatistics,
    method: 'get',
    params
  })
}

// 部门预警数量 
export function warnInfoCountByType (params) {
  return request({
    url: DEFAULT_URL.warn.warnInfoCountByType,
    method: 'get',
    params
  })
}

// 人员预警状态 GET /warn/warnInfoTypeByUserId
export function warnInfoTypeByUserId (params) {
  return request({
    url: DEFAULT_URL.warn.warnInfoTypeByUserId,
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
// 加班数据
export function overtimeApply(params) {
  return request({
    url: DEFAULT_URL.vacation.overtimeApply,
    method: 'get',
    params: params
  }).then((res) => {
    let size = res.data.size;
    let data = res.data.records;
    let total = res.data.total;
    return { data, total, size }
  });
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
// 曝光内容详情
export function getExposureById (params) {
  return request({
    url: DEFAULT_URL.exposure.getExposureById,
    method: 'get',
    params
  })
}
// 曝光内容学习记录
export function findLearningStatus (params) {
  return request({
    url: DEFAULT_URL.exposure.findLearningStatus,
    method: 'get',
    params
  })
}
// 学习感悟数据 点赞排行
export function findPraiseCount (params) {
  return request({
    url: DEFAULT_URL.exposure.findPraiseCount,
    method: 'get',
    params
  })
}
// 曝光栏内容评价新增
export function saveExposureNote (params) {
  return request({
    url: DEFAULT_URL.exposure.saveExposureNote,
    method: 'post',
    data: params
  })
}
// 查看层级下用户学习的曝光栏记录
export function findExposureStudyRecord (params) {
  return request({
    url: DEFAULT_URL.exposure.findExposureStudyRecord,
    method: 'get',
    params
  })
}
// 查看相关案例评论
export function queryExposureNote (params) {
  return request({
    url: DEFAULT_URL.exposure.queryExposureNote,
    method: 'get',
    params
  })
}
// 添加点赞
export function updateLike (params) {
  return request({
    url: DEFAULT_URL.exposure.updateLike,
    method: 'put',
    data: params
  })
}
export function queryPeriodStudy (params) {
  return request({
    url: DEFAULT_URL.exposure.queryPeriodStudy,
    method: 'get',
    params
  })
}
// 首页个人评分 部门评分
export function indexCalendar (params) {
  return request({
    url: DEFAULT_URL.warn.indexCalendar,
    method: 'get',
    params
  })
}
// 车辆使用异常统计
export function warnInfoTypeStatistics (params) {
  return request({
    url: DEFAULT_URL.warn.warnInfoTypeStatistics,
    method: 'get',
    params
  })
}
// 获取车辆信息
export function findCar (params) {
  return request({
    url: DEFAULT_URL.warn.findCar,
    method: 'get',
    params
  })
}
// 护照管理 
export function findPassport (params) {
  return request({
    url: DEFAULT_URL.passport.findPassport,
    method: 'get',
    params
  })
}

// 根据护照的保管状态进行统计护照的数量 
export function StatisticsCustodyStatus (params) {
  return request({
    url: DEFAULT_URL.passport.StatisticsCustodyStatus,
    method: 'post',
    data: params
  })
}

// 根据护照类型统计
export function StatisticsPassportType (params) {
  return request({
    url: DEFAULT_URL.passport.StatisticsPassportType,
    method: 'post',
    data: params
  })
}

// 获取护照详情
export function findPassportById (params) {
  return request({
    url: DEFAULT_URL.passport.findPassportById,
    method: 'get',
    params
  })
}

// 新增护照信息 
export function savePassport (params) {
  return request({
    url: DEFAULT_URL.passport.savePassport,
    method: 'post',
    data: params
  })
}

// 修改护照信息 
export function updatePassport (params) {
  return request({
    url: DEFAULT_URL.passport.updatePassport,
    method: 'post',
    data: params
  })
}

// excel导入 
export function ImportExcelPassport (params) {
  return request({
    url: DEFAULT_URL.passport.ImportExcelPassport,
    method: 'post',
    data: params
  })
}

// 删除护照 
export function deletePassport (params) {
  return request({
    url: DEFAULT_URL.passport.deletePassport,
    method: 'get',
    params
  })
}
// 护照操作历史 
export function findById (params) {
  return request({
    url: DEFAULT_URL.passport.findById,
    method: 'get',
    params
  })
}

// 民警有护照没护照情况 
export function StatisticsPassportwhether (params) {
  return request({
    url: DEFAULT_URL.passport.StatisticsPassportwhether,
    method: 'post',
    data: params
  })
}
// 上传附件
export function uploadMultiple (params) {
  return request({
    url: DEFAULT_URL.upload.uploadMultiple,
    method: 'post',
    data: params
  })
}
