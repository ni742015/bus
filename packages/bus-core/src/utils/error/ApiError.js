const ApiErrorNames = require('./apiErrorNames')

/**
 * 自定义Api异常
 */
class ApiError extends Error {
	constructor(error_name, error_status, error_message) {
		super()
		let status = ''
		let message = ''
		if (error_name !== null) {
			const error_info = ApiErrorNames.getErrorInfo(error_name)
			status = error_info.status
			message = error_info.message
		} else {
			status = error_status
			message = error_message
		}
		this.name = error_name
		this.status = status
		this.message = message
	}
}

module.exports = ApiError
