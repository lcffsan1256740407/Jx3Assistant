// 初始化axios
import axios from 'axios'

export const Service = axios.create({
    timeout: 7000, // 请求超时时间
    baseURL: "http://127.168.0.1:3000" //Node 服务器端口地址
})

// 添加请求拦截器
Service.interceptors.request.use(config => {
    // 打印输出请求配置信息
    // console.log(config)
    return config
})

// 添加响应拦截器
Service.interceptors.response.use(
 response => {
        return response
    },
 error => {
        return error
})