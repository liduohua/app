/*
 * 无限滚动
 */
(function(root, factory) {
	//AMD
	if (typeof define === 'function' && define.amd)  {
		define(['exports'], function(exports) {
			exports.InfiniteScroll = root.InfiniteScroll = factory();
		});
		//Node.js
	} else if (typeof exports !== 'undefined') {
		exports.InfiniteScroll = factory( );
		//Browser
	} else {
		root.InfiniteScroll = factory();
	}
})(this, function() {
	'use strict';
	(function () {
		if ( typeof window.CustomEvent === "function" ) return false;
		function CustomEvent ( event, params ) {
			params = params || { bubbles: false, cancelable: false, detail: undefined };
			var evt = document.createEvent( 'CustomEvent' );
			evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
			return evt;
		}
		CustomEvent.prototype = window.Event.prototype;
		win.CustomEvent = CustomEvent;
	})();

	var infinitePocketClass = 'infinite-pocket';
	var loadingTpl = '<i class="preloader"></i><span>正在加载...</span>';
	var loadMoreTpl = '<span class="">点击加载更多</span>';
	var noMoreDataTpl = '<span >没有更多数据了</span>';
	
	var cacheInfiniteScroll = [];

	InfiniteScroll.cacheInfiniteScroll = cacheInfiniteScroll;
	function InfiniteScroll(el,options){
		el = typeof el === 'string' ? document.querySelector(el) : el;
		if(!el){ throw new Error('传入InfiniteScroll构造函数中的el不能为空！')}
		//下一个InifinteScroll id

		var nextInfiniteScrollId = el.getAttribute('data-infinite-scroll') ? el.infiniteScrollId
			: cacheInfiniteScroll.length ;

		//如果这个值在缓存中已经可以找到，就直接返回
		if(cacheInfiniteScroll[nextInfiniteScrollId]){return cacheInfiniteScroll[nextInfiniteScrollId]}
		//增加便利获取方法
		el.infiniteScroll = this;
		//缓存当前对象,并通过InfiniteScroll.cacheInfiniteScroll可以全局获取
		cacheInfiniteScroll[nextInfiniteScrollId] = this;
		el.setAttribute('data-infinite-scroll',nextInfiniteScrollId);
		options = options || {};
		//在实例化时可以传入callback,在触发infinite事件触发前调用
		//方法会放入下一事件循环中执行
		this.callback = options.callback;
		//实例化时传递的参数优先
		this.triggerDistance = options.triggerDistance || el.getAttribute('data-trigger-distance')*1 || 50;
		var autoLoad = options.autoLoad || (el.getAttribute('data-auto-load') === 'true' ? true : false);
		//是否正在加载中,如果在加载中不重复触发‘infinite’事件
		this.isLoading = false;
		//是否停止触发'infinite'事件
		this.stop = false;
		this.infinitePocket = document.createElement('div');
		this.infinitePocket.className = infinitePocketClass;
		this.infinitePocket.innerHTML = loadMoreTpl;
		el.appendChild(this.infinitePocket);

		this.el = el;
		var self = this;
		this.onScrollWrapper = function(){
			self.onScroll.apply(self);
		};
		this.onClickWrapper = function(){
			self.onClick.apply(self);
		}
		this.on();
		//自动触发一次‘infinite’事件,主要用于在初次加载时
		if(autoLoad){
			this.trigger('infinite');
		}
	}
	InfiniteScroll.prototype = {
		on : function(){
			this.el.addEventListener('scroll',this.onScrollWrapper);
			this.infinitePocket.addEventListener('click',this.onClickWrapper);
			this.infinitePocket.addEventListener('tap',this.onClickWrapper);
		},
		off : function(){
			this.el.removeEventListener('scroll',this.onScrollWrapper);
			this.infinitePocket.removeEventListener('click',this.onClickWrapper);
			this.infinitePocket.removeEventListener('tap',this.onClickWrapper);
		},
		//加载结束
		end : function(noMoreData){
			var self = this;
			setTimeout(function(){
				self.isLoading = false;
				if(noMoreData){
					self.stop = true;
					self.infinitePocket.innerHTML =  noMoreDataTpl;
				}else{
					self.infinitePocket.innerHTML =  loadMoreTpl;
				}
			},0);
		},
		refresh : function(){
			this.stop = false;
			this.end();
		},
		onClick :  function(){
			var currTpl = this.infinitePocket.innerHTML;
			if(~currTpl.indexOf(loadMoreTpl))
				this.trigger('infinite');
		},
		//处理滚动事件
		onScroll : function(){
			var el = this.el;
			var scrollTop = el.scrollTop;
			var scrollHeight = el.scrollHeight;
			var height = el.offsetHeight;
			if(scrollTop+height > scrollHeight - this.triggerDistance){
				this.trigger('infinite');
			}
		},
		destroy : function(){
			this.off();
			for(var key in cacheInfiniteScroll){
				if(cacheInfiniteScroll[key] == this){
					cacheInfiniteScroll[key] = null;
					break;
				}
			}
			this.el.removeChild(this.infinitePocket);
		},
		trigger : function(eventType,eventData){
			if(this.isLoading || this.stop) return;
			var el = this.el;
			this.isLoading = true;
			this.infinitePocket.innerHTML =  loadingTpl;
			var evt = new CustomEvent(eventType,{
				detail: eventData,
				bubbles: true,
				cancelable: true
			});
			var self = this;
			//为了方便使用
			evt.end = function(){
				self.end(arguments[0]);
			};
			evt.infiniteScroll = this;
			setTimeout(function(){
				if(typeof self.callback === 'function') self.callback(evt);
				el.dispatchEvent(evt);
			},0);
		},
	};
	return InfiniteScroll;
});
