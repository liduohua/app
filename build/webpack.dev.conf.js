'use strict';
//https://github.com/vuejs-templates/webpack/tree/develop/template
const utils = require('./utils');
const webpack = require('webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

const devWebpackConfig = merge(baseWebpackConfig,{
	module :{
		rules :utils.styleLoaders({sourceMap : config.dev.cssSourceMap,usePostCSS:true})
	},
	devtool : config.dev.devtool,
	devServer : {
		clientLogLevel : 'warning',
		historyApiFallback : true,
		hot : true,
		compress : true,
		host :process.env.HOST || config.dev.host,
		port : process.env.PORT || config.dev.port,
		open : config.dev.autoOpenBrowser,
		overlay : config.dev.errorOverlay ? {
			warnings : false,
			errors : true
		} : false,
		publicPath : config.dev.assetsPublicPath,
		proxy : config.dev.proxyTable,
		quiet : true,
		watchOptions : {
			poll : config.dev.poll,
		},
		watchContentBase : config.dev.watchContentBase,
	},
	plugins :[
		new webpack.DefinePlugin({
			'process.env' : require('../config/dev.env'),
			'PRODUCTION' : 'true',
			 VERSION: JSON.stringify("5fa3b9"),
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		//new webpack.NoEmitOnErrorsPlugin(),
		new HtmlWebpackPlugin({
			//这些值将会注入到模板文件中
			filename : 'index.html',
			title : '冻现批',
			template : 'index.html',
			inject : true
		}),
		//new FriendlyErrorsPlugin(),
	]
})

module.exports = new Promise((resolve,reject) => {
	portfinder.basePort = process.env.PORT || config.dev.port;
	portfinder.getPort((err,port) => {
		if(err){
			reject(err)
		}else{
			console.log(port);
			process.env.PORT = port;
			devWebpackConfig.devServer.port = port;
			
			devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
				compilationSucessInfo : {
					messages : [`Your application is running here: http://${config.dev.host}:${port}`],
				},
				onErrors : config.dev.notifyOnErrors ? 
					utils.crateNotifierCallback()
					: undefined
			}))
			resolve(devWebpackConfig)
		}
		
	})
})
