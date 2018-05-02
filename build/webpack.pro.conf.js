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
const webpackConfig = merge(baseWebpackConfig,{
	output : {
		path : config.build.assetsRoot,
		filename : utils.assetsPath('js/[name].[chunkhash].js'),
		//动态加载的块
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
			'process.env' : '"production"'
		}),
		//js压缩
		new UglifyJsPlugin({
			uglifyOptions : {
				compress : {
					warnings : false
				}
			},
			sourceMap : config.build.productionSourceMap,
			parallel : true
		}),
		//生成index.html
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
		//提取css为单个文件
		new ExtractTextPlugin({
			filename : utils.assetsPath('css/[name].[contenthash].css'),
			allChunks : true
		}),
		//优化css ,处理器使用cssnano
		new OptimizeCSSPlugin({
			cssProcessorOptions : config.build.productionSourceMap
				? {safe : true,map : {inline : false}}
				: {safe : true}
		}),
		//使hash基于模块的相对路径生成，默认使用md5算法及取前面4个字符
		new webpack.HashedModuleIdsPlugin(),
		//会合并闭包，提高浏览器的运行速度
		new webpack.optimize.ModuleConcatenationPlugin(),
		
		new webpack.optimize.CommonsChunkPlugin({
			name : 'vendor',
			minChunks (module){
				
				console.log(module.response);
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
		//复制静态资源
		new CopyWebpackPlugin([
			{
				from : path.resolve(__dirname,'../src/assets'),
				to : config.build.assetsSubDirectory,
				ignore : ['.*']
			}
		])
	]
});

if(config.build.productionGzip) {
	const CompressionWebpackPlugin = require('compression-webpack-plugin')
	
	webpackConfig.plugins.push(
		new CompressionWebpackPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: new RegExp(
				'\\.(' +
				config.build.productionGzipExtension.join('|') +
				')$'
			),
			threshold: 10240,
			minRatio: 0.8
		})
	)
}



if(config.build.bundleAnalyzerReport){
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
	webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig;