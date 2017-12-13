/*
 * 无限滚动
 */
(function(win,doc){
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
	var infinitePocket = '<div class="infinite-pocket"></div>'
	var loadingTpl = '<i class="preloader"></i><span>正在加载...</span>';
	var toLoadMoreTpl = '<span class="">点击加载更多</span>';
	var noMoreDataTpl = '<span >没有更多数据了</span>';
	//缓存,防止在单页应用中的生命周期方法中重复创建
	var cacheInfinite = [];

	InfiniteScroll.cacheInfinite = cacheInfinite;
	function InfiniteScroll(el,opts){
		//获取infiniteScrollId
		var infiniteScrollId = el.infiniteScrollId !== undefined ? (el.infiniteScrollId || el.getAttribute('data-infinite-scroll')) 
			: cacheInfinite.length ;
		if(cacheInfinite[infiniteScrollId]){return cacheInfinite[infiniteScrollId]}
		//增加便利获取方法
		el.infiniteScrollId = infiniteScrollId;
		//缓存当前对象,并通过InfiniteScroll.cacheInfinite可以获取
		cacheInfinite[infiniteScrollId] = this;
		el.setAttribute('data-infinite-scroll',infiniteScrollId);
		opts = opts || {};
		this.callback = opts.callback;
		//对象新建时的参数优先
		this.distance = opts.distance || el.getAttribute('data-distance')*1 || 50;
		var autoLoad = opts.autoLoad || (el.getAttribute('data-auto-load') === 'true' ? true : false);

		this.isLoading = false;//是否正在加载中,如果在加载中不重复触发‘infinite’事件
		
		this.stop = false;//是否停止触发'infinite'事件
		this.infinitePocket = strToHTML(infinitePocket);
		this.infinitePocket.innerHTML = toLoadMoreTpl;
		el.appendChild(this.infinitePocket);
		this.el = el;
		var self = this;
		this.handleInfiniteScrollWrapper = function(){
			self.handleInfiniteScroll.apply(self);
		};
		this.handleClickWrapper = function(){
			self.handleClick.apply(self);
		}
		this.on();
		//自动触发一次‘infinite’事件,主要用于在初次加载时
		if(autoLoad){
			this.trigger('infinite');
		}
	}
	//将提示字符串模板转化为html
	function strToHTML(str){
		var html,div = doc.createElement('div');
		doc.body.appendChild(div);
		div.innerHTML = str;
		html = div.firstElementChild;
		div.parentNode.removeChild(div)
		return  html;
	}
	InfiniteScroll.prototype.on = function(){
		this.el.addEventListener('scroll',this.handleInfiniteScrollWrapper);
		this.infinitePocket.addEventListener('click',this.handleClickWrapper);
		this.infinitePocket.addEventListener('tap',this.handleClickWrapper);
	};
	InfiniteScroll.prototype.off = function(){
		this.el.removeEventListener('scroll',this.handleInfiniteScrollWrapper);
		this.infinitePocket.removeEventListener('click',this.handleClickWrapper);
		this.infinitePocket.removeEventListener('tap',this.handleClickWrapper);
	};
	//加载结束
	InfiniteScroll.prototype.end = function(noMoreData){
		this.isLoading = false;
		if(noMoreData){
			this.stop = true;
			this.infinitePocket.innerHTML =  noMoreDataTpl;
		}else{
			this.stop = false;//当已经到底时刷新需要重置
			this.infinitePocket.innerHTML =  toLoadMoreTpl;
		}
	};
	InfiniteScroll.prototype.refresh = function(){
		this.stop = false;
		this.end();
	}
	InfiniteScroll.prototype.handleClick =  function(){
		var infinitePocketStr = this.infinitePocket.innerHTML;
		if(~infinitePocketStr.indexOf(toLoadMoreTpl))
			this.trigger('infinite');
	};
	//处理滚动事件
	InfiniteScroll.prototype.handleInfiniteScroll = function(){
		if(this.stop || this.isLoading) return ;
		var el = this.el;
		var scrollTop = el.scrollTop;
		var scrollHeight = el.scrollHeight;
		var height = el.offsetHeight;
		if(scrollTop+height > scrollHeight - this.distance){
			this.trigger('infinite');
		}
	};
	InfiniteScroll.prototype.destroy = function(){
		var keys = cacheInfinite.keys();
		for(var key in keys){
			cacheInfinite[key] = this;
			break;
		}
		delete cacheEl[key];
	};
	InfiniteScroll.prototype.trigger = function(eventType,eventData){
		var el = this.el;
		this.isLoading = true;
		this.infinitePocket.innerHTML =  loadingTpl;
		var evt = new CustomEvent(eventType,{
				detail: eventData,
				bubbles: true,
				cancelable: true
			});
		var self = this;
		evt.end = function(){
			var args = arguments;
			setTimeout(function(){
				self.end(args[0]);
			},0);
		};
		evt.infiniteScroll = this;
		setTimeout(function(){
			el.dispatchEvent(evt);
			if(typeof self.callback === 'function') self.callback(evt);
		},0)
	};
	win.InfiniteScroll = InfiniteScroll;
})(window,document)
