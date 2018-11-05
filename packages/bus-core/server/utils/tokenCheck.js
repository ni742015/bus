const jwt = require('jsonwebtoken')
const {unless} = require('./index.js')
const config = require('../config')
const ApiError = require('../utils/error/ApiError')

module.exports = function (ctx) {
	const excludeUrls = [
		/login$/,
		/\/swagger/,
		/\/weapp/,
		/\/wechat/,
		/auth/,
		/financial_planner\/register/,
		/page\/today/,
		{url: /fppage\/setting/, methods: ['GET']},
		{url: /\/bd\/.+/, methods: ['GET']},
		{url: /errorlog/, methods: ['GET']},
		{url: /\/financial_planner\/.+/, methods: ['GET']},
		{url: /\/page(.+)$/, methods: ['GET']},
		{url: /\/visit(or_behavior)?\/create/, methods: ['GET']},
	]
	console.log(ctx.url)

	// 排除一些路径
	if(!unless(ctx, excludeUrls)) {
		console.log('token auth', ctx.url)

		if (ctx.request.header['authorization']) {

			let token = ctx.request.header['authorization'].split(' ')[1] // Bearer xxx

			// 解码token
			const decoded = jwt.decode(token, config.secret)
			console.log('decoded', decoded)

			if(!decoded) {
				throw new ApiError(null, 401, 'Auth failed')
			}

			const { _id, username, fp_openid, fp_unionid, exp } = decoded // { _id, username, exp }


			if (token && exp <= new Date()/1000) {
				throw new ApiError(null, 401, 'Token expired')
			}

			ctx.state = {
				fp_openid,
				fp_unionid,
				creator_id: _id,
				creator_name: username
			}

		} else {
			throw new ApiError(null, 401, 'There is no token')
		}
	}
}
