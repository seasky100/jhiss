import GLOBAL from './config';

let GAISMSERVER;
let UUMSSERVER;
let GMSSOSERVER;
if (process.env.NODE_ENV === 'development') {
  // console.log('这是开发环境：'+process.env.VUE_APP_PROXY_GAISM_URL)
  GAISMSERVER = process.env.VUE_APP_PROXY_GAISM_URL;
  UUMSSERVER = process.env.VUE_APP_PROXY_UUMS_URL;
  GMSSOSERVER = process.env.VUE_APP_PROXY_GMSSO_URL;
} else if (process.env.NODE_ENV === 'production') {
  console.log('这是生产环境')
  GAISMSERVER = GLOBAL.GAISM_SERVER;
  UUMSSERVER = GLOBAL.UUMS_SERVER;
  GMSSOSERVER = GLOBAL.GMSSO_SERVER;
}

const DEFAULT_URL = {
  // 预警通知
  warn: {
    // 考勤预警
    humanStatistics: GAISMSERVER + 'warn/humanStatistics', // 考勤预警按人员名称统计
    warnStatusStatistics: GAISMSERVER + 'warn/warnStatusStatistics', // 预警处置情况统计x未反馈，已反馈，y轴对应次数
    findWarnPage: GAISMSERVER + 'warn/findWarnPage', // 获取违规预警信息分页
    getWarnInfo: GAISMSERVER + 'warn/getWarnInfo', // 考勤预警详情
    // 检测通报
    findBulletinPage: GAISMSERVER + 'tBulletin/findBulletinPage', //
    bulletinTypeStatistics: GAISMSERVER + 'tBulletin/bulletinTypeStatistics', //
    bulletinExceptionStatistics: GAISMSERVER + 'tBulletin/bulletinExceptionStatistics', //
    bulletinTimesStatistics: GAISMSERVER + 'tBulletin/bulletinTimesStatistics', //
    getBulletinById: GAISMSERVER + 'tBulletin/getBulletinById', //获取通报详情
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
    carCoordinatesStatistics: GAISMSERVER + 'carCoordinates/carCoordinatesStatistics', //获取车辆轨迹信息
    // 首页分类预警提醒
    allWarnByType: GAISMSERVER + 'warn/allWarnByType', //
    //查询七天上班时间统计数据
    indexRecordDeatil: GAISMSERVER + 'warn/indexRecordDeatil', //
    //查询上班时间统计数据
    indexRecordCountDeatil: GAISMSERVER + 'warn/indexRecordCountDeatil', //
  },
  // 廉政风险
  vacation: {
    // 请假管理
    findVacationPage: GAISMSERVER + 'vacationApply/findVacationPage', //获取考勤信息分页
    vacationApplyByMonth: GAISMSERVER + 'vacationApply/vacationApplyByMonth', //请假按月统计
    vacationExceptionStatistics: GAISMSERVER + 'vacationApply/vacationExceptionStatistics', //请假按月统计
    // 护照管理
    findAbroadRecordPage: GAISMSERVER + 'tAbroadRecord/findAbroadRecordPage', //获取出勤出境分页
    // 涉嫌违法管控
    findIllgalPage: GAISMSERVER + 'warn/findIllgalPage', //涉嫌违法管控分页
    illgalByDayStatistics: GAISMSERVER + 'warn/illgalByDayStatistics', //涉嫌违法管控统计
    illgalBySource: GAISMSERVER + 'warn/illgalBySource', //涉嫌违法管控统计
  },
  // 查询部门平均上班时间数据
  tClockRecord: {
    sectorAverageStatistics: GAISMSERVER + 'tClockRecord/sectorAverageStatistics', //
  },
  
  payroll: {
    findPayroll: GAISMSERVER + '/payroll/findPayroll', //查询工资数据
    findrewardList: GAISMSERVER + '/payroll/findrewardList', //查询奖金数据
    findOvertimePay: GAISMSERVER + '/payroll/findOvertimePay', //查询其他加班费的数据
    
  },
  carSubsidy:{
    findCarSubsidy: GAISMSERVER + '/carSubsidy/findCarSubsidy', //查询车贴费的数据
  },
  // 报告
  report: {
    findInterViewPage: `${GAISMSERVER}InterView/findInterViewPage`,
    findReportPage: `${GAISMSERVER}weddingBanquet/findReportPage`
  },
  // 用户相关
  user: {
    // 登录
    login: `${GMSSOSERVER}login`,
    checkToken: `${GMSSOSERVER}checkTokenByAppKey`,
    // // 获取用户相关信息，菜单权限
    getUserInfo: `${UUMSSERVER}user/get`,
    // // 修改密码
    // updatePassword: `${userService}/updatePassword`,
    // 退出登录
    // logout: `${GLOBAL.UUMS_SERVER}/logout`
  },
    // 层级管理
    post: {
      treeAndUser: `${UUMSSERVER}post/treeAndUser`,
      findWorknotePage: `${GAISMSERVER}workNote/findWorknotePage`,
      noteAduit: `${GAISMSERVER}noteAudit/noteAduit`,
      countWorkNote: `${GAISMSERVER}workNote/countWorkNote`,
      getUserList: `${GAISMSERVER}user/getUserList`,
    },
  // 【智慧考勤分析】
  findClockPage: GAISMSERVER + "/tClockRecord/findClockPage", // 获取考勤信息分页
  // 【请销假分析】-【审批记录分析】
  findVacationPage: GAISMSERVER + "/vacationApply/findVacationPage", // 获取考勤信息分页
  // 【请销假分析】
  askForLeave: {
    vacationTypeStatistics: GAISMSERVER + "/vacationApply/vacationTypeStatistics", // 请假类型统计月
    vacationExceptionStatistics: GAISMSERVER + "/vacationApply/vacationExceptionStatistics", // 请假异常情况统计
    applyException: GAISMSERVER + "/vacationApply/applyException", // 审批情况统计
    vacationApplyByMonth: GAISMSERVER + "/vacationApply/vacationApplyByMonth" // 请假按月份统计
  },
  // 【出国（境）分析】
  goAbroad: {
    certificateInfoStatistics: GAISMSERVER + "/tCertificateInfo/certificateInfoStatistics", // 显示当前护照在管和在民警手里的数量饼状图
    palaceInfoStatistics: GAISMSERVER + "/tAbroadRecord/palaceInfoStatistics",  // 按目的地显示今年出国次数top10
    findAbroadRecordPage: GAISMSERVER + "/tAbroadRecord/findAbroadRecordPage" // 获取出勤出境分页
  },
  // 【差旅管理-报销异常分析】
  travelManagement: {
    tripPlaceStatistics: GAISMSERVER + '/travel/tripPlaceStatistics', // 出差地点统计今年次数 柱状图x轴地点，y轴次数
    tripMoneyStatistics: GAISMSERVER + '/reimburse/tripMoneyStatistics', // 报销额统计，今年 折线图x轴每个月，y轴费用
    findTravelPage: GAISMSERVER + '/travel/findTravelPage' // 获取差旅信息
  },
  // 【智慧感知】
  perceptualWisdom: {
    // 【刷卡情况分析】
    timesStatistics: GAISMSERVER + "/mealRecord/timesStatistics", // 刷卡情况（月）柱状图x轴刷卡地点y轴次数
    dayTimesStatistics: GAISMSERVER + '/mealRecord/dayTimesStatistics', // 刷卡情况（月）x轴每天y轴次数
    findMealRecordPage: GAISMSERVER + '/mealRecord/findMealRecordPage', // 获取刷卡记录分页
    // 【提前就餐预警】
    repastSiteWarnStatistics: GAISMSERVER + '/warnStatistics/repastSiteWarnStatistics' // 就餐地点预警地点统计
  }
}

export default DEFAULT_URL;
