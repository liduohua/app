require('./check-versions')();//检查版本

process.env.NODE_ENV = 'production';
//显示加载中的图标
const ora = require('ora');//用于显示加载图标的
//删除文件
const rm = require('rimraf');//可以优雅的删除文件
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const config = require('../config');
const webpackConfig = require('./webpack.pro.conf');

const spinner = ora('building for production...')

spinner.start();
//先删除已经存在的目录
rm(path.join(config.build.assetsRoot,config.build.assetsSubDirectory) , err => {
	// 如果有错直接抛出 
	// if exists error,toss it out
	if(err) throw err;
	// webpack开始编译
	// webpack starts building ...
	webpack(webpackConfig,(err,stats) => {
		// 关闭加载图标提示
		// closing loading icon prompt.
		spinner.stop();
		// 如果有错直接抛出 
		// if exists error,toss it out
		if(err) throw err
		// 在标准输出上显示统计信息
		// showing statistics information at standard out.
		process.stdout.write(stats.toString({
			colors : true,
			modules : false,
			children : false,
			chunks : false,
			chunkModules : false
		}) +'\n\n')
		// 有错误，打印错误，然后直接退出
		// if exists error,printing error,then exit directly.
		if(stats.hasErrors()){
			console.log(chalk.red('  build failed with errors.\n'));
			process.exit(1);
		}
		// 编译完成了
		// building ok.
		console.log(chalk.cyan('  Build complete.\n'))
		console.log(chalk.yellow(
			'  Tip: built files are meant to be served over an HTTP server.\n'+
			'  Opening index.html over file:// won\'t work.\n'
		));
	});
	
})
