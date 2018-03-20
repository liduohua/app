var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var baseWebpackConfig = require('./webpack.base.conf');
var utils = require('./utils');
var path = require('path');
const merge = require('webpack-merge');
const config = require('../config');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
module.exports = merge(baseWebpackConfig,{
	output : {
		path : config.build.assetsRoot,
		filename : utils.assetsPath('js/[name].[chunkhash].js'),
		chunkFilename : utils.assetsPath('js/[id].[chunkhash].js')
	},
	devtool : config.build.productionSourceMap ? config.build.devtool : false,
	module : {
		rules : utils.styleLoaders({
			sourceMap : config.build.productionSourceMap,
			extract :true,
			usePostCSS : true
		})
	},
	plugins : [
		new webpack.DefinePlugin({
			'process.env' : env
		}),
		new UglifyJsPlugin({
			uglifyOptions : {
				compress : {
					warnings : false
				}
			},
			sourceMap : config.build.productionSourceMap,
			parallel : true
		}),
		
		new HtmlWebpackPlugin({
			filename : config.build.index,
			template : 'index.html',
			inject : true,
			minify : {
				removeComments : true,
				collapseWhitespace : true,
				removeAttributeQuotes : true
			},
			chunksSortMode : 'dependency'
		}),
		new ExtractTextPlugin({
			filename : utils.assetsPath('css/[name].[contenthash].css'),
			allChunks : true
		}),
		new OptimizeCSSPlugin({
			cssProcessorOptions : config.build.productionSourceMap
				? {safe : true,map : {inline : false}}
				: {safe : true}
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name : 'vendor',
			minChunks (module){
				return (
					module.resource && 
					/\.js$/.test(module.resource) && 
					module.response.indexOf(
						path.join(__dirname,'../node_modules')
					) === 0
				)
			}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name : 'manifest',
			minChunks : Infinity
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name : 'app',
			async : 'vendor-async',
			children : true,
			minChunks : 3
		}),
		new CopyWebpackPlugin([
			{
				from : path.resolve(__dirname,'../static'),
				to : config.build.assetsSubDirectory,
				ignore : ['.*']
			}
		])
	]
});

