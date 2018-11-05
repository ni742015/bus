const path = require('path')
const rootPath = path.resolve(process.cwd())
const buildPath = path.join(rootPath, 'build')
const publicBuildPath = path.join(buildPath, 'public')

module.exports = {
	port: 3000,
	rootPath,
	buildPath,
	publicBuildPath,
	logsPath: path.join(rootPath, 'logs'),
	serverIndexPath: path.resolve(__dirname, '../index.js'),
	serverBuildPath: buildPath,
	mongodb: {
		url: 'mongodb://localhost:27017/test',
		options: {}
	},
	path: {
		apis: '/apis',
		schemas: '/schemas',
		models: '/models'
	}
}
