import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from "./router/index.js"
// 导入全局样式
import "./style/index.css"
// 导入axios
import axios from "axios"
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
