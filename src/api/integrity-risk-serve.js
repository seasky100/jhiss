import request from '@/utils/request';
import DEFAULT_URL from '@/config/rest-url';

// 获取考勤信息分页
export function getVacationPage (params) {
  return request({
    url: DEFAULT_URL.vacation.findVacationPage,
    method: 'get',
    params
  })
}

// 请假按月统计
export function getVacationApplyByMonth (params) {
  return request({
    url: DEFAULT_URL.vacation.vacationApplyByMonth,
    method: 'get',
    params
  })
}

// 异常统计
export function getVacationExceptionStatistics (params) {
  return request({
    url: DEFAULT_URL.vacation.vacationExceptionStatistics,
    method: 'get',
    params
  })
}
