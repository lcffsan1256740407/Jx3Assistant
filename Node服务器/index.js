let express = require('express')
let mysql = require('mysql')
let jwt = require('jsonwebtoken')
let app = express()
// 创建jwt生成token的秘钥
let secret = 'Make Sure Admin'
// token授权未通过时函数
let tokenError = function (res) {
    res.send({
        code: '300',
        message: 'token授权错误,无权访问'
    })
}


// 创建数据库连接
let sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '123456',
    database: 'jx3demo',
})
// 启动数据库连接
sql.connect((err) => {
    if (!err) {
        console.log('数据库连接成功')
    } else {
        console.log('数据库连接失败')
    }
})
// 设置跨域
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type,token");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})
// 服务启动监听
app.listen(3000, () => {
    console.log('3000端口已经启动.....')
})




// 登录请求(无需token验证)
app.post('/jx3/login', (req, res) => {
    console.log('接收到了-->登录<--请求')
    console.log(req.query)
    sql.query(`select * from manager where username = '${req.query.UserName}' and password = '${req.query.PassWord}'`, (err, result) => {
        if (err) {
            res.send({
                code: '300',
                message: '系统错误'
            })
        } else {
            if (result.length == 0) {
                res.send({
                    code: '300',
                    message: '账号或密码错误'
                })
            } else {
                //登录成功,生成token
                let payload = { ...req.query, admin: true }
                let token = jwt.sign(payload, secret)
                let name = result[0].name
                res.send({
                    code: '200',
                    message: '管理员登录成功',
                    token,
                    name
                })
            }
        }
    })
})

// 删除账号请求
app.post('/jx3/delete', (req, res) => {
    console.log('接收到了-->删除账号<---请求')
    jwt.verify(req.headers.token, secret, (err) => {
        if (!err) {
            sql.query(`delete from accountlist where id = ${parseInt(req.query.id)} `, (err, result) => {
                res.send({
                    code: '200',
                    message: '删除账号成功'
                })
            })
        } else {
            tokenError(res)
        }
    })
})

// 修改状态请求
app.post('/jx3/status', (req, res) => {
    console.log('接收到了-->修改状态<--请求')
    jwt.verify(req.headers.token, secret, (err) => {
        if (!err) {
            sql.query(`update accountlist set roleState = ${req.query.status} where id = ${parseInt(req.query.id)}`, (err, result) => {
                res.send({
                    code: '200',
                    message: '修改状态成功'
                })
            })
        } else {
            tokenError(res)
        }
    })
})

// 新增账号请求
app.post('/jx3/add', (req, res) => {
    console.log('接收到了-->添加账号<--请求')
    jwt.verify(req.headers.token, secret, (err) => {
        if (!err) {
            sql.query(`insert into accountlist (roleName,roleSect,roleArea,roleTask,roleState,roleAccount,rolePassword,roleMsg) values ('${req.query.roleName}',${req.query.roleSect},${req.query.roleArea},${req.query.roleTask},${req.query.roleState},'${req.query.roleAccount}','${req.query.rolePassword}','${req.query.roleMsg}')`, (err, result) => {
                res.send({
                    code: '200',
                    message: '新增成功'
                })
            })
        } else {
            tokenError(res)
        }
    })
})

// 查询代打账号列表请求
app.post('/jx3/accountlist', (req, res) => {
    console.log('接收到了-->查询账号列表<---请求')
    console.log(req.query)
    console.log(req.headers.token)
    jwt.verify(req.headers.token, secret, (err) => {
        if (!err) {
            let all = `select * from accountlist where roleName like "%${req.query.roleName ? req.query.roleName : ''}%"`
            let querySect = ` and  roleSect = "${req.query.roleSect}"`
            let queryArea = ` and  roleArea = "${req.query.roleArea}"`
            let queryTask = ` and  roleTask = "${req.query.roleTask}"`
            let queryState = ` and  roleState = "${req.query.roleState}"`

            if (req.query.roleSect == '' || req.query.roleSect == undefined) {
                querySect = ''
            } else {
                querySect = ` and  roleSect = "${req.query.roleSect}"`
            }

            if (req.query.roleArea == '' || req.query.roleArea == undefined) {
                queryArea = ''
            } else {
                queryArea = ` and  roleArea = "${req.query.roleArea}"`
            }

            if (req.query.roleTask == '' || req.query.roleTask == undefined) {
                queryTask = ''
            } else {
                queryTask = ` and  roleTask = "${req.query.roleTask}"`
            }

            if (req.query.roleState == '' || req.query.roleState == undefined) {
                queryState = ''
            } else {
                queryState = ` and  roleState = "${req.query.roleState}"`
            }
            // 先模糊查
            sql.query(all + querySect + queryArea + queryTask + queryState, (err, result) => {
                let total = result.length
                console.log('长度为:' + total)
                // 分页
                let size = req.query.pageSize ? req.query.pageSize : 5    //每页条数
                let number = req.query.pageNum ? (req.query.pageNum - 1) * size : 0 //页码->偏移量
                sql.query(all + querySect + queryArea + queryTask + queryState + ` limit ${number},${size}`, (err, result) => {
                    res.send({
                        code: '200',
                        message: total == 0 ? '数据库中并没有该类数据' : '查询账号列表响应成功',
                        content: {
                            total,
                            result
                        }
                    })
                })
            })
        } else {
            tokenError(res)
        }
    })
})

