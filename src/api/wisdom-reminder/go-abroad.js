import request from "@/utils/request";
import DEFAULT_URL from "@/config/rest-url";

// 统计有无护照的管理员数量
export function getCountPassport() {
  return request({
    url: DEFAULT_URL.goAbroad.countPassport,
    method: 'get'
  }).then((res) => {
    return res.data
  })
}

// 显示当前护照在管和在民警手里的数量饼状图
export function getCertificateInfoStatistics() {
  return request({
    url: DEFAULT_URL.goAbroad.certificateInfoStatistics,
    method: "get"
  }).then((res) => {
    return res.data
  });
}

// 按目的地显示今年出国次数top10
export function getPalaceInfoStatistics() {
  return request({
    url: DEFAULT_URL.goAbroad.palaceInfoStatistics,
    method: "get"
  }).then((res) => {
    return res.data
  });
}
// 按部门显示今年出国次数top10
export function departmentInfoStatistics() {
  return request({
    url: DEFAULT_URL.goAbroad.departmentInfoStatistics,
    method: "get"
  }).then((res) => {
    return res.data
  });
}
// 获取出勤出境分页
export function getFindAbroadRecordPage(params) {
  return request({
    url: DEFAULT_URL.goAbroad.findAbroadRecordPage,
    method: "get",
    params: params
  }).then((res) => {
    let size = res.data.size;
    let data = res.data.records;
    let total = res.data.total;
    return { data, total, size };
  });
}