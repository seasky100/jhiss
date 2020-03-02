import CryptoJS from 'crypto-js'

/**
 * des加密
 * @param  {String} strMessage 待加密字符串
 * @param  {String} key        加密Key
 * @return {String}            加密后结果
 */
export const encryptByDES = (strMessage, key) => {
    key = key || '\u0067\u0072\u0065\u0061\u0074\u006d\u0061\u0070'
    var keyHex = CryptoJS.enc.Utf8.parse(key)
    var encrypted = CryptoJS.DES.encrypt(strMessage, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
}

// 获取当前url的协议+域名+端口号
export const getUrl = () => {
    var protocol = window.location.protocol
    var hostname = window.location.hostname
    var port = window.location.port || '80'
    return protocol + '//' + hostname + ':' + port
}