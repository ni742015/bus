const router = require('koa-router')()
const decorator = require('koa-swagger-decorator')
const utils = require('../utils/index.js')
const commonClass = require('./common.js')
const ApiError = require('../utils/error/ApiError')
const ApiErrorNames = require('../utils/error/ApiErrorNames')

class Api {
	constructor() {
		this.datas = []
	}

	// data {name: '', schema: {}}
	add = (data) => {
		this.datas.push(data)
	}

	init = async ({ models, examples, config }) => {
		try {
			console.log('config.apiPrefix', config.apiPrefix)

			decorator.wrapper(router)
			// swagger docs avaliable at http://localhost:3001/api/swagger-html
			router.swagger({
				title: 'Example Server',
				description: 'API 文档',
				version: '1.0.0',
				// [optional] default is root path.
				prefix: `/${config.apiPrefix}`,
				// [optional] default is /swagger-html
				swaggerHtmlEndpoint: '/swagger-html',
				// [optional] default is /swagger-json
				swaggerJsonEndpoint: '/swagger-json',
				// [optional] additional options for building swagger doc
				// eg. add api_key as shown below
				swaggerOptions: {
					securityDefinitions: {
						ApiKeyAuth: {
							type: 'apiKey',
							in: 'header',
							name: 'Authorization'
						}
					},
				}
			})

			// 过滤不用的参数
			const decoratorBody = decorator.body
			decorator.body = function () {
				arguments[0] = utils.filter_request_body(arguments[0])
				return decoratorBody.apply(this, arguments)
			}

			for (const {name: tagName, apiClass} of this.datas) {
				const tag = decorator.tags([tagName])
				let CommonClass = {}

				const {name, needCommonApi, ApiClass} = apiClass({
					utils,
					examples,
					models,
					tag,
					decorator,
					ApiError,
					ApiErrorNames
				})

				// 增加继承默认接口
				if(needCommonApi) {
					CommonClass = commonClass({
						model: models[tagName],
						example: examples[tagName],
						tag,
						decorator,
						info: {
							name,
							pathname: tagName
						}
					})
				}

				Object.getOwnPropertyNames(CommonClass)
					.filter(method => !['name', 'constructor', 'length', 'prototype'].includes(method))
					.forEach(name => {
						if(Object.getOwnPropertyNames(ApiClass).indexOf(name) < 0) {
							ApiClass[name] = CommonClass[name]
						}
					})
				// console.log(Object.getOwnPropertyNames(ApiClass))

				router.map(ApiClass)
			}

			return router
		} catch (error) {
			console.warn('Init Apis Error', error)
			throw error
		}
	}
}

module.exports = Api
