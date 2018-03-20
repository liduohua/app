import Vue from 'vue';
import VueResource from 'vue-resource';
import config from '../config';

Vue.use(VueResource);

async function http (url,{body,params} = {} ,method){
	let response;
	url = config.host + url;
	try{
		response = await Vue.http({url,body , params,method});
		return response.body;
	}catch(e){
		if(e.status === 404){
			console.error('请求资源不存在！');
		}else if(e.status === 500){
			console.error('500: 服务器错误');
		}else{
			console.error(e);
		}
		// timeout error
		return null;
	}
}
export function httpGet (url,playload = {}){
	return http(url,{params : playload},'GET');
}
export function httpPost (url,playload = {}){
	return http(url,{body : playload},'POST');
}
