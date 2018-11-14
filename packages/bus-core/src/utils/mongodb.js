const mongoose = require('mongoose')
const options = {
	useNewUrlParser: true,
	autoIndex: false, // Don't build indexes
	reconnectTries: 30, // Never stop trying to reconnect
	reconnectInterval: 500, // Reconnect every 500ms
	poolSize: 10, // Maintain up to 10 socket connections
	// If not connected, return errors immediately rather than waiting for reconnect
	bufferMaxEntries: 0,
	connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
	socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
	family: 4 // Use IPv4, skip trying IPv6
}

class Mongo {
	init(mgConfig) {
		console.log('mongodb url', mgConfig.url)
		mongoose.connect(mgConfig.url, Object.assign((mgConfig.options || {}), options))

		const db = mongoose.connection

		// 防止mongoose: mpromise错误
		mongoose.Promise = global.Promise


		db.on('error', (err) => {
			console.log('数据库连接出错!', err)
		})

		db.on('open', () => {
			if(process.env.NODE_ENV === 'development') {
				mongoose.set('debug', true)
			}
			console.log('数据库连接成功!')
		})
	}
}



module.exports = new Mongo()
