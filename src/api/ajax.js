// 返回值：promise对象（异步返回的数据是response.data）
import axios from 'axios'
import qs from 'qs'

export default function ajax(url = '', data = {}, type = 'GET') {
    return new Promise(function (resolve, reject) {
        let promise
        if (type === 'GET') {
// 准备 url query 参数数据
            let dataStr = '' //数据拼接字符串
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
// 发送 get 请求

            promise = axios.get(url)
        } else {
// 发送 post 请求
            data = qs.stringify(data)
            promise = axios.post(url, data)
        }
        // 成功
        promise.then(response => {
            resolve(response.data)
        })
        // 失败
            .catch(error => {
                reject(error)
            })
    })
}