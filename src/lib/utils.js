//倒计时
export function countDown(target) {
	target.setAttribute('disabled', true);
	var seconds = 60;
	var defaultText = target.textContent;
	target.setAttribute('data-default-text', defaultText)
	var countDownCb = function() {
		target.textContent = --seconds + 's后重新发送';
		// target.textContent += 's后重新发送';
		if(!seconds) {
			target.textContent = defaultText;
			target.removeAttribute('disabled', true);
		} else {
			target.setAttribute('data-timeout-id', setTimeout(countDownCb, 1000));
		}
	};
	target.textContent = seconds + 's后重新发送';
	//target.textContent += 's后重新发送';
	target.setAttribute('data-timeout-id', setTimeout(countDownCb, 1000));
},
/*
 * name 查询参数名(如果url中有多个相同名字的请求参数,返回第一个的值,
 * 请求参数中如果有特殊字符请使用 encodeURIComponent()对请求参数进行编码)
 * 调用方式 App.getQueryParameter(qName)
 */
export function getQueryParameter(name) {
	var qs = decodeURIComponent(location.search.length > 0 ? location.search.slice(1) : ''),
		items = qs.length ? qs.split('&') : [],
		i = items.length - 1,
		val = '',
		idx = -1;
	for(; i > -1 && !val; i--)
		val = name && ~(idx = items[i].indexOf(name)) ? items[i].substring(idx + name.length + 1) : '';
	return val;

},
/*
 * money 金额
 * scale 保留的小数位数
 * isCentsUnit 传进来的是否是分，如果是设置为true，不是不用传
 * 调用方式 App.formatMoney(1200,2,true)
 */
export function formatMoney(money, scale, isCentsUnit) {
	var subMoneyStr = '';
	money = (isCentsUnit ? parseFloat(money) / 100 : parseFloat(money)).toFixed(scale) + '';
	subMoneyStr = money.substring(0, money.indexOf('.'));
	money = money.substring(money.indexOf('.'));
	for(var i = 1; i <= subMoneyStr.length; i++) {
		money = subMoneyStr[subMoneyStr.length - i] + money;
		if(i != subMoneyStr.length && i % 3 == 0) {
			money = ',' + money;
		}
	}
	if('NaN' !== money)
		return(money.indexOf('-,') == -1 ? money : money.replace('-,', '-'));
	else {
		console.error('error : 格式化金额异常,请输入正确的参数!');
		//throw new Error('格式化金额异常,请输入正确的参数!');
		return '';
	}
},
//格式化日期
export function formatDate(pattern, time) {
	var d = time;
	var o = {
		"M+": d.getMonth() + 1, //月份
		"d+": d.getDate(), //日
		"h+": d.getHours(), //小时
		"m+": d.getMinutes(), //分
		"s+": d.getSeconds(), //秒
		"q+": Math.floor((d.getMonth() + 3) / 3), //季度
		"S": d.getMilliseconds() //毫秒
	};
	if(/(y+)/.test(pattern))
		pattern = pattern.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(pattern))
			pattern = pattern.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return pattern;
},
//除法
export function div(num1, num2, decimal) {
	var num1Str = num1 + '',
		num2Str = num2 + '',
		num1DecimalLen = num1Str.indexOf('.') == -1 ? 0 : num1Str.length - num1Str.indexOf('.') - 1,
		num2DecimalLen = num2Str.indexOf('.') == -1 ? 0 : num2Str.length - num2Str.indexOf('.') - 1,
		maxLen = Math.max(num1DecimalLen, num2DecimalLen);
	if(num1DecimalLen > num2DecimalLen) {
		for(var i = 0; i < num1DecimalLen - num2DecimalLen; i++) {
			num2Str += '0';
		}
	} else {
		for(var i = 0; i < num2DecimalLen - num1DecimalLen; i++) {
			num1Str += '0';
		}
	}
	num1Str = num1Str.replace(".", "");
	num2Str = num2Str.replace(".", "");
	var result = num1Str / num2Str;
	//result = result.toFixed(decimal || 15);
	return result;
},
//乘法
export function mul(num1, num2) {
	var num1Str = num1 + '',
		num2Str = num2 + '',
		num1DecimalLen = num1Str.indexOf('.') == -1 ? 0 : num1Str.length - num1Str.indexOf('.') - 1,
		num2DecimalLen = num2Str.indexOf('.') == -1 ? 0 : num2Str.length - num2Str.indexOf('.') - 1,
		totalLen = num1DecimalLen + num2DecimalLen;
	num1Str = num1Str.replace(".", "");
	num2Str = num2Str.replace(".", "");
	return(num1Str * num2Str) / Math.pow(10, totalLen);
},
//加法
export function add(num1, num2) {
	var num1Str = num1 + '',
		num2Str = num2 + '',
		num1DecimalLen = num1Str.indexOf('.') == -1 ? 0 : num1Str.length - num1Str.indexOf('.') - 1,
		num2DecimalLen = num2Str.indexOf('.') == -1 ? 0 : num2Str.length - num2Str.indexOf('.') - 1,
		maxLen = Math.max(num1DecimalLen, num2DecimalLen);
	if(num1DecimalLen > num2DecimalLen) {
		for(var i = 0; i < num1DecimalLen - num2DecimalLen; i++) {
			num2Str += '0';
		}
	} else {
		for(var i = 0; i < num2DecimalLen - num1DecimalLen; i++) {
			num1Str += '0';
		}
	}
	num1Str = num1Str.replace(".", "");
	num2Str = num2Str.replace(".", "");
	return(Number(num1Str) + Number(num2Str)) / Math.pow(10, maxLen);
},
//减法
export function sub(num1, num2) {
	var num1Str = num1 + '',
		num2Str = num2 + '',
		num1DecimalLen = num1Str.indexOf('.') == -1 ? 0 : num1Str.length - num1Str.indexOf('.') - 1,
		num2DecimalLen = num2Str.indexOf('.') == -1 ? 0 : num2Str.length - num2Str.indexOf('.') - 1,
		maxLen = Math.max(num1DecimalLen, num2DecimalLen);
	if(num1DecimalLen > num2DecimalLen) {
		for(var i = 0; i < num1DecimalLen - num2DecimalLen; i++) {
			num2Str += '0';
		}
	} else {
		for(var i = 0; i < num2DecimalLen - num1DecimalLen; i++) {
			num1Str += '0';
		}
	}
	num1Str = num1Str.replace(".", "");
	num2Str = num2Str.replace(".", "");
	return(Number(num1Str) - Number(num2Str)) / Math.pow(10, maxLen);
},
//js脚本转义(事件暂时没处理)
export function jsEscape(val) {
	var escape = function(val) {
		if(typeof val == 'string') {
			val = val.replace(/(<script.*?>)|(<\/script.*?>)/g, function(match) {
				return '&lt;' + match.slice(1, -1) + '&gt;';
			});
		} else if(typeof val == 'object') {
			for(var key in val) {
				val[key] = escape(val[key]);
			}
		}
		return val;
	}
	return escape(val);
},
//html转义
export function htmlEscape(val) {
	//html实体列表
	var escapeMap = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#x27;',
			'`': '&#x60;'
		},
		escape = function(val) {
			s
			if(typeof val == 'string') {
				val = val.replace(/[&<>"'`]/g, function(match) {
					return escapeMap[match];
				});
			} else if(typeof val == 'object') {
				for(var key in val) {
					val[key] = escape(val[key]);
				}
			}
			return val;
		};
	return escape(val);
},

//金额校验,不能大于两位小数(-1-参数为空、0-校验失败、1校验通过)
export function checkMoney(money) {
	if((typeof money == 'undefined') || (money = money + '').trim().length < 1) {
		return -1;
	}
	var moneyCheckRegExp = /(^[1-9]\d*(.\d{1,2})?$)|(^0(|.\d{1,2})$)/;
	return moneyCheckRegExp.test(money);
},
//手机号码校验 （返回-2-不是手机号、-1-参数为空、0-失败、1-电信、2-联通、3-移动）
export function checkPhoneNo(phoneNo) {
	if(/^1\d{10}$/.test(phoneNo)) {
		return true;
	} else {
		return false;
	}
	/*if(!phoneNo||(phoneNo = phoneNo+'').trim().length<1){
		return -1;
	}
	if(phoneNo.length != 11){
		return -2;
	}
	var dx = [133,153,180,181,189,173,177];//电信
	var lt = [130,131,132,155,156,185,186,145,176];//联通
	var yd = [134,135,136,137,138,139,150,151, 152,157,158,159,182,183,184,147,178,184,188,187];//移动
	var needCheckNo = parseInt(phoneNo.substr(0,3));
	if(~dx.indexOf(needCheckNo)){
		return 1;
	}else if(~lt.indexOf(needCheckNo)){
		return 2;
	}else if(~yd.indexOf(needCheckNo)){
		return 3;
	}
	return 0; */
},
//身份证校验
export function checkIdNo(idNo) {
	var provinces = {
			11: "北京",
			12: "天津",
			13: "河北",
			14: "山西",
			15: "内蒙古",
			21: "辽宁",
			22: "吉林",
			23: "黑龙江",
			31: "上海",
			32: "江苏",
			33: "浙江",
			34: "安徽",
			35: "福建",
			36: "江西",
			37: "山东",
			41: "河南",
			42: "湖北",
			43: "湖南",
			44: "广东",
			45: "广西",
			46: "海南",
			50: "重庆",
			51: "四川",
			52: "贵州",
			53: "云南",
			54: "西藏",
			61: "陕西",
			62: "甘肃",
			63: "青海",
			64: "宁夏",
			65: "新疆",
			71: "台湾",
			81: "香港",
			82: "澳门",
			91: "国外"
		},
		//是否为身份证
		isIdNo = function(idNo) {
			return /(^\d{15}$)|(^\d{17}[\dX]$)/.test(idNo);
		},
		//校验省份
		checkProvinces = function(idNo) {
			var provinceCode = idNo.substr(0, 2);
			return !!provinces[provinceCode];
		},
		//校验生日
		checkBirthday = function(idNo) {
			var year, month, day, birthday, nowYear = new Date().getFullYear();
			if(idNo.length == 15) {
				var matches = idNo.match(/(\d{6})(\d{2})(\d{2})(\d{2})/);
				matches[2] = '19' + matches[2];
			} else {
				var matches = idNo.match(/(\d{6})(\d{4})(\d{2})(\d{2})/);
			}
			year = matches[2];
			month = matches[3];
			day = matches[4];
			birthday = new Date(year, month - 1, day);
			if(year == birthday.getFullYear() && month == birthday.getMonth() + 1 && day == birthday.getDate()) {
				if(nowYear - year >= 3 && nowYear - year <= 100) {
					return true;
				}
			}
			return false;
		},
		//校验校验位
		checkParityBit = function(idNo) {
			if(idNo.length == 18) {
				var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2], //加权因子
					parityBit = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2], //校验位
					weightSum = 0, //加权和
					idArr = idNo.split('');
				for(var i = 0; i < 17; i++) {
					weightSum += idArr[i] * factor[i]
				}
				return parityBit[weightSum % 11] == idArr[17];
			} else {
				return true;
			}
		};
	if(isIdNo(idNo) && checkProvinces(idNo) && checkBirthday(idNo) && checkParityBit(idNo)) {
		return true;
	} else {
		return false;
	}
},
export function checkEmail(email) {
	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(reg.test(email)) {
		return true;
	}
	return false;
}