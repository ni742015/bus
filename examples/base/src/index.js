import Bus from 'bus-core'
import Api from './apis'
import Model from './models'
import Schema from './schemas'

const bus = new Bus({
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
				/\/user\/login/,
				{url: '/api/user/register', methods: ['POST']}
			]
		}
	},
	Api,
	Model,
	Schema
})

/* eslint-disable no-unused-vars */
bus.start().then(app => {
	/* eslint-disable no-console */
	console.info('app start success')
})

export default bus
