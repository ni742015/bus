Bus
============
[![GitHub Stars](https://img.shields.io/github/stars/ni742015/bus.svg)](https://github.com/ni742015/bus/stargazers) [![GitHub Issues](https://img.shields.io/github/issues/ni742015/bus.svg)](https://github.com/ni742015/bus/issues) [![Current Version](https://img.shields.io/badge/version-0.2.0-green.svg)](https://github.com/ni742015/bus) 

[中文文档](./README_zh-CN.md)

> A build system and framework for Node like Next.js

Bus is a one-stop solution for Node.js. Inspired by Vue-cil, Next.js, and [Backpack](https://github.com/jaredpalmer/backpack). Bus lets you set up a koa server by just running one command. You can use Babel, Webpack, Swagger, Mongoose in your project with less config.

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

Install it:

```bash
npm install -g bus-core
bus init
// or
npx bus-core init

```

Init project:
```bash
cd yourproject
npm install
```

and edit the config file:src/config/index.js like this:
```
{
    port: 3000,
    mongodb: {
        url: 'mongodb://test:test@mongoBaseUrl/test'
    }
}
```
npm run dev and go to http://localhost:3000/api/swagger-html


### Init Config
before start your project, check the options in the src/index.js
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
| [mongodb] | <code>Object</code> | mongodb options |
| [mongodb.url] | <code>String</code> | mongodb url |
| [mongodb.options] | <code>Object</code> | [mongoose connent options](https://mongoosejs.com/docs/connections.html#options) |
| [logsPath] | <code>String</code> | logs output paths(default: ./logs) |
| [apiPrefix] | <code>String</code> | prefix add before every route |
| [swaggerConfig] | <code>Object</code> | [swagger options](https://github.com/ni742015/bus/blob/master/packages/bus-core/src/apis/index.js) |
| [port] | <code>String</code> | server port |
| [jwt] | <code>Object</code> | jwt options |
| [jwt.secret] | <code>String</code> | jwt secret(use to create a token) |
| [jwt.excludeUrls] | <code>Array</code> | unauth routes |

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
if you have set jwt option in your config, you can import the bus instance to create a token
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

The schema is used for either swagger's responses and mongoose's schema

defind a schmea
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

Model for mongoose([check here](https://mongoosejs.com/docs/guide.html#models))

> tips: each model will be added three default methods([check here](https://github.com/ni742015/bus/blob/master/packages/bus-core/src/models/helpers.js))

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
To combine swagger with api, we use using decorator to make api definition([koa-swagger-decorator](https://github.com/Cody2333/koa-swagger-decorator))

beneath params will be given to your module

| Param | Type | Description |
| --- | --- | --- |
| [examples] | <code>Object</code> | swagger examples can be used in body or responses |
| [models] | <code>Object</code> | mongoose model |
| [tag] | <code>Object</code> | swagger decorator tag |
| [decorator] | <code>Object</code> | swagger decorator |
| [ApiError] | <code>Object</code> | [error object](#apierrors) |
| [ApiErrorNames] | <code>String</code> | [error names](#apierrors)  |

return example

| Param | Type | require | Description |
| --- | --- | --- | --- |
| [commonApiConfig] | <code>Object</code> | false | config for commonapi e.g. {baseUrl, name} |
| [ApiClass] | <code>Object</code> | true | your api class |


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
if you want to extend your apiClass with commonApi, here's what you need to know

1. cover the common api
you can cover the common api by define the same function name, such as get, post, query, put, delete, deleteBatch

2. change the url
{prefix}/{filename} is the default api url, if you set the baseUrl, it will be change to this {prefix}/{baseUrl}/{filename}

#### hooks
 -- The Document order is the same as the execution order --
* onInitMongoose
    ```
    // will be call after mongoose.connect
    onInitMongoose(mongoose)
    ```
* onInitSchema
    ```
    // will be call when fromat scheam and example, you can add unify attributes for both of them here
    await hooks.onInitSchema(name, data) // promise
    // return fromatedData
    ```
* onInitModels
    ```
    // will be call before use mongoose.model(name, Schema)
    await hooks.onInitModels(name, Schema) // promise
    // return fromatedSchema
    ```
* onInitApi
    ```
    // will be call before add to router, you can add unify methods for each apiClass.
    // args is the same as the one pass to apiClass
    await hooks.onInitApi(name, apiClass, args) // promise
    ```
* onInitMiddlewares
    ```
    // will be call when init middlewares, you can add your middlewares by modifty the middlewares argument.
    this.hooks.onInitMiddlewares(middlewares, app)

    // e.g.
    // onInitMiddlewares(middlewares) {
    //     middlewares.unshift(koaStatic(path.join( __dirname, '../client'), {gzip: true}))
    // }
    ```
* onTokenCheck
    ```
    // will be call before request pass to api(exclude jwt.excludeUrls)
    await this.hooks.onTokenCheck(decode, ctx) // promise, the decode jwt data will be the first argument
    ```
* beforeApiEnter
    ```
    // will be call before request pass to api(for all apis)
    await beforeApiEnter(ctx, next) // promise
    ```
* beforeApiResolve
    ```
    // will be call before request resloved(for all apis), you can format the result here
    ctx.body = (beforeApiResolve && await beforeApiResolve(ctx)) || { // promise
        success: true,
        data: ctx.body
    }
    ```

#### ApiErrors
enumeration
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
For custom advanced behavior, you can create a bus.config.js in the root of your project's directory (next to package.json).

### Customizing webpack config
To extend webpack, you can define a function that extends its config in bus.config.js.

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
To extend our usage of babel, you can define a .babelrc file at the root of your app. This file is optional.

If found, Bus will consider it to be the source of truth. Thus it must define what Bus needs as well, which is the bus-core/babel preset.

This is designed so that you are not surprised by modifications we could make to the default babel configurations.

Here's an example .babelrc file:
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
Generate a template (only support base template now ...)

<img src="https://github.com/ni742015/bus/blob/master/assets/command-init.png" width="600" alt="bus dev">


### `bus dev`

Runs bus in development mode.

Your code will reload if you make edits.  
You will see the build errors in the console that look like this.

<img src="https://github.com/ni742015/bus/blob/master/assets/command-error.png" width="600" alt="bus dev">

### `bus build`

Builds the app for production to the `build` folder.  
It correctly bundles your production mode and optimizes the build for the best performance.

You can run your production application with the following command:

```bash
node ./build/main.js
```

Your application is ready to be deployed!

_Note: Make sure to add the `build` directory to your `.gitignore` to keep compiled code out of your git repository_

## Inspiration

* [jaredpalmer/backpack](https://github.com/jaredpalmer/backpack)(if you only need a minimalistic it's a better choice.)
* [zeit/next.js](https://github.com/zeit/next.js)
* [vuejs/vue-cli](https://github.com/vuejs/vue-cli)

## Authors
* Yohann (421225824@qq.com)
