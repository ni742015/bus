#! /usr/bin/env node
const webpack = require('webpack')
const nodemon = require('nodemon')
const once = require('ramda').once
const defaultConfig = require('../src/config/webpack.config')
const path = require('path')
const fs = require('fs')

const options = {
	env: 'development'
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

const startServer = () => {
	const serverPaths = Object
		.keys(serverCompiler.options.entry)
		.map(entry => path.join(serverCompiler.options.output.path, `${entry}.js`))
	// console.log('serverPaths[0]', serverPaths)

	nodemon({ script: serverPaths[0], watch: serverPaths, nodeArgs: process.argv.slice(2) })
		.on('quit', process.exit)
}

const startServerOnce = once((err, stats) => {
	if (err) return
	startServer()
})
serverCompiler.watch(serverConfig.watchOptions || {}, startServerOnce)
