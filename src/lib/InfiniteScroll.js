//CustomEvent polyfill
(function() {
	if(typeof window.CustomEvent === "function") return false;

	function CustomEvent(event, params) {
		params = params || {
			bubbles: false,
			cancelable: false,
			detail: undefined
		};
		let evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}
	CustomEvent.prototype = window.Event.prototype;
	win.CustomEvent = CustomEvent;
})();

let infinitePocketClass = 'infinite-pocket';
let loadingTpl = '<i class="preloader"></i><span>正在加载...</span>';
let loadMoreTpl = '<span class="">点击加载更多</span>';
let noMoreDataTpl = '<span >没有更多数据了</span>';
//缓存所有InfiniteScroll对象
let cacheInfiniteScroll = [];

export default class InfiniteScroll {
	constructor(el,options) {
		el = typeof el === 'string' ? document.querySelector(el) : el;
		if(!el) {
			throw new Error('传入InfiniteScroll构造函数中的el不能为空！')
		}
		//下一个InifinteScroll id

		let nextInfiniteScrollId = el.getAttribute('data-infinite-scroll-id') || cacheInfiniteScroll.length ;

		//如果这个值在缓存中已经可以找到，就直接返回
		if(cacheInfiniteScroll[nextInfiniteScrollId]) {
			return cacheInfiniteScroll[nextInfiniteScrollId]
		}
		//增加便利获取方法
		el.infiniteScroll = this;
		//缓存当前对象,并通过InfiniteScroll.cacheInfiniteScroll可以全局获取
		cacheInfiniteScroll[nextInfiniteScrollId] = this;
		el.setAttribute('data-infinite-scroll', nextInfiniteScrollId);
		options = options || {};
		//在实例化时可以传入callback,在触发infinite事件触发前调用
		//方法会放入下一事件循环中执行
		this.callback = options.callback;
		//实例化时传递的参数优先
		this.triggerDistance = options.triggerDistance || el.getAttribute('data-trigger-distance') * 1 || 50;
		let autoLoad = options.autoLoad || (el.getAttribute('data-auto-load') === 'true' ? true : false);
		//是否正在加载中,如果在加载中不重复触发‘infinite’事件
		this.isLoading = false;
		//是否停止触发'infinite'事件
		this.stop = false;
		this.infinitePocket = document.createElement('div');
		this.infinitePocket.className = infinitePocketClass;
		this.infinitePocket.innerHTML = loadMoreTpl;
		el.appendChild(this.infinitePocket);

		this.el = el;
		
		this.onScrollWrapper = () => {
			this.onScroll();
		};
		
		this.onClickWrapper = () =>{
			this.onClick();
		};
		
		this.on();
		//自动触发一次‘infinite’事件,主要用于在初次加载时
		if(autoLoad) {
			this.trigger('infinite');
		}
	}
	on() {
		this.el.addEventListener('scroll', this.onScrollWrapper);
		this.infinitePocket.addEventListener('click', this.onClickWrapper);
		this.infinitePocket.addEventListener('tap', this.onClickWrapper);
	}
	off() {
		this.el.removeEventListener('scroll', this.onScrollWrapper);
		this.infinitePocket.removeEventListener('click', this.onClickWrapper);
		this.infinitePocket.removeEventListener('tap', this.onClickWrapper);
	}
	//加载结束
	end(noMoreData){
		setTimeout( () => {//这里这么做是为了让vm框架先插入节点
			if(noMoreData){
				this.infinitePocket.innerHTML =  noMoreDataTpl;
				this.stop = true;
			}else{
				this.infinitePocket.innerHTML =  loadMoreTpl;
			}
			this.isLoading = false;
		},0);
	}
	refresh (){
		this.stop = true;//先暂停(有些情况下刷新可能stop=false)，这样在改变提示时不会触发infinite事件
		this.infinitePocket.innerHTML =  loadMoreTpl;
		this.stop = false;
		this.isLoading = false;
	}
	onClick() {
		let currTpl = this.infinitePocket.innerHTML;
		if(~currTpl.indexOf(loadMoreTpl))
			this.trigger('infinite');
	}
	//处理滚动事件
	onScroll() {
		let el = this.el;
		let scrollTop = el.scrollTop;
		let scrollHeight = el.scrollHeight;
		let height = el.offsetHeight;
		if(scrollTop + height > scrollHeight - this.triggerDistance) {
			this.trigger('infinite');
		}
	}
	destroy() {
		this.off();
		for(let key in cacheInfiniteScroll) {
			if(cacheInfiniteScroll[key] == this) {
				cacheInfiniteScroll[key] = null;
				break;
			}
		}
		this.el.removeChild(this.infinitePocket);
	}
	trigger(eventType, eventData) {
		if(this.isLoading || this.stop) return;
		let el = this.el;
		this.isLoading = true;
		this.infinitePocket.innerHTML = loadingTpl;
		let evt = new CustomEvent(eventType, {
			detail: eventData,
			bubbles: true,
			cancelable: true
		});
		//var self = this;
		//为了方便使用
		evt.end = (...args) => {
			this.end(args[0]);
		};
		evt.infiniteScroll = this;
    setTimeout(() => {
      if(typeof this.callback === 'function') this.callback(evt);
      el.dispatchEvent(evt)
    }, 0)
  }
}
