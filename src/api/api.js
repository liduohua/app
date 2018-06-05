import App from "light";
import config from './config';
/*
 * usage:
 * <http调用>
 * 1.直接使用：
 * 		import {httpGet, httpPost} from 'modulePath';
 * 		基于Promise
 * 			httpGet({url: '200001', data: {exCode: '00000'}})
 * 				.then(function(data){})
 * 				.catch(function(err){});
 * 			httpPost({url: '200001', data: {exCode: '00000'}});
 * 				.then(function(data){})
 * 				.catch(function(err){});
 * 		回调形式
 * 			httpGet({url: '200001', data: {exCode: '00000'},success : function(data){},error : function(err){}});
 * 			httpPost({url: '200001', data: {exCode: '00000'},success : function(data){},error : function(err){}});
 * 2.作为组件方法使用：
 * 		this.$httpGet();
 * 		this.$httpPost();
 * <native方法调用>
 * 1.直接使用：
 * 		import {callNative} from 'modulePath';
 * 		基于Promise
 * 			callNative({method: 'quote.sort', data: {}})
 * 				.then(function(data){})
 * 				.catch(function(err){});
 * 		回调形式
 * 			callNative({method: 'quote.sort', data: {},success : function(data){},error : function(err){}});
 * 2.作为组件方法使用：
 * 		this.$callNative();
 */
function http({ url, data = {}, success, error, type = 'POST', contentType = 'application/json', timeout = 5000 }) {
    url = config.host + url;
    // 全局参数在这里配置
    data.exCode = config.exCode;

    type.toLowerCase() === 'post' && (data = JSON.stringify(data));

    //一些常见错误处理（非业务原因引起的错误）
    let onError = function([xhr, type, err]) {
        let errInfo = ' 请求url:' + url;
        if (type === 'timeout') {
            errInfo = '请求超时！' + errInfo;
        } else if (xhr.status === 404) {
            errInfo = '404:请求资源不存在！' + errInfo;
        } else if (xhr.status === 500) {
            errInfo = '500：服务器内部错误！' + errInfo;
        } else if (xhr.status && String(xhr.status).length == 3) { //其他不常见的状态码返回
            errInfo = xhr.status + ':' + xhr.statusText + errInfo;
        } else if (err) {
            errInfo = err.stack || err.toString();
        } else {
            //到这里了，说明没有返回结果，一般跟底层socket有关了
            errInfo = '网络问题！';
        }
        console.error(errInfo);
        if (typeof error === 'function') {
            error(errInfo);
        }
        return errInfo;
    }
    if (typeof success === 'function') {
        // supporting callback 
        App.ajax({ url, data, success, onError, type, contentType, timeout });
    } else {
        // supporting Promise
        return new Promise((resolve, reject) => App.ajax({ url, data, success: data => resolve(typeof data === 'string' ? JSON.parse(data) : data), error: (...args) => reject(onError(args)), type, contentType, timeout }))
    }
}
/*
 * get请求
 */
export function httpGet(options = {}) {
    options.type = 'GET';
    return http(options);
}
/*
 * post请求
 */
export function httpPost(options = {}) {
    options.type = 'POST';
    return http(options);
}
/**
 * 键值对存入全局对象
 * @param {} key 
 * @param {*} value 
 */
export function setStorageItem(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}
/**
 * 根据key获取全局变量
 * @param {*} key 
 */
export function getStorageItem(key) {
    return JSON.parse(sessionStorage.getItem(key));
}
/**
 * 删除key全局变量
 * @param {*} key 
 */
export function removeStorageItem(key) {
    sessionStorage.removeItem(key)
}

/*
 * native调用
 */
export function callNative(options = {}) {

    if (typeof LightJSBridge === 'undefined') {
        console.log('LightJSBridge object is not exist!');
        return;
    }

    if (typeof options.success === 'function') {
        var abortTimeout, isTimeout = false,
            success = function(data) {
                if (isTimeout) return;
                clearTimeout(abortTimeout);
                options.success(data);
            }
        LightJSBridge.call(options.method, options.data, success);
        if (options.error === 'function') {
            abortTimeout = setTimeout(() => {
                isTimeout = true;
                options.error(new Error('native方法' + options.method + '调用超时!'));
            }, 10000);
        }
    } else {
        return new Promise((resolve, reject) => {
            LightJSBridge.call(options.method, options.data, function(data) {
                resolve(data);
            });
            setTimeout(() => {
                reject(new Error('native方法' + options.method + '调用超时!'));
            }, 10000);
        });
    }
}
/*
 *判断手机  判断内核
 */
export function versions() {
    var u = navigator.userAgent,
        app = navigator.appVersion;
    return { //移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        hsCtcs: u.indexOf('hsCtcs') > -1 //是否为手机端，自定义字符在webview加载之后
    };
}

/*
 * vue插件
 */
export function install(Vue, options) {
    Vue.prototype.$httpPost = httpPost;
    Vue.prototype.$setStorageItem = setStorageItem;
    Vue.prototype.$getStorageItem = getStorageItem;
    Vue.prototype.$removeStorageItem = removeStorageItem;
    Vue.prototype.$httpGet = httpGet;
    Vue.prototype.$callNative = callNative;
    Vue.prototype.$iosTop = iosTop;
    Vue.prototype.$loginOut = loginOut;
}