import request from '@/utils/request';
import DEFAULT_URL from '@/config/rest-url';

// 谈话谈心列表 分页
export function findInterViewPage (params) {
  return request({
    url: DEFAULT_URL.report.findInterViewPage,
    method: 'get',
    params
  })
}
// 事项申报列表 分页
export function findReportPage (params) {
  return request({
    url: DEFAULT_URL.report.findReportPage,
    method: 'get',
    params
  })
}

// 层级管理 查询层级树
export function treeAndUser (params) {
  return request({
    url: DEFAULT_URL.post.treeAndUser,
    method: 'get',
    params
  })
}

// 层级评价
export function findWorknotePage (params) {
  return request({
    url: DEFAULT_URL.post.findWorknotePage,
    method: 'get',
    params
  })
}

// 工作日志统计 
export function countWorkNote (params) {
  return request({
    url: DEFAULT_URL.post.countWorkNote,
    method: 'get',
    params
  })
}

// 工作日志评分
export function noteAduit (params) {
  return request({
    url: DEFAULT_URL.post.noteAduit,
    method: 'post',
    params
  })
}

// 年度报告
export function getUserList (params) {
  return request({
    url: DEFAULT_URL.post.getUserList,
    method: 'get',
    params
  })
}
