'use strict'

const path = require('path');

module.exports = {
	build : {
		env : require('./prod.env'),
		index : path.resolve(__dirname,'../dist/index.html'),
		assetsRoot : path.resolve(__dirname,'../dist'),
		assetsSubDirectory : 'assets',
		assetsPublicPath : '/',
		devtool : '#source-map',
		productionSourceMap : true,
		
		//因为许多流行的主机，像Surge或者Netlify会对所有的静态资源开启gzip压缩，因此这个选
		//项默认是关闭的，在设置为true之前，确保进行如下安装：
		//npm install --save-dev compression-webpack-plugin
		productionGzip : false,
		productionGzipExtensions : ['js','css'],
		//编译完成后，通过提供一个额外的参数运行编译命令去查看打包分析器的输出，
		//npm run build --report
		//设置为true或false总是打开或关闭它
		bundleAnalyzerReport : process.env.npm_config_report
	},
	dev : {
		
		//路径
		assetsSubDirectory : 'static',
		assetsPublicPath : '/',
		proxyTable : {
			
		},
		//开发服务设置
		host : '192.168.246.248',
		host : 'localhost',
		autoOpenBrowser : false,
		port : 8080,
		errorOverlay : true,
		poll : false,
		watchContentBase : false,
		
		devtool : 'eval-source-map',
		showEslintErrorsInOverlay : false,
		useEslint : true,
		
		//根据 CSS-loader README (https://github.com/webpack/css-loader#sourcemaps),
		//对于这个选项,相对路径存在bug，所以CSS的源码映射默认是关闭的，
		//但以实际使用的经验来说，通常不会有啥问题，只要知道开启这个选项存在这个问题就行了
		cssSourceMap : true
	}
}
 