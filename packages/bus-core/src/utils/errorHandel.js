// const logUtil = require('./log')

module.exports = (error, ctx) => {
	const start = new Date()
	const ms = new Date() - start
	console.warn(`${ctx.method} ${ctx.url} - ${ms}ms`)
	//记录异常日志
	// logUtil.warn(ctx, error, ms)
}
