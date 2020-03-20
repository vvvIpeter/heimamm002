// 用来封装所有首页的网络请求的方法
import axios from 'axios'
// 导入操作token的方法
import { getToken } from '../utils/mytoken'

// 创始一个 axios 实例对象
const instance = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})

//封装用户信息的接口
export function apiInfo(){
    return instance({
        url:'/info',
        method:'get',
        params:{
            hearder:{
                token:getToken()
            }
        }

    })
}
