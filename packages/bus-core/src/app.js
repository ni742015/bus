const Koa = require('koa')
const app = new Koa()
const bodyparser = require('koa-bodyparser')
const cors = require('koa2-cors')
const MwChain = require('./utils/mwChain')
const errorHandel = require('./utils/errorHandel')
const api_middleware = require('./middlewares/api')

module.exports = function (router) {
	let {onInitMiddlewares, onError} = this.hooks
	let {config} = this
	let middlewares = []
	let mwChain = new MwChain([
		{name:'_cors', opt: config.cors || {}, middleware: cors},
		{name:'_bodyparser', opt: {enableTypes:['json', 'form']}, middleware: bodyparser},
		{name:'_timer', opt: {}, middleware: () => async (ctx, next) => {
			const start = new Date()
			await next()
			const ms = new Date() - start
			console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
		}},
		{name:'_auth', opt: {}, middleware: () => api_middleware.bind(this)},
		{name:'_api', opt: {}, middleware: () => [router.routes(), router.allowedMethods()]},
	])

	if(config.middlewares) {
		config.middlewares(mwChain)
	}

	middlewares = mwChain.getMiddlewares()
	// let middlewares = [
	// 	cors(),
	// 	bodyparser({
	// 		enableTypes:['json', 'form']
	// 	}),
	// 	json(),
	// 	async (ctx, next) => {
	// 		const start = new Date()
	// 		await next()
	// 		const ms = new Date() - start
	// 		console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
	// 	},
	// 	api_middleware.bind(this),
	// 	[router.routes(), router.allowedMethods()]
	// ]

	if (onInitMiddlewares) {
		middlewares = onInitMiddlewares(middlewares, app) || middlewares
	}

	for (const md of middlewares) {
		if(Object.prototype.toString.call(md) === '[object Array]') {
			app.use.apply(app, md)
		} else {
			app.use(md)
		}
	}

	// error-handling
	app.on('error', function(error, ctx) {
		onError(error, ctx)
		errorHandel(error, ctx)
	})

	return app
}
