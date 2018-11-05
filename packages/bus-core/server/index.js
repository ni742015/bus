const App = require('./app')
const glob = require('glob')
const httpServer = require('./server')
const Model = require('./models')
const Schema = require('./schemas')
const Router = require('./apis')
const defaultConfig = require('./config')

function getPaths(paths) {
	console.log('getPaths', process.cwd() + paths + '/*.js')

	if(typeof paths === 'string') {

		return glob.sync(process.cwd() + paths + '/*.js')
	}
	return paths
}

module.exports = class Server {
	// hooks
	// onInitSchema, onInitModels

	constructor(config) {
		// 设置config
		this.config = config ? Object.assign(defaultConfig, config) : defaultConfig
		// console.log('constructor', this.config)
	}

	initMongo = async () => {
		const {path: {schemas: spath, models: mpath}} = this.config
		const {schemas, examples} = await Schema.call(this, getPaths(spath), spath)
		const {models} =  await Model.call(this, getPaths(mpath), mpath)

		this.schemas = schemas
		this.examples = examples
		this.models = models
	}

	initRouter = () => {
		console.log('initRouter')

		Router.call(this, getPaths(this.config.path.apis))
	}

	initApp = async () => {
		console.log('initApp')

		await this.initMongo()
		const routes = this.initRouter()
		return App.apply(this, routes)
	}

	start = async () => {
		console.log('start')

		const app = await this.initApp()

		return httpServer(app)
	}
}
