const logUtil = require('./log')

module.exports = (error, ctx) => {
	const ms = new Date() - ctx.start_time
	console.warn(`${ctx.method} ${ctx.url} - ${ms}ms`)
	//记录异常日志
	logUtil.logError(ctx, error, ms)
}
