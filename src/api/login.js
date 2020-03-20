import axios from "axios"

var instance = axios.create({
    baseURL:process.env.VUE_APP_URL,
    // 跨域携带 cookies
    withCredentials: true
})

// 封装登录接口
export function apiLogin({phone,password,code}){
    return instance({
        url:'/login',
        method:'post',
        data:{
            phone:phone,
            password:password,
            code:code
        }
    })
}