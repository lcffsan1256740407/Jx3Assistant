// 引入路由配置
import VueRouter from "vue-router"

// 登录和主页
import LoginPage from "../layout/LoginPage"
import HomePage from "../layout/HomePage"

// 代打账号
import PhAccount from "../pages/DdAccount/PhAccount"
import AddAccount from "../pages/DdAccount/AddAccount"


// 创建路由
const router = new VueRouter({
    routes: [
        // 打开页面的重定向
        { path: '/', redirect: '/loginpage' },
        // 登录页面
        {
            name: 'loginpage',
            path: '/loginpage',
            component: LoginPage
        },
        // 主页面
        {
            name: 'homepage',
            path: '/homepage',
            component: HomePage,
            redirect: '/homepage/phaccount',
            children: [
                // 代打账号展示页面
                {
                    name: 'phaccount',
                    path: 'phaccount',
                    component: PhAccount,
                },
                // 代打账号新增页面
                {
                    name: 'addaccount',
                    path: 'addaccount',
                    component: AddAccount
                }
            ]
        }
    ]
})

// 前置路由导航
// router.beforeEach((to, from, next) => {
//     if (to.meta.isAuth) {

//     }else{

//     }
// })


// 导出路由
export default router