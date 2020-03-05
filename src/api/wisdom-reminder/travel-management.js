import request from '@/utils/request';
import DEFAULT_URL from '@/config/rest-url';

// 出差地点统计今年次数 柱状图x轴地点，y轴次数
export function getTripPlaceStatistics(params) {
  return request({
    url: DEFAULT_URL.travelManagement.tripPlaceStatistics,
    method: 'get',
    params: params
  }).then((res) => {
    return res.data
  })
}

// 报销额统计，今年 折线图x轴每个月，y轴费用
export function getTripMoneyStatistics(params) {
  return request({
    url: DEFAULT_URL.travelManagement.tripMoneyStatistics,
    method: 'get',
    params: params
  }).then((res) => {
    return res.data
  })
}

// 获取差旅信息
export function getFindTravelPage(params) {
  return request({
    url: DEFAULT_URL.travelManagement.findTravelPage,
    method: 'get',
    params
  }).then((res) => {
    let size = res.data.size;
    let data = res.data.records
    let total = res.data.total
    return { data, total, size }
  })
}