const App = require('./app')
const httpServer = require('./server')
const router = require('koa-router')()
const defaultConfig = require('./config')
const Token = require('./utils/token')

module.exports = class Server {
	// hooks
	// onInitSchema, onInitModels

	constructor({config, Model, Schema, Api}) {
		// 设置config
		this.config = config ? Object.assign(defaultConfig, config) : defaultConfig
		this.router = router
		this.Model = Model
		this.Schema = Schema
		this.Api = Api
		// console.log('constructor', this.config)
	}

	initMongo = async () => {
		const {schemas, examples} = await this.Schema.init(this)
		this.schemas = schemas
		this.examples = examples

		const models = await this.Model.init(this)
		this.models = models
	}

	initRouter = async () => {
		let {secret, excludeCheckUrl} = this.config
		this.Token = new Token({secret, rules: excludeCheckUrl})

		const ApiRouter = await this.Api.init(this)
		this.router.use(`/${this.config.apiPrefix}`, ApiRouter.routes(), ApiRouter.allowedMethods())
	}

	initApp = async () => {
		console.log('initApp')

		await this.initMongo()
		await this.initRouter()

		return App.call(this, this.router)
	}

	start = async () => {
		console.log('start')
		this.app = await this.initApp()

		return httpServer.call(this, this.app)
	}
}
