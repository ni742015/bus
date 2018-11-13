const path = require('path')
const rootPath = path.resolve(process.cwd())
const buildPath = path.join(rootPath, 'build')
const publicBuildPath = path.join(buildPath, 'public')

module.exports = {
	port: 3333,
	rootPath,
	buildPath,
	publicBuildPath,
	serverSrcPath: path.join(rootPath, 'src'),
	serverBuildPath: buildPath,
	userNodeModulesPath: path.join(rootPath, 'node_modules'),
  publicPath: '/',
	logsPath: path.join(rootPath, 'logs'),
	mongodb: {
		url: 'mongodb://localhost:27017/test',
		options: {}
	},
	apiPrefix: 'api'
}
