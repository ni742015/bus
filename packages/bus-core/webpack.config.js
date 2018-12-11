const defaultConfig = require('./src/config/webpack.config.js')
const path = require('path')

function resolve(filePath) {
	return path.resolve(__dirname, filePath)
}

const config = defaultConfig({
	env: 'production',
	// sourcemap: false,
	entry: {
		index: resolve('./src/index.js'),
		api: resolve('./src/apis/index.js'),
		model: resolve('./src/models/index.js'),
		schema: resolve('./src/schemas/index.js'),
		'lib/error': resolve('./src/utils/error/apiError.js'),
		'lib/token': resolve('./src/utils/token.js'),
		'lib/log': resolve('./src/utils/log.js')
	},
	output: {
		path: resolve(''),
		filename: '[name].js',
		libraryTarget: 'commonjs2'
	}
})

// 项目打包
module.exports = config
