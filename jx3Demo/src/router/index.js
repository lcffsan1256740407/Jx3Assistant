// 引入路由配置
import VueRouter from "vue-router"

// 登录和主页
import LoginPage from "../layout/LoginPage"
import HomePage from "../layout/HomePage"

// 代打账号组件
import PhAccount from "../pages/DdAccount/PhAccount"
import AddAccount from "../pages/DdAccount/AddAccount"

// 数据可视化页面
import DataViews from "../pages/DataView/DataViews"

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
            meta:{NeedAuth:true},
            children: [
                // 代打账号展示页面
                {
                    name: 'phaccount',
                    path: 'phaccount',
                    component: PhAccount,
                    meta:{NeedAuth:true},
                },
                // 代打账号新增页面
                {
                    name: 'addaccount',
                    path: 'addaccount',
                    component: AddAccount,
                    meta:{NeedAuth:true},
                },
                // 数据可视化页面
                {
                    name: 'dataviews',
                    path: 'dataviews',
                    component: DataViews,
                    meta:{NeedAuth:true},
                },
            ]
        }
    ]
})

// 前置路由导航
router.beforeEach((to, from, next) => {
    if (to.meta.NeedAuth) {
        if (localStorage.getItem("token") == null) {
            alert("没有权限访问")
            next('/')
        } else {
            next()
        }
    } else {
        next()
    } 
})


// 导出路由
export default router