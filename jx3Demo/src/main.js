// 基础引入
import Vue from 'vue'
import App from './App.vue'

// 引入路由
import VueRouter from "vue-router"
Vue.use(VueRouter)
import router from "./router"

// 引入Element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)


new Vue({
  el:'#demo',
  render: createElement => createElement(App),
  router
})
