import request from "@/utils/request";
import DEFAULT_URL from "@/config/rest-url";

/*
* 获取【工作评价-评价分析预警】接口
* */

// 日志预警柱线图
export function getAuditWarnBarChat(params) {
    return request({
        url: DEFAULT_URL.evaluation.AuditWarnBarChat,
        method: 'get',
        params
    }).then((res) => {
        return res.data
    })
}

// 日志预警柱线图
export function getAuditWarnLineChat(params) {
    return request({
        url: DEFAULT_URL.evaluation.AuditWarnLineChat,
        method: 'get',
        params
    }).then((res) => {
        return res.data
    })
}

// 日志预警分页
export function getFindAuditWarningPage(params) {
    return request({
        url: DEFAULT_URL.evaluation.findAuditWarningPage,
        method: 'get',
        params
    }).then((res) => {
        let size = res.data.size;
        let data = res.data.records;
        let total = res.data.total;
        return {data, total, size}
    })
}

// 日志预警详情
export function getAuditWarningById(params) {
    return request({
        url: DEFAULT_URL.evaluation.auditWarningById,
        method: 'get',
        params
    }).then((res) => {
        return res
    })
}

// 首页日历评分
export function findWorknotePage(params) {
    return request({
        url: DEFAULT_URL.evaluation.findWorknotePage,
        method: 'get',
        params
    }).then((res) => {
        return res
    })
}