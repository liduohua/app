import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
const host = 'http://192.168.246.248:7002/';
async function http (url,{body,params} = {} ,method){
	let response;
	url = host + url;
	try{
		response = await Vue.http({url,body , params,method});
		return response.body;
	}catch(e){
		if(e.status === '404'){
			// 请求路径错误
		}else if(e.status === '500'){
			// 服务器错误
		}
		return null;
	}
}
export function httpGet (url,playload = {}){
	return http(url,{params : playload},'GET');
}
export function httpPost (url,playload){
	return http(url,{body : playload},'POST');
}
