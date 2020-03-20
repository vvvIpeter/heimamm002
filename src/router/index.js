// 导入vue
import Vue from "vue"
//导入vuerouter
import VueRouter from 'vue-router'
// 导入登录组件
import login from "../views/login/index.vue"
import index from "../views/index/index.vue"
Vue.use(VueRouter)
const router = new VueRouter({
    // 配置路由
    routes:[
        {
            path:'/login',
            component:login
        },
        {
            path:'/',
            redirect:'/login'
        },{
            path:'/index',
            component:index
        }
    ]
})
export default router