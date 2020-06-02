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
  // console.log('这是生产环境')
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
    // 车辆使用异常统计
    warnInfoTypeStatistics: GAISMSERVER + 'warn/warnInfoTypeStatistics', //
    // 用车分析
    carTimesStatistics: GAISMSERVER + 'carRecord/carTimesStatistics', //车辆使用次数统计
    departmentTimesStatistics: GAISMSERVER + 'carRecord/departmentTimesStatistics', //部门用车统计
    findCarRecordPage: GAISMSERVER + 'carRecord/findCarRecordPage', //获取车辆分页信息
    usedCarsStatistics: GAISMSERVER + 'carRecord/usedCarsStatistics', //用车统计
    carStatusStatistics: GAISMSERVER + 'carInfo/carStatusStatistics', //车辆状态统计
    carExceptionStatistics: GAISMSERVER + 'carRecord/carExceptionStatistics', //异常统计
    carCoordinatesStatistics: GAISMSERVER + 'carCoordinates/carCoordinatesStatistics', //获取车辆轨迹信息
    findCar: GAISMSERVER + 'carInfo/findCar', //车辆信息与socket接收的数据对比
    
    // 首页分类预警提醒
    allWarnByType: GAISMSERVER + 'warn/allWarnByType', //
    //查询七天上班时间统计数据
    indexRecordDeatil: GAISMSERVER + 'warn/indexRecordDeatil', //
    //查询上班时间统计数据
    indexRecordCountDeatil: GAISMSERVER + 'warn/indexRecordCountDeatil', //
    indexCalendar: `${GAISMSERVER}/warn/indexCalendar`, // 首页个人评分 部门评分
    warnInfoUserStatistics: `${GAISMSERVER}/warn/warnInfoUserStatistics`, // 预警人员列表
    warnInfoCountByType: `${GAISMSERVER}/warn/warnInfoCountByType`, // 预警数量
    warnInfoTypeByUserId: `${GAISMSERVER}/warn/warnInfoTypeByUserId`, // 人员预警状态
    warnInfoTypeBydeptId: `${GAISMSERVER}/warn/warnInfoTypeBydeptId`, // 按部门统计人员预警
    responseAuditWarning: `${GAISMSERVER}/warn/responseAuditWarning`, // 预警反馈
  },
  // 廉政风险
  vacation: {
    // 请假管理
    findVacationPage: GAISMSERVER + 'vacationApply/findVacationPage', //获取考勤信息分页
    vacationApplyByMonth: GAISMSERVER + 'vacationApply/vacationApplyByMonth', //请假按月统计
    vacationExceptionStatistics: GAISMSERVER + 'vacationApply/vacationExceptionStatistics', //请假按月统计
    overtimeApply: GAISMSERVER + 'overtimeApply/findVacationPage', //加班列表数据

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
      findInterViewPage: `${GAISMSERVER}InterView/findInterViewPage`, //分页
      getInterViewById: `${GAISMSERVER}InterView/getInterViewById`, //详情
      delFlowProcess: `${GAISMSERVER}flowProcess/delFlowProcess`, //删除年报
      deleteInterView: `${GAISMSERVER}InterView/deleteInterView`, //删除
      saveInterView: `${GAISMSERVER}InterView/saveInterView`, //新增
      updateInterView: `${GAISMSERVER}InterView/updateInterView`, //修改
      findReportPage: `${GAISMSERVER}weddingBanquet/findReportPage`,
      saveDeclareExit: `${GAISMSERVER}declareExit/saveDeclareExit`, //因私出境
      saveDeclareHouse: `${GAISMSERVER}declareHouse/saveDeclareHouse`, //房产变更
      saveMarrage: `${GAISMSERVER}marrage/saveMarrage`, //婚姻情况
      saveWeddingBanquet: `${GAISMSERVER}weddingBanquet/saveWeddingBanquet`, //婚姻宴请
      saveCashGift: `${GAISMSERVER}cashGift/saveCashGift`, //收受礼金
      saveRelativesWork: `${GAISMSERVER}relativesWork/saveRelativesWork`, //亲属就业
      saveRelativesAbroad: `${GAISMSERVER}relativesAbroad/saveRelativesAbroad`, //移居国外
      saveOverseasInvestment: `${GAISMSERVER}overseasInvestment/saveOverseasInvestment`, //境外投资
      saveRelativesBusiness: `${GAISMSERVER}relativesBusiness/saveRelativesBusiness`, //亲属经商
      saveOverseasDeposit: `${GAISMSERVER}overseasDeposit/saveOverseasDeposit`, //境外存款
      saveSecuredLoan: `${GAISMSERVER}securedLoan/saveSecuredLoan`, //担保借贷
      saveRelativesIllegal: `${GAISMSERVER}relativesIllegal/saveRelativesIllegal`, //涉纪涉诉事项
      saveOtherReport: `${GAISMSERVER}otherReport/saveOtherReport`, //其它事项报告
      saveAffairApply: `${GAISMSERVER}affairApply/saveAffairApply`, //事项报告新增
      getApprovalById: `${GAISMSERVER}weddingBanquet/getApprovalById`, //事项个人报告详情 
      updateApproval: `${GAISMSERVER}weddingBanquet/updateApproval`, // 审批申报 即报 
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
    logout: `${GMSSOSERVER}logout`,
    // 身份证号登陆
    jhLogin: `${GMSSOSERVER}jhLogin`,
    // 获取所有的机构树
    getOrganization: `${UUMSSERVER}organization/tree`,
    // 获取机构下对应的人员
    getUserList: `${UUMSSERVER}user/getUserListByOrgId`,
    // 根据type 获取flowcode
    getFlowByCondition: `${UUMSSERVER}flow/getFlowByCondition`,
    // 根据flowcode节点
    getNodeByFlowCode: `${UUMSSERVER}flow/getByFlowCode`,
      // 从警生涯数据
    getPoliceCareer: `${GAISMSERVER}policeCareer/getPoliceCareerByUserId`,
    // 根据userId查询相应层级成员的id列表 层级评价列表使用
    getUserListByUserId: `${UUMSSERVER}post/getUserListByUserId`,
    getSubordinateList: `${UUMSSERVER}post/getSubordinateList`,
    // 根据身份证号查询用户信息
    getUserByCardNum: `${UUMSSERVER}user/getUserByCardNum`,
    // 查询字典数据
    getList: `${UUMSSERVER}dict/getList`,
  },
    // 层级管理
    post: {
      treeAndUser: `${UUMSSERVER}post/treeAndUser`,
      findWorknotePage: `${GAISMSERVER}workNote/findWorknotePage`,
      noteAduit: `${GAISMSERVER}noteAudit/noteAduit`,
      countWorkNote: `${GAISMSERVER}workNote/countWorkNote`,
      getUserList: `${GAISMSERVER}user/getUserList`,
      getRiskByUserId: `${UUMSSERVER}risk/getRiskByUserId`,
      getRiskPage: `${UUMSSERVER}risk/page`, // 分页查询风险列表
      findWorkEvaluatePage: `${GAISMSERVER}workNote/findWorkEvaluatePage`, // 查看评价分析数据
      workEvaluateStatistics: `${GAISMSERVER}workNote/workEvaluateStatistics`, // 工作评价按部门统计
      countWorkNoteByDay: `${GAISMSERVER}workNote/countWorkNoteByDay`, // 工作评价按月统计
      updateWorkNote: `${GAISMSERVER}workNote/updateWorkNote`, // 修改工作日志
      saveWorkNote: `${GAISMSERVER}workNote/saveWorkNote`, // 修改工作日志
      
    },
     // 个人风险管理
  userRisk: {
    getUserRisk: `${UUMSSERVER}risk/page`, // 获取个人风险列表
    deleteUserRisk: `${UUMSSERVER}risk/delete`, // 删除个人风险
    saveUserRisk: `${UUMSSERVER}risk/save`, // 保存个人风险
    getUserDetail: `${UUMSSERVER}user/get`, // 获取用户层级领导及负责人
    getDetail: `${UUMSSERVER}risk/get`, // 获取个人风险详情
    updateUserRisk: `${UUMSSERVER}risk/update` // 更新
  },
    exposure: {
      findExposurePage: `${GAISMSERVER}exposure/findExposurePage`,
      queryPeriodStudy: `${GAISMSERVER}exposureBrowse/queryPeriodStudy`,
      getExposureById: `${GAISMSERVER}exposure/getExposureById`, // 曝光栏详情
      findLearningStatus: `${GAISMSERVER}exposureAssociation/findLearningStatus`, // 曝光栏学习记录
      findPraiseCount: `${GAISMSERVER}exposureNote/findPraiseCount`, // 学习感悟数据 点赞排行
      saveExposureNote: `${GAISMSERVER}exposureNote/saveExposureNote`, // 曝光栏内容评价新增
      queryExposureNote: `${GAISMSERVER}exposureNote/queryExposureNote`, // 查看案例相关评论
      updateLike: `${GAISMSERVER}exposureNote/updateLike`, // 添加点赞
      findExposureStudyRecord: `${GAISMSERVER}exposureAssociation/findExposureStudyRecord`, // 查看层级下用户学习的曝光栏记录
    },
  // 【智慧考勤分析】
  clockingIn: {
    clockWarnReasonStatistics: GAISMSERVER + '/tClockRecord/clockWarnReasonStatistics', // 刷卡地点次数统计
    clockWarnTimesStatistics: GAISMSERVER + '/tClockRecord/clockWarnTimesStatistics', // 每日工作时长统计
    findClockPage: GAISMSERVER + "/tClockRecord/findClockPage", // 获取考勤信息分页
  },
  // 【请销假分析】
  askForLeave: {
    vacationTypeStatistics: GAISMSERVER + "/vacationApply/vacationTypeStatistics", // 请假类型统计月
    vacationExceptionStatistics: GAISMSERVER + "/vacationApply/vacationExceptionStatistics", // 请假异常情况统计
    applyException: GAISMSERVER + "/vacationApply/applyException", // 审批情况统计
    vacationApplyByMonth: GAISMSERVER + "/vacationApply/vacationApplyByMonth", // 请假按月份统计
    findVacationPage: GAISMSERVER + "/vacationApply/findVacationPage", // 获取考勤信息分页
  },
  // 【出国（境）分析】
  goAbroad: {
    countPassport: UUMSSERVER + '/passport/countPassport', // 统计有无护照的管理员数量
    certificateInfoStatistics: GAISMSERVER + "/tCertificateInfo/certificateInfoStatistics", // 显示当前护照在管和在民警手里的数量饼状图
    palaceInfoStatistics: GAISMSERVER + "/tAbroadRecord/palaceInfoStatistics",  // 按目的地显示今年出国次数top10
    findAbroadRecordPage: GAISMSERVER + "/tAbroadRecord/findAbroadRecordPage", // 获取出勤出境分页
    departmentInfoStatistics: GAISMSERVER + "/tAbroadRecord/departmentInfoStatistics" // 出国次数按部门统计
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
    repastSiteWarnStatistics: GAISMSERVER + '/warnStatistics/repastSiteWarnStatistics', // 就餐地点预警地点统计
    repastWarnTimesStatistics: GAISMSERVER + '/warnStatistics/repastWarnTimesStatistics', // 每日就餐预警次数统计
    getFindMealCardPage: GAISMSERVER + '/warn/findWarnPage' // 所有的预警分页
  },
  // 【工作评价-评价分析预警】
  evaluation: {
    AuditWarnBarChat: GAISMSERVER + '/AuditWarning/AuditWarnBarChat', // 日志预警柱线图
    AuditWarnLineChat: GAISMSERVER + '/AuditWarning/AuditWarnLineChat', // 日志预警折线图
    findAuditWarningPage: GAISMSERVER + '/AuditWarning/findAuditWarningPage', // 日志预警分页
    auditWarningById: GAISMSERVER + '/AuditWarning/auditWarningById', // 日志预警详情
    findWorknotePage: GAISMSERVER + '/workNote/findWorknotePage' // 首页日历层级评分

    
  },
  // 【台账管理】-【人员台账】
  standingBook: {
    getUserList: '/user/getUserList', // 人员台账分页
    getUserById: '/user/getUserById' // 人员台账详情
  },
  // 年度报告
  annualReport: {
    findAnnualReportPage: `${GAISMSERVER}annualReportInformation/findAnnualReportPage`, // 人员台账分页
    saveAnnualReport: `${GAISMSERVER}annualReportInformation/save`,
    updateReportApproval: `${GAISMSERVER}annualReportInformation/updateApproval`,
  },
  // 年度报告新增信息
  saveAnnualReport: {
    // 获取年度报告详情信息
    getReportById: `${GAISMSERVER}annualReportInformation/getReportById`,
        // 本人基本情况信息
        saveBasicAnnual: `${GAISMSERVER}user/saveBasicAnnual`,
    // 报表一
    saveMarrageAnnual: `${GAISMSERVER}marrage/saveDeclareExitAnnual`,
    savePassportAnnual: `${GAISMSERVER}passport/savePassportAnnual`,
    saveDeclareExitAnnual: `${GAISMSERVER}declareExit/saveDeclareExitAnnual`,
    saveRelativesAbroadAnnual: `${GAISMSERVER}relativesAbroad/saveRelativesAbroadAnnual`,
    saveRelativesIllegalAnnual: `${GAISMSERVER}relativesIllegal/saveRelativesIllegalAnnual`,
    saveRelativesWorkAnnual: `${GAISMSERVER}relativesWork/saveRelativesWorkAnnual`,
    // 报表二
    saveDeclareExitTotalAnnual: `${GAISMSERVER}domesticInvestment/saveDeclareExitTotalAnnual`,
    saveLaborIncomeAnnual: `${GAISMSERVER}user/saveLaborIncomeAnnual`,
    saveSecuredLoanAnnual: `${GAISMSERVER}securedLoan/saveSecuredLoanAnnual`,
    saveRelativesBusinessAnnual: `${GAISMSERVER}relativesBusiness/saveRelativesBusinessAnnual`,
    saveOverseasDepositAnnual: `${GAISMSERVER}overseasDeposit/saveOverseasDepositAnnual`,
    saveOverseasInvestmentAnnual: `${GAISMSERVER}overseasInvestment/saveOverseasInvestmentAnnual`,
    saveDomesticInvestmentAnnual: `${GAISMSERVER}/domesticInvestment/saveDeclareExitAnnual`,
    saveDeclareHouseAnnual: `${GAISMSERVER}/declareHouse/saveDeclareHouseAnnual`,
    saveOtherReportAnnual: `${GAISMSERVER}/otherReport/saveOtherReportAnnual`,
  },
  // 护照管理
  passport: {
    findPassport: `${GAISMSERVER}passport/findPassport`,
    StatisticsCustodyStatus: `${GAISMSERVER}passport/StatisticsCustodyStatus`,
    StatisticsPassportType: `${GAISMSERVER}passport/StatisticsPassportType`,
    findPassportById: `${GAISMSERVER}passport/findPassportById`,
    savePassport: `${GAISMSERVER}passport/savePassport`,
    updatePassport: `${GAISMSERVER}passport/updatePassport`,
    ImportExcelPassport: `${GAISMSERVER}passport/ImportExcelPassport`,
    deletePassport: `${GAISMSERVER}passport/deletePassport`,
    findById: `${GAISMSERVER}passportHistory/findById`,
    StatisticsPassportwhether: `${GAISMSERVER}passport/StatisticsPassportwhether`,
  },
  // 上传附件
  upload: {
    uploadMultiple: `${GAISMSERVER}image/uploadMultiple`,
  },
  //电子责任书
  Responsibility:{
    saveElectronicResponsibility: `${GAISMSERVER}electronicResponsibility/saveElectronicResponsibility`, //新增电子责任书
    getElectronicResponsibilityById: `${GAISMSERVER}electronicResponsibility/getElectronicResponsibilityById`, //查询电子责任书 传父id
    findElectronicResponsibilityPage: `${GAISMSERVER}electronicResponsibility/findElectronicResponsibilityPage`, //根据用户id查询电子责任书
    getSignatureById: `${GAISMSERVER}electronicResponsibility/getSignatureById`, //查询电子签名
    updateElectronicResponsibility: `${GAISMSERVER}electronicResponsibility/updateElectronicResponsibility`, //修改电子责任书
  }
}


export default DEFAULT_URL;
