'use strict'
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf')
const utils = require('./utils');
const path = require('path')
function resolve(dir){
	return path.join(__dirname,'..',dir);
}

//eslint配置
const createLintingRule = () => ({
	test : /\.(js|vue)/,
	loader : 'eslint-loader',
	enforce : 'pre',
	include : [resolve('src'),resolve('test')],
	options : {
		formatter : require('eslint-friendly-formatter'),
		emitWarning : !config.dev.showEslintErrorsInOverlay,
	}
});

module.exports = {
	entry : {
		app :'./src/main.js'
	},
	output : {
		path : config.build.assetsRoot,
		filename : '[name].js',
		publicPath : process.env.NODE_ENV === 'production'
			? config.build.assetsPublicPath
			: config.dev.assetsPublicPath
	},
	
	module : {
		rules : [
			...(config.dev.useEslint ? [createLintingRule()] : []),
			{
				test : /\.vue$/,
				loader : 'vue-loader',
				options : vueLoaderConfig
			},
			{
				test : /\.js$/,
				include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
				loader : 'babel-loader'
			},
			{
				test : /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader : 'url-loader',
				options : {
					limit : 10000,
					name : utils.assetsPath('img/[name].[hash:7].ext')
				}
			},
			{
        		test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        		loader: 'url-loader',
        		options: {
          			limit: 10000,
          			name: utils.assetsPath('media/[name].[hash:7].[ext]')
        		}
			},
			{
        		test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        		loader: 'url-loader',
        		options: {
          			limit: 10000,
          			name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        		}
			}
		]
	}
	
}
