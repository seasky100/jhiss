import request from '@/utils/request';
import DEFAULT_URL from '@/config/rest-url';

// 人员台账分页
export function getUserList(params) {
    return request({
        url: DEFAULT_URL.standingBook.getUserList,
        method: 'get',
        params
    }).then(() => {})
}

// 人员台账详情
export function getUserById(params) {
    return request({
        url: DEFAULT_URL.standingBook.getUserById,
        method: 'get',
        params
    }).then(() => {})
}