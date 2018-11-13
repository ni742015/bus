const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')
const onerror = require('koa-onerror')
const errorHandel = require('./utils/errorHandel')
const api_middleware = require('./middlewares/api')

// 优化错误提示
onerror(app)

module.exports = function (router) {
	app.use(cors())

	// middlewares
	app.use(bodyparser({
		enableTypes:['json', 'form']
	}))
	app.use(json())
	// app.use(require('koa-static')(__dirname + '/public'))

	// logger
	app.use(async (ctx, next) => {
		const start = new Date()
		await next()
		const ms = new Date() - start
		console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
	})


	//添加格式化处理响应结果的中间件，在添加路由之前调用 (仅对/api开头的url进行格式化处理)
	app.use(api_middleware.bind(this))

	// routes
	app.use(router.routes(), router.allowedMethods())

	// error-handling
	app.on('error', errorHandel)

	return app
}
