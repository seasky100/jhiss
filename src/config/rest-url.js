import GLOBAL from './config';

let GAISMSERVER;
if (process.env.NODE_ENV === 'development') {
  // console.log('这是开发环境：'+process.env.VUE_APP_PROXY_GAISM_URL)
  GAISMSERVER = process.env.VUE_APP_PROXY_GAISM_URL;
} else if (process.env.NODE_ENV === 'production') {
  console.log('这是生产环境')
  GAISMSERVER = GLOBAL.GAISM_SERVER;
}

const DEFAULT_URL = {
  // 预警通知
  warn: {
    // 考勤预警
    humanStatistics: GAISMSERVER + 'warn/humanStatistics', // 考勤预警按人员名称统计
    warnStatusStatistics: GAISMSERVER + 'warn/warnStatusStatistics', // 预警处置情况统计x未反馈，已反馈，y轴对应次数
    findWarnPage: GAISMSERVER + 'warn/findWarnPage', // 获取违规预警信息分页
    // 检测通报
    findBulletinPage: GAISMSERVER + 'tBulletin/findBulletinPage', //
    bulletinTypeStatistics: GAISMSERVER + 'tBulletin/bulletinTypeStatistics', //
    bulletinExceptionStatistics: GAISMSERVER + 'tBulletin/bulletinExceptionStatistics', //
    bulletinTimesStatistics: GAISMSERVER + 'tBulletin/bulletinTimesStatistics', //
    // 违规用车管控
    findIlluseCarPage: GAISMSERVER + 'warn/findIlluseCarPage', //
    monthIllUsecarStatistics: GAISMSERVER + 'warn/monthIllUsecarStatistics', //
    illUsecarHumanStatistics: GAISMSERVER + 'warn/illUsecarHumanStatistics', //
    // 用车分析
    carTimesStatistics: GAISMSERVER + 'carRecord/carTimesStatistics', //车辆使用次数统计
    departmentTimesStatistics: GAISMSERVER + 'carRecord/departmentTimesStatistics', //部门用车统计
    findCarRecordPage: GAISMSERVER + 'carRecord/findCarRecordPage', //获取车辆分页信息
    usedCarsStatistics: GAISMSERVER + 'carRecord/usedCarsStatistics', //用车统计
    carStatusStatistics: GAISMSERVER + 'carInfo/carStatusStatistics', //车辆状态统计
    carExceptionStatistics: GAISMSERVER + 'carRecord/carExceptionStatistics', //异常统计
  },
  // 廉政风险
  vacation: {
    findVacationPage: GAISMSERVER + 'vacationApply/findVacationPage', //获取考勤信息分页
    vacationApplyByMonth: GAISMSERVER + 'vacationApply/vacationApplyByMonth', //请假按月统计
    vacationExceptionStatistics: GAISMSERVER + 'vacationApply/vacationExceptionStatistics', //请假按月统计
  }
}

export default DEFAULT_URL;
