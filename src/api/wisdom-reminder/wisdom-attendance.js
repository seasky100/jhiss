import request from '@/utils/request';
import DEFAULT_URL from '@/config/rest-url';

// 【智慧感知】-【智慧考勤分析】
// 刷卡地点次数统计
export function getClockWarnReasonStatistics(params) {
  return request({
    url: DEFAULT_URL.clockingIn.clockWarnReasonStatistics,
    method: 'get',
    params
  }).then((res) => {
    return res.data
  })
}

// 每日工作时长统计
export function getClockWarnTimesStatistics(params) {
  return request({
    url: DEFAULT_URL.clockingIn.clockWarnTimesStatistics,
    method: 'get',
    params
  }).then((res) => {
    return res.data
  })
}

// 获取考勤信息分页 // 底部表格
export function getFindClockPage(params) {
  return request({
    url: DEFAULT_URL.clockingIn.findClockPage,
    method: 'get',
    params
  }).then((res) => {
    let size = res.data.size;
    let data = res.data.records;
    let total = res.data.total;
    return { data, total, size }
  })
}