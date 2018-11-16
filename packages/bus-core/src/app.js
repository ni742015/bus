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
	let middlewares = [
		cors(),
		bodyparser({
			enableTypes:['json', 'form']
		}),
		json(),
		async (ctx, next) => {
			const start = new Date()
			await next()
			const ms = new Date() - start
			console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
		},
		api_middleware.bind(this),
		[router.routes(), router.allowedMethods()]
	]

	if(this.hooks.initMiddlewares) {
		middlewares = this.hooks.initMiddlewares(middlewares, app) || middlewares
	}

	for (const md of middlewares) {
		if(Object.prototype.toString.call(md) === '[object Array]') {
			app.use.apply(app, md)
		} else {
			app.use(md)
		}
	}

	// error-handling
	app.on('error', errorHandel)

	return app
}
