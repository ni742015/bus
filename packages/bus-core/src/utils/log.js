const log4js = require('log4js')
const config = require('../config')
const logsPath = config.logsPath

console.info('Log Path: ', logsPath)

log4js.configure({
	'appenders': {
		'out': { 'type': 'stdout' },
		'result': { 'type': process.env.NODE_ENV!=='production'?'console':'dateFile', 'filename': `${logsPath}/result`, 'pattern': '-yyyy-MM-dd.log', 'alwaysIncludePattern': true, 'keepFileExt': true },
		'result-filter': { 'type': 'logLevelFilter', 'appender': 'result', 'level': 'info', 'maxLevel': 'info' },
		'error': { 'type': process.env.NODE_ENV!=='production'?'console':'dateFile', 'filename': `${logsPath}/error`, 'pattern': '-yyyy-MM-dd.log', 'alwaysIncludePattern': true, 'keepFileExt': true },
		'error-filter': { 'type': 'logLevelFilter', 'appender': 'error', 'level': 'error', 'maxLevel': 'error' },
	},
	'categories': {
		'default': { 'appenders': ['out'], 'level': 'info' },
		'result': { 'appenders': ['result'], 'level': 'debug' },
		'error': { 'appenders': ['error'], 'level': 'error' },
	}
}
)

var logUtil = {}

var errorLogger = log4js.getLogger('error')
var resLogger = log4js.getLogger('result')

//封装错误日志
logUtil.logError = function (ctx, error, resTime) {
	if (ctx && error) {
		errorLogger.error(formatError(ctx, error, resTime))
	}
}

//封装响应日志
logUtil.logResponse = function (ctx, resTime) {
	if (ctx) {
		resLogger.info(formatRes(ctx, resTime))
	}
}

//封装响应日志
logUtil.log = function (text) {
	resLogger.info(text)
}

logUtil.error = function (text) {
	resLogger.error(text)
}

//格式化响应日志
var formatRes = function (ctx, resTime) {
	var logText = new String()

	//响应日志开始
	logText += '\n' + '*************** response log start ***************' + '\n'

	//添加请求日志
	logText += formatReqLog(ctx.request, resTime)

	//响应状态码
	logText += 'response status: ' + ctx.status + '\n'

	//响应内容
	logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n'

	//响应日志结束
	logText += '*************** response log end ***************' + '\n'

	return logText

}

//格式化错误日志
var formatError = function (ctx, err, resTime) {
	var logText = new String()

	//错误信息开始
	logText += '\n' + '*************** error log start ***************' + '\n'

	//添加请求日志
	typeof ctx === 'string' ?
		logText += 'info: ' + ctx
		:(logText += formatReqLog(ctx.request, resTime))

	//错误名称
	logText += 'err name: ' + err.name + '\n'
	//错误信息
	logText += 'err message: ' + err.message + '\n'
	//错误详情
	logText += 'err stack: ' + err.stack + '\n'

	//错误信息结束
	logText += '*************** error log end ***************' + '\n'

	return logText
}

//格式化请求日志
var formatReqLog = function (req, resTime) {

	var logText = new String()

	var method = req.method
	//访问方法
	logText += 'request method: ' + method + '\n'

	//请求接口地址
	logText += 'request originalUrl:  ' + req.originalUrl + '\n'

	//请求原始地址
	logText += 'request referer:  ' + req.header.referer + '\n'

	//客户端ip
	logText += 'request client ip:  ' + req.ip + '\n'

	//请求参数
	if (method === 'GET') {
		logText += 'request query:  ' + JSON.stringify(req.query) + '\n'
		// startTime = req.query.requestStartTime
	} else {
		logText += 'request body: ' + '\n' + JSON.stringify(req.body) + '\n'
		// startTime = req.body.requestStartTime
	}
	//服务器响应时间
	logText += 'response time: ' + resTime + '\n'

	return logText
}

module.exports = logUtil
