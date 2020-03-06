import request from '@/utils/request';
import DEFAULT_URL from '@/config/rest-url';

// 【请销假分析】- 【请假情况分析】
// 请假审批情况统计
export function getAskForLeave(params) {
  return request({
    url: DEFAULT_URL.askForLeave.vacationTypeStatistics,
    method: 'get',
    params: params
  }).then((res) => {
    return res.data
  });
}

// 请假异常情况统计
export function getVacationExceptionStatistics(params) {
  return request({
    url: DEFAULT_URL.askForLeave.vacationExceptionStatistics,
    method: 'get',
    params: params
  }).then((res) => {
    return res.data
  })
}

// 【请销假分析】- 【审批记录分析】
// 审批情况统计
export function getApplyException(params) {
  return request({
    url: DEFAULT_URL.askForLeave.applyException,
    method: 'get',
    params: params
  }).then((res) => {
     return res.data
  })
}

// 请假按月份统计
export function getVacationApplyByMonth(params) {
  return request({
    url: DEFAULT_URL.askForLeave.vacationApplyByMonth,
    method: 'get',
    params: params
  }).then((res) => {
     return res.data
  })
}

// 获取考勤信息分页（底部表格）- (两个页面共用一个分页表格)
export function getFindVacationPage(params) {
  return request({
    url: DEFAULT_URL.askForLeave.findVacationPage,
    method: 'get',
    params: params
  }).then((res) => {
    let size = res.data.size;
    let data = res.data.records;
    let total = res.data.total;
    return { data, total, size }
  });
}