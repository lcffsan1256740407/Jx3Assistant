import {Service} from './index.js'

// 登录请求
export let loginRequest = data => {
    return Service({
        url:'/jx3/login',
        method:'post',
        params:{
            ...data
        }
    })
}

// 查询代打账号列表请求
export let phAccountRequest = data => {
    return Service({
        url:'/jx3/accountlist',
        method:'post',
        params:{
            ...data
        }
    })
}

// 删除账号
export let deleteAccount = id => {
    return Service({
        url:'/jx3/delete',
        method:'post',
        params:{
            id
        }
    })
}

// 修改状态
export let changeStatus = data => {
    return Service({
        url:'/jx3/status',
        method:'post',
        params:{
            ...data
        }
    })
}

// 新增账号
export let addAccount = data => {
    return Service({
        url:'/jx3/add',
        method:'post',
        params:{
            ...data
        }
    })
}