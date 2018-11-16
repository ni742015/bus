#! /usr/bin/env node
const webpack = require('webpack')
const defaultConfig = require('../src/config/webpack.config')
const path = require('path')
const fs = require('fs')

process.on('SIGINT', process.exit)

const options = {
	env: process.env.NODE_ENV || 'production',
	publish_env: process.env.PUBLISH_ENV || 'production',
}

const configPath = path.resolve('bus.config.js')
let userConfig = {}

if (fs.existsSync(configPath)) {
	const userConfigModule = require(configPath)
	userConfig = userConfigModule.default || userConfigModule
}

const serverConfig = userConfig.webpack
	? userConfig.webpack(defaultConfig(options), options, webpack)
	: defaultConfig(options)

process.on('SIGINT', process.exit)

const serverCompiler = webpack(serverConfig)

serverCompiler.run((error, stats) => {
	if (error || stats.hasErrors()) {
		process.exitCode = 1
	}
})
