import request from '@/utils/request';
import DEFAULT_URL from '@/config/rest-url';

// 【智慧感知】

// 【刷卡情况分析】
// 刷卡情况（月）柱状图x轴刷卡地点y轴次数
export function getTimesStatistics(params) {
  return request({
    url: DEFAULT_URL.perceptualWisdom.timesStatistics,
    method: 'get',
    params
  }).then((res) => {
    return res.data
  })
}

// 刷卡情况（月）x轴每天y轴次数
export function getDayTimesStatistics(params) {
  return request({
    url: DEFAULT_URL.perceptualWisdom.dayTimesStatistics,
    method: 'get',
    params
  }).then((res) => {
    return res.data
  })
}

// 获取刷卡记录分页
export function getFindMealRecordPage(params) {
  return request({
    url: DEFAULT_URL.perceptualWisdom.findMealRecordPage,
    method: 'get',
    params
  }).then(() => {})
}

// 【提前就餐预警】
// 就餐地点预警地点统计
export function getRepastSiteWarnStatistics(params) {
  return request({
    url: DEFAULT_URL.perceptualWisdom.repastSiteWarnStatistics,
    method: 'get',
    params
  }).then(() => {})
}