const App = require('./app')
const httpServer = require('./server')
const router = require('koa-router')()
const defaultConfig = require('./config')
const Token = require('./utils/token')
const Mongo = require('./utils/mongodb')

module.exports = class Server {
	// hooks
	// onInitSchema, onInitModels

	constructor({config, Model, Schema, Api, hooks = {}}) {
		// 设置config
		this.config = config ? Object.assign(defaultConfig, config) : defaultConfig
		this.router = router
		this.Model = Model
		this.Schema = Schema
		this.Api = Api
		this.hooks = hooks
		// console.log('constructor', this.config)
	}

	initMongo = async () => {
		Mongo.init(this.config.mongodb)
		const {schemas, examples} = await this.Schema.init(this)
		this.schemas = schemas
		this.examples = examples

		const models = await this.Model.init(this)
		this.models = models
	}

	initRouter = async () => {
		console.log('initRouter')

		let {secret, excludeCheckUrl} = this.config
		this.Token = new Token({secret, rules: excludeCheckUrl})

		const ApiRouter = await this.Api.init(this)
		this.router.use(`/${this.config.apiPrefix}`, ApiRouter.routes(), ApiRouter.allowedMethods())
	}

	initApp = async () => {
		await this.initMongo()
		await this.initRouter()

		console.log('initApp')
		return App.call(this, this.router)
	}

	start = async () => {
		console.log('start')
		this.app = await this.initApp()

		console.log('start server')
		return httpServer.call(this, this.app)
	}
}
