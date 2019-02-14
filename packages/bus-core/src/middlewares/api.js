
/**
 * 处理resonse数据
 * 在app.use(router)之前调用
 */

const { filter_request_body } = require('../utils/index.js')
const ApiError = require('../utils/error/apiError')
const logUtil = require('../utils/log')

module.exports = async function(ctx, next) {
	try {
		let {config: {apiPrefix}, hooks: {beforeApiEnter}} = this
		ctx.start_time = new Date()
		if(new RegExp(`^/${apiPrefix}`).test(ctx.url)) {
			let Token = this.Token

			// 排除一些路径
			if(Token.checkUrl(ctx)) {
				if (ctx.request.header['authorization']) {

					let token = ctx.request.header['authorization'].split(' ')[1] // Bearer xxx

					// 解码token
					const decode = Token.decode({token})

					if(!decode) {
						throw new ApiError(null, 401, 'Auth failed')
					}

					if(this.hooks.onTokenCheck) {
						ctx.state = this.hooks.onTokenCheck(decode, ctx)
					}

					ctx.state = ctx.state || decode

				} else {
					throw new ApiError(null, 401, 'There is no token')
				}
			}

			// 去除不要的参数
			ctx.request.body = filter_request_body(ctx.request.body)
			// console.log('ctx.request.body', ctx.request.body);

		}

		if(!beforeApiEnter || beforeApiEnter(ctx, next) !== false) {
			//先去执行路由
			await next()

			if(ctx.url.indexOf(`/${apiPrefix}`) === 0 && ctx.url.indexOf(`/${apiPrefix}/swagger`) < 0) {
				if (ctx.body) {
					ctx.body = {
						success: true,
						data: ctx.body
					}
				}
			}
		}


		if(ctx.status === 404) {
			ctx.body = {
				success: false,
				data: new ApiError('resourcesNotExist')
			}
			ctx.status = 404
		}

	} catch (error) {
		// console.warn('api_handel error', error)
		//如果异常类型是API异常并且通过正则验证的url，将错误信息添加到响应体中返回。
		// if(error instanceof ApiError){
		ctx.response.status = error.status || 500
		ctx.body = {
			success: false,
			data: {
				message: error.message
			}
		}
		logUtil.logError(ctx, error, new Date() - ctx.start_time)
		// }
	}


}

