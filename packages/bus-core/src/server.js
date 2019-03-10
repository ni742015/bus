

// const app = require('../app')
const http = require('http')

module.exports = function (app) {
	let {port, apiPrefix} = this.config

	// 将端口号设置为配置文件的端口号，默认值为3000
	port = normalizePort(port || '3000')
	// console.log('port', port)

	/**
 * Normalize a port into a number, string, or false.
 */

	function normalizePort(val) {
		var port = parseInt(val, 10)

		if (isNaN(port)) {
			// named pipe
			return val
		}

		if (port >= 0) {
			// port number
			return port
		}

		return false
	}

	/**
 * Event listener for HTTP server "error" event.
 */

	function onError(error) {
		console.error('Error:', error)

		if (error.syscall !== 'listen') {
			throw error
		}

		var bind = typeof port === 'string'
			? 'Pipe ' + port
			: 'Port ' + port

		// handle specific listen errors with friendly messages
		switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges')
			process.exit(1)
			break
		case 'EADDRINUSE':
			console.error(bind + ' is already in use')
			process.exit(1)
			break
		default:
			throw error
		}
	}

	/**
 * Event listener for HTTP server "listening" event.
 */

	function onListening() {
		var addr = server.address()
		var bind = typeof addr === 'string'
			? 'pipe ' + addr
			: 'port ' + addr.port
		console.info('Listening on ' + bind)
		console.info(`Open http://localhost:${port}/${apiPrefix}/swagger-html to get swagger html`)
	}

	/**
	 * Create HTTP server.
	 */

	var server = http.createServer(app.callback())

	/**
	 * Listen on provided port, on all network interfaces.
	 */

	return new Promise((resolve, reject) => {
		server.on('error', function (error) {
			onError(error)
			reject(error)
		})
		server.on('listening', function () {
			onListening()
			resolve(app)
		})
		server.listen(port)
	})

}
