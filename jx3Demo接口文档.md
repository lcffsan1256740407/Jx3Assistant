### 公共

**基础路径**

> http://127.168.0.1:3000

**基础返回结构**

> | 参数    | 类型    | 说明                         |
> | :------ | :------ | ---------------------------- |
> | code    | Integer | 调用状态码：200成功，300失败 |
> | message | String  | 接口调用返回信息             |
> | content | Object  | 内容                         |

**基础返回示例**

```json
{
    "code": 200,
    "message": "接口调用成功",
    "content": {
    }
}
```

**header信息说明**

> 除了登录接口外，其他接口都需要认证，所以header中需要带token



**特殊字段约定说明**

> 角色门派

​	0 藏剑

​	1 明教

​	2 天策

​	3 气纯

​	4 药宗



> 角色区服

​	0 双梦

​	1 唯满侠

​	2 姨妈服

​	3 纵月



> 当前业务

​	0 五胜

​	1 刷币

​	2 指定上段



> 当前状态

​	0 未完成

​	1 进行中

​	2 完成/未付款

​	3 完成/已付款





### 1\. 登录接口

> 描述：登录接口

**URL**

> /jx3/login

**HTTP请求方式**

> POST

**请求参数**

> 参数格式：JSON

> | 参数     | 必选 | 类型   | 说明   |
> | :------- | :--- | :----- | ------ |
> | UserName | 是   | String | 用户名 |
> | PassWord | 是   | String | 密码   |

**参数示例**

```json
{
    "UserName":"asda",
    "PassWord":"sada"
}
```

**返回字段**

> | 返回字段 | 字段类型 | 说明                |
> | :------- | :------- | :------------------ |
> | token    | String   | 登录成功，颁发token |

**返回值示例**

``` json
{
    "code": 200,
    "message": "登录请求响应成功",
    "content": {
        "token":"这是一个假数据token"
    }
}
```



### 2. 查询接口(组合模糊分页)

> 描述：查询剑三代打账号列表

**URL**

> /jx3/accountlist

**HTTP请求方式**

> POST

**请求参数**

> 参数格式：JSON

> | 参数      | 必选 | 类型    | 说明                      |
> | :-------- | :--- | :------ | ------------------------- |
> | roleName  | 否   | String  | 角色名称                  |
> | roleSect  | 否   | String  | 角色门派                  |
> | roleArea  | 否   | String  | 角色区服                  |
> | roleTask  | 否   | String  | 当前业务                  |
> | roleState | 否   | String  | 当前状态                  |
> | pageNum   | 否   | Integer | 页码，不传默认查第1页     |
> | pageSize  | 否   | Integer | 每页条数，不传默认每页5条 |

**参数示例**

```json
{
    "roleName":"名",
    "roleArea":"",
    "pageNum":1,
    "pageSize":5
}
```

**返回字段**

> | 返回字段    | 字段类型 | 说明       |
> | :---------- | :------- | :--------- |
> | code        | srting   | 状态码     |
> | message     | string   | 说明       |
> | content     | object   | 数据       |
> | └ total     | number   | 数据总条数 |
> | └ result    | object   | 数据内容   |
> | └ id        | number   | 账号Id     |
> | └ roleName  | string   | 角色名称   |
> | └ roleSect  | string   | 角色门派   |
> | └ roleArea  | string   | 角色区服   |
> | └ roleTask  | string   | 角色业务   |
> | └ roleState | string   | 角色状态   |

**返回值示例**

``` json
{
    "code": 200,
    "message": "账号查询列表成功",
    "content": {
        "total": 3,
        "result": [
            {
                "id":1,
              	"roleName": "测试角色一号",
          		"roleSect": "明教",
          		"roleArea": "双梦",
          		"roleTask": "无",
          		"roleState": "无",
          		"roleMsg": "圣火喵喵",
          		"roleAccount": "ceshiyongzhanghao",
          		"rolePassword": "mima",
            },
            {
                "id":2,
                "roleName": "测试角色二号",
          		"roleSect": "藏剑",
          		"roleArea": "双梦",
          		"roleTask": "无",
          		"roleState": "无",
          		"roleMsg": "圣火喵喵",
          		"roleAccount": "ceshiyongzhanghao",
          		"rolePassword": "mima",
            }
        ]
    }
}
```



### 3. 删除账号

> 描述：删除账号

**URL**

> /jx3/delete

**HTTP请求方式**

> POST

**请求参数**

> 参数格式：JSON

> | 参数 | 必选 | 类型   | 说明   |
> | :--- | :--- | :----- | ------ |
> | id   | 是   | srting | 账号id |

**参数示例**

```json
{
    "id":'1'
}
```

**返回值示例**

``` json
{
    "code": 200,
    "message": "账号删除成功"
}
```



### 4. 修改当前状态

> 描述：修改当前的账号状态

**URL**

> /jx3/status

**HTTP请求方式**

> POST

**请求参数**

> 参数格式：JSON

> | 参数   | 必选 | 类型   | 说明   |
> | :----- | :--- | :----- | ------ |
> | id     | 是   | string | 账号id |
> | status | 是   | string | 状态码 |

**参数示例**

```json
{
    "id":'1',
    "status":'0'
}
```

**返回值示例**

``` json
{
    "code": 200,
    "message": "状态修改成功"
}
```



### 5. 新增账号

> 描述：新增一个账号

**URL**

> /jx3/add

**HTTP请求方式**

> POST

**请求参数**

> 参数格式：JSON

> | 参数         | 必选 | 类型   | 说明         |
> | :----------- | :--- | :----- | ------------ |
> | roleName     | 是   | string | 角色名       |
> | roleSect     | 是   | string | 角色门派     |
> | roleArea     | 是   | string | 角色区服     |
> | roleTask     | 是   | string | 角色业务     |
> | roleState    | 是   | string | 角色状态     |
> | roleMsg      | 是   | string | 角色备注信息 |
> | roleAccount  | 是   | string | 账号         |
> | rolePassword | 是   | string | 密码         |

**参数示例**

```json
{
    roleName:'角色名',
    roleSect:'门派',
    roleArea:'区服',
    roleTask:'业务 ',
    roleState:'状态',
    roleMsg:'备注信息',
    roleAccount:'账号',
    rolePassword:'密码'
}
```

**返回值示例**

``` json
{
    "code": 200,
    "message": "账号新增成功"
}
```



