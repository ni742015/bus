Bus
============
[![GitHub Stars](https://img.shields.io/github/stars/ni742015/bus.svg)](https://github.com/ni742015/bus/stargazers) [![GitHub Issues](https://img.shields.io/github/issues/ni742015/bus.svg)](https://github.com/ni742015/bus/issues) [![Current Version](https://img.shields.io/badge/version-0.2.0-green.svg)](https://github.com/ni742015/bus) 

[english](./README.md)

> 一个针对Node.js的脚手架构建工具，帮助快速搭建后端开发项目

Bus是针对Node.js的一站式解决方案. 受到Vue-cil, Next.js, 和[Backpack](https://github.com/jaredpalmer/backpack)的启发. Bus 让你可以通过一行命令快速启动一个基于koa的后端项目. 你可以在你的项目中使用Babel, Webpack, Swagger, Mongoose通过很少的一些配置.

---
- [How to use](#how-to-use)
  - [Setup](#setup)
  - [Init Conifg](#init-config)
    - [Config](#config)
        - [Jwt](#jwt)
    - [Scheam](#scheam)
    - [Model](#model)
    - [Api](#api)
        - [commonApiConfig](#commonApiConfig)
    - [hooks](#hooks)
    - [ApiErrors](#apierrors)
- [Custom configuration](#custom-configuration)
  - [Customizing webpack config](#customizing-webpack-config)
  - [Customizing babel config](#customizing-babel-config)
- [CLI Commands](#cli-commands)
- [Inspiration](#inspiration)

---

## How to use
### Setup

安装方式:

```bash
npm install -g bus-core
bus init
// or
npx bus-core init

```

初始化项目:
```bash
cd yourproject
npm install
```

修改配置文件 路径:src/config/index.js 参考以下配置:
```
{
    port: 3000,
    mongodb: {
        url: 'mongodb://test:test@mongoBaseUrl/test'
    }
}
```
运行 npm run dev 成功后打开 http://localhost:3000/api/swagger-html


### Init Config
在正式开发之前, 请先确认src/index.js中的设置
```
import Bus from "bus-core";
import Api from "./apis";
import Model from "./models";
import Schema from "./schemas";

const bus = new Bus({
    config: {
        serect: 'bus',
        excludeCheckUrl: [
            {url: /user$/, methods: ['GET']}
        ]
    },
    Api,
    Model,
    Schema
})
```

#### Config

| Param | Type | Description |
| --- | --- | --- |
| [mongodb] | <code>Object</code> | mongodb设置项 |
| [mongodb.url] | <code>String</code> | mongodb url |
| [mongodb.options] | <code>Object</code> | [mongoose链接设置](https://mongoosejs.com/docs/connections.html#options) |
| [logsPath] | <code>String</code> | logs输出地址(default: ./logs) |
| [apiPrefix] | <code>String</code> | 每个路由的前缀 |
| [swaggerConfig] | <code>Object</code> | [swagger设置](https://github.com/ni742015/bus/blob/master/packages/bus-core/src/apis/index.js) |
| [port] | <code>String</code> | 程序端口 |
| [jwt] | <code>Object</code> | jwt 设置 |
| [jwt.secret] | <code>String</code> | jwt 秘钥(用于加密生成一个token) |
| [jwt.excludeUrls] | <code>Array</code> | 不需要授权的路由 |

Example:
```
new Bus({
    config: {
        port: 3000,
        apiPrefix: 'api',
        mongodb: {
            url: 'mongodb://test:test@localhost:27017/test',
            options: {
                useNewUrlParser: true,
                poolSize: 10
            }
        },
        swaggerConfig: {
            title: 'Swagger Test'
        },
        jwt: {
            secret: 'bus',
            excludeUrls: [
                /\/test/,
                {url: '/user', methods: ['GET']}
            ]
        }
    }
})
```

##### jwt
如果你在config中做了jwt相关的设置，你可以通过引用bus的实例来创建一个token
Example:
```
import bus from '../index.js'

class User {
    @request('POST', '/user/login')
    @summary('login api')
    @tag
    @body({
        username: {
            type: 'string',
            description: 'username'
        },
        password: {
            type: 'string',
            description: 'password'
        },
    })
    static async login(ctx) {
        const {username, password} = ctx.request.body
        const user = await userModel.findOne({username, password})
        
        if(user) {
            let data = {fullName: user.fullName}
            let token = bus.Token.create(data, '30d')

            ctx.body = {
                user: data,
                token
            }
        } else {
            throw new ApiError(ApiErrorNames.RESOURCES_EXIST)

        }
    }
}
```

#### Schema

schema 同时用于生成mongoose的映射model和swagger中的返回示例对象

定义一个schmea
```
// user.js
const mongoose = require('mongoose')

module.exports = {
	username: {
		type: String,
		example: 'admin', // use for swagger
		unique: true,
		required: true
	},
	role_id: {
		type: mongoose.Types.ObjectId,
		typeSwagger: String, // use for swagger
		example: 'role',
        ref: 'Role'
	},
}
```

#### Model

mongoose的model([详情](https://mongoosejs.com/docs/guide.html#models))

> 提示: 每个model都会有3个默认方法([详情](https://github.com/ni742015/bus/blob/master/packages/bus-core/src/models/helpers.js))

```
// user.js
module.exports = (schema, models) => {
	schema
		.virtual('fullName').get(function () {
			return this.name.first + ' ' + this.name.last;
		});

}

```

#### Api
我们使用decorator的写法来结合swagger和api，参考([koa-swagger-decorator](https://github.com/Cody2333/koa-swagger-decorator))

beneath params will be given to your module
| Param | Type | Description |
| --- | --- | --- |
| [examples] | <code>Object</code> | 根据scheam生成的swagger example |
| [models] | <code>Object</code> | mongoose model对象 |
| [tag] | <code>Object</code> | swagger decorator tag |
| [decorator] | <code>Object</code> | swagger decorator |
| [ApiError] | <code>Object</code> | [error 对象](#apierrors) |
| [ApiErrorNames] | <code>String</code> | [error 名称](#apierrors)  |

return example
| Param | Type | require | Description |
| --- | --- | --- | --- |
| [commonApiConfig] | <code>Object</code> | false | 通用接口继承设置，例 {baseUrl, name} |
| [ApiClass] | <code>Object</code> | true | 你的接口类 |


```
module.exports = ({
	examples,
	models,
	tag,
	decorator: {
		request,
		summary,
		body,
		middlewares,
		path,
		description,
		query,
		responses
	},
	ApiError,
	ApiErrorNames
}) => {
	const userModel = models.user
	const userExample = examples.user

	class User {
		@request('GET', '/users')
		@summary('获取用户信息')
		@tag
		@query({
			filter: {
				type: 'string',
				description: 'username filter'
			},
		})
		@responses(userExample)
		// cover common api 
		static async query(ctx) {
			const {filter} = ctx.query
			return userModel.like(filter, 'username') // this function is inherit from bus helper
				.then(user => ctx.body = user)
				.catch(err => {
					throw new ApiError(null, 400, err.message)
				})
		}
	}

	return {
		commonApiConfig: { // inherit common api
            name: 'user',
            baseUrl: 'users',
        },
		ApiClass: User
	}
}
```

##### commonApiConfig
如果你想继承通用的api，你需要知道以下几点

1. 覆盖common api
你可以通过定义同名方法的方式来覆盖common api，例如get, post, query, put, delete, deleteBatch

2. 修改url路径
默认的url是{prefix}/{filename}的形式, 如果你设置了baseUrl它会变成这样{prefix}/{baseUrl}/{filename}


#### hooks
 -- 文档中的顺序和实际执行顺序相同 --
* onInitMongoose
    ```
    // 在mongoose.connect之后调用
    onInitMongoose(mongoose)
    ```
* onInitSchema
    ```
    // 在格式化scheam和example的时候调用, 你可以在这里给他们一起添加属性
    await hooks.onInitSchema(name, data) // promise
    // return fromatedData
    ```
* onInitModels
    ```
    // 在用schema生成model前调用
    await hooks.onInitModels(name, Schema) // promise
    // return fromatedSchema
    ```
* onInitApi
    ```
    // 在api注册到router前调用, 你可以在这里给每个apiClass增加通用方法.
    // args和传递给apiClass的参数相同
    await hooks.onInitApi(name, apiClass, args) // promise
    ```
* onInitMiddlewares
    ```
    // 在初始化中间件的时候调用。你可以通过修改middlewares参数来添加你自己的中间件
    this.hooks.onInitMiddlewares(middlewares, app)

    // e.g.
    // onInitMiddlewares(middlewares) {
    //     middlewares.unshift(koaStatic(path.join( __dirname, '../client'), {gzip: true}))
    // }
    ```
* onTokenCheck
    ```
    // 在需要授权的请求进入对应api前被调用(除了 jwt.excludeUrls 中排除的)
    await this.hooks.onTokenCheck(decode, ctx) // promise, the decode jwt data will be the first argument
    ```
* beforeApiEnter
    ```
    // 在请求进入对应api前被调用(对所有api都适用)
    await beforeApiEnter(ctx, next) // promise
    ```
* beforeApiResolve
    ```
    // 在每个接口请求完成前调用(对所有api都适用), 你可以在这里统一处理返回格式
    ctx.body = (beforeApiResolve && await beforeApiResolve(ctx)) || { // promise
        success: true,
        data: ctx.body
    }
    ```

#### ApiErrors
默认提供一下几种错误格式

* ApiErrorNames.PARAMS_ERROR,  status:400, message: 'Request parameter is wrong' 
* ApiErrorNames.RESOURCES_EXIST,  status:400, message: 'Data already exists'
* ApiErrorNames.USER_NOT_PERMISSIONS,  status:401, message: 'User has no permissions'
* ApiErrorNames.RESOURCES_NOT_EXIST,  status:404, message: 'There is no resources'
* ApiErrorNames.SERVER_ERROR,  status:500, message: 'Internal Server Error'
* ApiErrorNames.INVALID_CODE,  status:400, message: 'Invalid code'

e.g.
```
new ApiError(ApiErrorNames.PARAMS_ERROR)
```

## Custom configuration
你可以创建一个在项目根目录创建一个bus.config.js文件，来做更多的设置.

### Customizing webpack config
你可以通过在bus.config.js中定义一个webpack方法来拓展webpack的设置

```
// bus.config.js
module.exports = {
	webpack(config) {
		let loaders = config.module.rules
		loaders.push(	{
			test: /\.html$/,
			loader: 'raw-loader'
		})

		return config
	}
}
```

### Customizing babel config
你可以创建一个在项目根目录创建一个.babelrc文件来拓展babel的设置.

参考以下示例:
```
{
  "presets" : ["bus-core/babel"],
	"env": {
    "production": {
      "plugins": [
        ["transform-remove-console", { "exclude": [ "error", "warn", "info"] }]
      ]
    }
  }
}
```

## CLI Commands

### `bus init`
生成一个项目 (现在只提供base模板)

<img src="https://github.com/ni742015/bus/blob/master/assets/command-init.png" width="600" alt="bus dev">


### `bus dev`

开发环境运行.

当你修改代码时会自动重载，代码错误会如下显示.  

<img src="https://github.com/ni742015/bus/blob/master/assets/command-error.png" width="600" alt="bus dev">

### `bus build`

将以生产模式优化构建以获得最佳性能，构建后的代码将输出在 build 目录下.

你可以通过以下命令运行构建后的代码:

```bash
node ./build/main.js
```

你的应用已经可以发布了!


## Inspiration

* [jaredpalmer/backpack](https://github.com/jaredpalmer/backpack)(if you only need a minimalistic it's a better choice.)
* [zeit/next.js](https://github.com/zeit/next.js)
* [vuejs/vue-cli](https://github.com/vuejs/vue-cli)

## Authors
* Yohann (421225824@qq.com)