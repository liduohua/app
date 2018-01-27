var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry : {
		app : './src/main.js'
	},
	output : {
		
		filename : '[name].js',
		
	},
	module : {
		rules : [
			{
				test : /.js$/,
				exclude : /node_modules/,
				use : {
					loader : 'babel-loader',
					options : {
						presets : ['env'],
						plugins : ['transform-runtime'],
					}
				}
			},
			{
				test : /\.vue$/,
				loader : 'vue-loader',
				options : {
					extractCSS : true
				}
			}
		]
	},
	plugins : [
		new ExtractTextPlugin('style.css')
	]
}
