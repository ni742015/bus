const log4js = require('log4js')
const config = require('../config')
const logsPath = config.logsPath

console.log('logsPath', logsPath)

log4js.configure({
	'appenders': {
		'out': { 'type': 'stdout' },
		'debug': { 'type': process.env.NODE_ENV!=='production'?'console':'dateFile', 'filename': `${logsPath}/debug`, 'pattern': '-yyyy-MM-dd.log', 'alwaysIncludePattern': true, 'keepFileExt': true },
		'debug-filter': { 'type': 'logLevelFilter', 'appender': 'debug', 'level': 'debug', 'maxLevel': 'debug' },
		'result': { 'type': process.env.NODE_ENV!=='production'?'console':'dateFile', 'filename': `${logsPath}/result`, 'pattern': '-yyyy-MM-dd.log', 'alwaysIncludePattern': true, 'keepFileExt': true },
		'result-filter': { 'type': 'logLevelFilter', 'appender': 'result', 'level': 'info', 'maxLevel': 'info' },
		'error': { 'type': process.env.NODE_ENV!=='production'?'console':'dateFile', 'filename': `${logsPath}/error`, 'pattern': '-yyyy-MM-dd.log', 'alwaysIncludePattern': true, 'keepFileExt': true },
		'error-filter': { 'type': 'logLevelFilter', 'appender': 'error', 'level': 'error', 'maxLevel': 'error' },
		'default': { 'type': process.env.NODE_ENV!=='production'?'console':'dateFile', 'filename': `${logsPath}/default`, 'pattern': '-yyyy-MM-dd.log', 'alwaysIncludePattern': true, 'keepFileExt': true },
		'warn': { 'type': process.env.NODE_ENV!=='production'?'console':'dateFile', 'filename': `${logsPath}/warn`, 'pattern': '-yyyy-MM-dd.log', 'alwaysIncludePattern': true, 'keepFileExt': true },
		'warn-filter': { 'type': 'logLevelFilter', 'appender': 'warn', 'level': 'warn', 'maxLevel': 'warn' }
	},
	'categories': {
		'default': { 'appenders': ['out', 'default'], 'level': 'info' },
		'debug': { 'appenders': ['debug', 'debug-filter'], 'level': 'debug' },
		'result': { 'appenders': ['result-filter', 'debug-filter', 'error-filter', 'warn-filter'], 'level': 'debug' },
		'error': { 'appenders': ['error', 'error-filter'], 'level': 'error' },
		'warn': { 'appenders': ['warn', 'warn-filter'], 'level': 'warn' }
	}
}
)

module.exports = log4js.getLogger('result')
