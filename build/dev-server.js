const config = require('../config');
if(!process.env.NODE_ENV){
	process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');

const webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
	? require('./webpack.prod.conf') : require('./webpack.dev.conf');
	
const port = process.env.PORT || config.dev.port;
const autoOpenBrower = !!config.dev.autoOpenBrowser;

const proxyTable = config.dev.proxyTable;

const app = express();
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler,{
	publicPath : webpackConfig.output.publicPath,
	quiet : true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler,{
	log : false,
	heartbeat : 2000
});

app.use(hotMiddleware);

app.use(devMiddleware);

const staticPath = path.posix.join(config.dev.assetsPublicPath,config.dev.assetsSubDirectory);
app.use(staticPath,express.static('./static'));

const uri = 'http://localhost:' + port;

var _resolve ;
var _reject ;


var readyPromise = new Promise((resolve,reject) => {
	_resolve = resolve;
	_reject = reject;
});

var server ;
var portfinder = require('portfinder');
portfinder.basePort = port;

console.log('> 开启开发服务器...');
//执行这个callback,如果bundle有效或者再次有效后
devMiddleware.waitUntilValid(()=>{
	portfinder.getPort((err,port) => {
		if(err){
			_reject(err);
		}
		process.env.PORT = port;
		var uri = 'http://localhost:' + port;
		console.log('> 监听在 '+uri + '\n');
		
		if(autoOpenBrowser && process.env.NODE_ENV !== 'testing'){
			opn(uri);
		}
		server = app.listen(port);
		_resolve();
	});
});
module.exports = {
	ready : readyPromise,
	close : ()=>{
		server.close();
	}
}

