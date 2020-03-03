import request from '@/utils/request';
import DEFAULT_URL from '@/config/rest-url';

// 【智慧感知】-【智慧考勤分析】
// 刷卡情况（月）柱状图x轴刷卡地点y轴次数 // 左一柱状图 - 考勤结果
export function getTimesStatistics(params) {
  return request({
    url: DEFAULT_URL.timesStatistics,
    method: 'get',
    // params: {
    //   userId: '123456'
    // }
    params
  }).then(() => {
    // console.log(res);
  })
}

// 获取考勤信息分页 // 底部表格
export function getFindClockPage(params) {
  return request({
    url: DEFAULT_URL.findClockPage,
    method: 'get',
    params: params
  }).then((res) => {
    let data = res.data.records
    let total = res.data.total
    return { data, total }
  })
}