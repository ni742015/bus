const mongoose = require('mongoose')
const options = {
	useNewUrlParser: true,
	autoIndex: false, // Don't build indexes
	reconnectTries: 30, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
}

class Mongo {
	init(mgConfig, {hooks}) {
		console.log('Mongodb Url: ', mgConfig.url)
		mongoose.connect(mgConfig.url, Object.assign(options, (mgConfig.options || {})))

		const db = mongoose.connection

		// 防止mongoose: mpromise错误
		mongoose.Promise = global.Promise

		hooks.onInitMongoose && hooks.onInitMongoose(mongoose)

		db.on('error', (err) => {
			console.error('mongoose connect error: ', err)
		})

		db.on('open', () => {
			if(process.env.NODE_ENV === 'development') {
				mongoose.set('debug', true)
			}
			console.log('Mongoose Connect Success!')
		})
	}
}



module.exports = new Mongo()
