
import axios from 'axios'

export function apiGetCode({ code, phone }) {
    return axios({
        url: process.env.VUE_APP_URL + `/sendsms`,
        method: 'post',
        data: {
            code: code,
            phone: phone
        },
        //一定注意
        withCredentials: true
    })
}

// 用户注册 方法
export function apiRegister({
    username, phone,
    email, avatar, password, rcode
}) {
    return axios({
        url: process.env.VUE_APP_URL + `/register`,
        method: 'post',
        data: {
            username, phone,
            email, avatar, password, rcode
        }

    })
}