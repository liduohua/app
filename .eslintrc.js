//标准配置
module.exports = {
	root : true,
	parserOptions : {
		parser : 'babel-eslint'
	},
	env : {
		browser : true,
	},
	extends : [
		'plugin:vue/essential',
		'standard'
	],
	plugins : ['vue'],
	rules : {
		'generator-star-spacing' : 'off',
		'indent' : 'off',
		'no-tabs' : 'off',
		"semi" : 'off',
		"no-trailing-spaces" : 'off',
		'comma-spacing' : 'off',
		'key-spacing' :'off',
		'comma-dangle' : 'off',
		'keyword-spacing' : 'off',
		'space-before-blocks' : 'off',
		'quotes' : 'off',
		'no-cond-assign' : 'off',
		'no-mixed-spaces-and-tabs' : 'off',
		'space-before-function-paren' : 'off',
		'no-debugger' : process.env.NODE_ENV === 'production' ? 'error' : 'off'
	}
}
