const App = require('./app')
const httpServer = require('./server')
const router = require('koa-router')()
const defaultConfig = require('./config')
const Token = require('./utils/token')
const Mongo = require('./utils/mongodb')
const _Model = require('./models')

module.exports = class Server {
	// hooks
	// onInitSchema, onInitModels

	constructor({config, Model, Schema, Api, hooks = {}}) {
		// 设置config
		this.config = config ? Object.assign(defaultConfig, config) : defaultConfig
		this.router = router
		this.Model = Model || new _Model() // 可能没有model
		this.Schema = Schema
		this.Api = Api
		this.hooks = hooks
		// onInitSchema, onInitModels, onInitMiddlewares, onInitApi, beforeApiEnter

	}

	initMongo = async () => {
		Mongo.init(this.config.mongodb, this)
		const {schemas, examples} = await this.Schema.init(this)
		this.schemas = schemas
		this.examples = examples

		this.models = await this.Model.init(this)
	}

	initRouter = async () => {
		// console.log('initRouter')

		let {jwt} = this.config
		if(jwt){
			let {secret, excludeUrls} = jwt
			this.Token = new Token({secret, rules: excludeUrls})
		}

		if(this.Api) {
			const ApiRouter = await this.Api.init(this)
			this.router.use(`/${this.config.apiPrefix}`, ApiRouter.routes(), ApiRouter.allowedMethods())
		} else {
			console.warn('No Api Init')
		}
	}

	initApp = async () => {
		await this.initMongo()
		await this.initRouter()

		// console.log('initApp')
		return App.call(this, this.router)
	}

	start = async () => {
		// console.log('start')
		this.app = await this.initApp()

		// console.log('start server')
		return httpServer.call(this, this.app)
	}
}
