/*
 * 下拉刷新
 * 完成于2017/6/14
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
	
	var refreshPocket = '<div class="refresh-pocket"><i></i><span></span></div>',
		refreshText = '下拉刷新',
		releaseText = '释放刷新',
		loadingText = '正在刷新...',
		arrowIcon = 'pull-to-refresh-arrow',
		loadingIcon = 'preloader',
		setTipsTextRE = /(^.*<i).*?(>.*<span>).*(<\/span>.*$)/,
		useTransform = (function (el) {
			var transforms = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'];
				for ( var i in transforms ) if (el.style[ transforms[i] ] !== undefined) 
      				return transforms[i];
				return false;
			})(document.createElement('div'));
	function getComputedPosition(el) {
		var matrix = window.getComputedStyle(el, null),
			x, y;
		if ( useTransform ) {
			matrix = matrix[useTransform].split(')')[0].split(', ');
			x = +(matrix[12] || matrix[4]);
			y = +(matrix[13] || matrix[5]);
		} else {
			x = +matrix.left.replace(/[^-\d.]/g, '');
			y = +matrix.top.replace(/[^-\d.]/g, '');
		}
		return { x: x || 0, y: y || 0};
	}
	function addEvent(el,type,fn,capture){
		el.addEventListener(type,fn,!!capture);
	}
	function removeEvent(el,type,fn,capture){
		el.removeEventListener(type,fn,!!capture);
	}
	//将提示字符串模板转化为html
	function strToHTML(str){
		var html,div = doc.createElement('div');
		div.innerHTML = str;
		doc.body.appendChild(div);
		html = div.firstElementChild;
		div.parentNode.removeChild(div)
		return  html;
	}
	function getTouchPosition(e){
		var point = e.touches ? e.touches[0] : e;
		return {
			x : point.pageX,
			y : point.pageY
		}
	}
	function transition(el,duration){
		if(duration == undefined){
			duration = null;
		}else{
			duration += 'ms';
		}
		var elStyle = el.style;
    	elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
    	elStyle.webkitTransitionTimingFunction = elStyle.MsTransitionTimingFunction = 
    	elStyle.msTransitionTimingFunction = elStyle.MozTransitionTimingFunction = 
    	elStyle.OTransitionTimingFunction = elStyle.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
	}
	function transform(el,transform){
		var elStyle = el.style;
		elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
	}
	//callback不传为去掉绑定事件
	function transitionEnd(dom,callback) {
        var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
            i,len = events.length;
       	
        var fn =  function(){
            		for(var i = 0 ;i<len ;i++)
            			removeEvent(dom,events[i],fn);
            		typeof callback === 'function' && callback();
            } ;
        for(var i = 0 ;i<len ;i++)
            removeEvent(dom,events[i],this.transitionEndFn);
        if (callback) {
        	
            for (i = 0; i < len; i++) {
            	addEvent(dom,events[i], fn);
            }
        }
        return fn;
    }
	//缓存,防止在单页应用中的生命周期方法中重复创建,其实也没必要，只是目前公司框架加上这个开发更方便
	var cachePullToRefresh = [];
	PullToRefresh.cachePullToRefresh = cachePullToRefresh;
	function PullToRefresh(el,opts){
		var refreshScrollId = el.refreshScrollId !== undefined ? (el.refreshScrollId || el.getAttribute('data-refresh-scroll')) 
			: cachePullToRefresh.length ;
		if(cachePullToRefresh[refreshScrollId]){return cachePullToRefresh[refreshScrollId]}
		//增加便利获取方法
		el.refreshScrollId = refreshScrollId;
		//缓存当前对象,PullToRefresh.cachePullToRefresh可以获取
		cachePullToRefresh[refreshScrollId] = this;
		el.setAttribute('data-refresh-scroll',refreshScrollId);

		opts = opts || {};
		this.container = el;
		this.callback = opts.callback;
		this.duration = opts.duration || 500;
		//触发"refresh"的距离
		this.triggerDistance = opts.trDistance || el.getAttribute('data-tr-distance')*1 || 40;
		this._initEvents();
		this.refreshPocket = strToHTML(refreshPocket);
		var html = this.refreshPocket.innerHTML;
		this.refreshPocket.innerHTML = html.replace(setTipsTextRE,'$1 class='+arrowIcon+'$2'+refreshText+'$3');
		el.firstElementChild ? el.insertBefore(this.refreshPocket,el.firstElementChild)
			: el.appendChild(this.refreshPocket);
		var auotRefresh = el.getAttribute('data-auto-refresh');
		if(auotRefresh === 'true'){
			this.autoRefresh();
		}
	}

	PullToRefresh.prototype = {
		autoRefresh : function(){
			var children = this.container.children;
			this.refresh = true;
			var self = this;
			for(var i= 0, l = children.length ;i<l;i++){
				//transform(children[i],'translate3d(0,'+0+'px,0)');
				children[i].offsetHeight;
				transition(children[i],this.duration);
				this.isInTranstion = true;
				if(this.refresh){
					//var html = this.refreshPocket.innerHTML;
					//this.refreshPocket.innerHTML = html.replace(setTipsTextRE,'$1 class='+loadingIcon+'$2'+loadingText+'$3');
					transform(children[i],'translate3d(0,'+this.triggerDistance+'px,0)');
				}
			}
			setTimeout(function(){
				self.isInTranstion = true;
				for(var i= 0, l = children.length ;i<l;i++){
					transition(children[i],null);
				}
				var html = self.refreshPocket.innerHTML;
				self.refreshPocket.innerHTML = html.replace(setTipsTextRE,'$1 class='+loadingIcon+'$2'+loadingText+'$3');
				self.trigger('refresh');
			},450);
		},
		_initEvents : function(remove){
			var eventType = remove ? removeEvent : addEvent;
			var target = this.container;
			eventType(target,'touchstart',this);
		},
		handleEvent :function(e){
			switch(e.type){
				case 'touchstart':
					this.handleTouchStart(e);
					break;
				case 'touchmove' : 
					this.handleTouchMove(e);
					break;
				break;
				case 'touchend' :
				case 'touchcancel':
					this.handleTouchEnd(e);
					break;
			}
		},
		handleTouchStart : function(e){
			if(this.stop){return;}
			var pos = getComputedPosition(this.refreshPocket);
			//this.wasDrag = true;
			if(pos.y){//已经开始下拉时，再次下拉会有抖动现象，以此判断是否已开始下拉
				return;
			}
			//还原，防止无法无限滚动
			this.container.style.overflow = null;
			var scrollTop = this.container.scrollTop;
			//是一次下拉
			if(scrollTop <= 0){
				this.isDragDown = true;
				addEvent(this.container,'touchmove',this);
				addEvent(this.container,'touchend',this);
				addEvent(this.container,'touchcancel',this);
			}else{
				return;
			}
			//this.startTime = (new Date()).getTime();
			var position = getTouchPosition(e);
			
			this.startX = position.x;
			this.startY = position.y;

			//如果当前正处于动画中，去掉动画时间
			if(this.isInTranstion){
				var children = this.container.children;
				for(var i= 0, l = children.length ;i<l;i++){
					transition(children[i],null);
				}
			}
			//设置开始距离
			this.startTranslate = pos.y;

			this.refreshPocket.classList.add('refresh-pocket-hidden');
			//去掉绑定的过渡事件
			transitionEnd.call(this,this.container);
		},
		handleTouchMove : function(e){
			if(this.container.scrollTop == 0 && !this.isScrolling){
				//return;
				//e.preventDefault();
			}
			var scrollTop = this.container.scrollTop;
			var position = getTouchPosition(e);
			//当scrollTop==0时也有可能是上拉的，eg:在刚进入页面时直接上拉,如果已被拉动则无需判断
			var isDragUp = !this.wasDrag ? ( position.y-this.startY ) <= 0 : false;
			if(!isScrolling){
				var isScrolling = Math.abs(position.y-this.startY) >  Math.abs(position.x-this.startX);
			}


			//是上拉,删除事件
			if(!this.wasDrag && ( isDragUp || !isScrolling)){

				//alert(isScrolling);
				removeEvent(this.container,'touchmove',this);
				removeEvent(this.container,'touchend',this);
				removeEvent(this.container,'touchcancel',this);
				return;
			}
			this.isScrolling = true;
			this.wasDrag = true;
			//圆形动画
			var dist = Math.pow(position.y-this.startY, 0.85);
			//小于0表示已经到顶了，阻止拖动
			if(dist < 0){
				return;
			}
			this.refreshPocket.classList.remove('refresh-pocket-hidden');
			e.preventDefault();
			//强制刷新
			this.refreshPocket.offsetHeight;
			var html = this.refreshPocket.innerHTML;
			//如果正在加载中不更改提示语
			if(!this.isLoading){
				//如果大于触发距离，并且箭头不向上
				if(dist > this.triggerDistance && html.indexOf('arrow-turn-up') <0){
			 		//this.refreshPocket.innerHTML = html.replace(setTipsTextRE,'$1 class= "'+arrowIcon+'"$2'+releaseText+'$3');
			 		var arrowNode = this.refreshPocket.querySelector('i');
			 		var textNode = this.refreshPocket.querySelector('span');
			 		arrowNode.className = arrowIcon;
			 		textNode.textContent = releaseText;
					//强制浏览器刷新，否则动画无效果（注：高性能javascript书中有解释或参考iscroll.js）
					this.refreshPocket.offsetHeight;
					var classList = this.refreshPocket.children[0].classList;
					classList.add('arrow-turn-up');
				
					this.refresh = true;
				//如果小于触发距离，并且箭头不向下
				}else if(dist < this.triggerDistance && html.indexOf('arrow-turn-down') <0){
					//已有向上箭头的样式
					if(html.indexOf('arrow-turn-up') >0){
						//this.refreshPocket.innerHTML = html.replace(setTipsTextRE,'$1 class="'+arrowIcon+'"$2'+refreshText+'$3');
						var arrowNode = this.refreshPocket.querySelector('i');
			 			var textNode = this.refreshPocket.querySelector('span');
			 			arrowNode.className = arrowIcon;
			 			textNode.textContent = refreshText;
						var classList = this.refreshPocket.children[0].classList
						classList.add('arrow-turn-up');
						this.refreshPocket.offsetHeight;
						classList.add('arrow-turn-down');
						classList.remove('arrow-turn-up');
					//初始状态下的情况
					}else{
						//this.refreshPocket.innerHTML = html.replace(setTipsTextRE,'$1 class="'+arrowIcon+'"$2'+refreshText+'$3');
						var arrowNode = this.refreshPocket.querySelector('i');
			 			var textNode = this.refreshPocket.querySelector('span');
			 			arrowNode.className = arrowIcon;
			 			textNode.textContent = refreshText;
					}
					this.refresh = false;
				}
			}
			var children = this.container.children;

			for(var i= 0, l = children.length ;i<l;i++)
				transform(children[i],'translate3d(0,'+(dist+this.startTranslate)+'px,0)');
		},
		//刷新结束时调用
		pullToRefreshDone : function(){
			var self = this;
			this.isLoading = false;
			var children = this.container.children;
			this.transitionEndFn = transitionEnd.call(this,this.container,function(){
				self.wasDrag = false;
				self.isScrolling = false;
				for(var i= 0, l = children.length ;i<l;i++){
					transition(children[i],null);
					transform(children[i],null);
				}
				self.isInTranstion = false;
				
			 
			});
			//提前复原，因为动画尚未完成，在快速重复下拉刷新时会有抖动现象
			setTimeout(function(){
				var arrowNode = self.refreshPocket.querySelector('i');
			 	var textNode = self.refreshPocket.querySelector('span');
			 	arrowNode.className = arrowIcon;
			 	textNode.textContent = refreshText;
			},200);
			
			for(var i= 0, l = children.length ;i<l;i++){
				transition(children[i],this.duration);
				transform(children[i],'translate3d(0,'+0+'px,0)');
				this.refresh = false;
				self.isInTranstion = true;
			}
		},
		handleTouchEnd : function(e){
			//alert(this.wasDrag);
			//this.wasDrag = false;
			var self = this;
			var children = this.container.children;
			//绑定过渡事件，在事件触发时将处理还原
			this.transitionEndFn = transitionEnd.call(this,this.container,function(){
				self.isInTranstion = false;
				if(!self.refresh){
					self.isScrolling = false;
					self.wasDrag = false;
				}
				for(var i= 0, l = children.length ;i<l;i++){
					transition(children[i],null);
				}
				//此处未执行，什么原因以后找找
				/*if(self.refresh){
					var arrowNode = self.refreshPocket.querySelector('i');
			 		var textNode = self.refreshPocket.querySelector('span');
			 		arrowNode.className = arrowIcon;
			 		textNode.textContent = refreshText;
				}*/
			});
			//console.log("000000");
			for(var i= 0, l = children.length ;i<l;i++){
				transition(children[i],this.duration);
				this.isInTranstion = true;
				if(this.refresh){
					var html = this.refreshPocket.innerHTML;
					this.refreshPocket.innerHTML = html.replace(setTipsTextRE,'$1 class='+loadingIcon+'$2'+loadingText+'$3');
					transform(children[i],'translate3d(0,'+this.triggerDistance+'px,0)');
				}else{
					transform(children[i],'translate3d(0,'+0+'px,0)');
				}
			}
			if(this.refresh)
				this.trigger('refresh');
              
           
            removeEvent(this.container,'touchmove',this);
			removeEvent(this.container,'touchend',this);
		},
		destroy : function(){
			removeEvent(this.container,'touchstart',this);
			var keys = cachePullToRefresh.keys();
			for(var key in keys){
				cachePullToRefresh[key] = this;
				break;
			}
			delete cachePullToRefresh[key];
		},
		trigger : function(eventType,eventData){
			if(this.isLoading) return;
			this.isLoading = true;
			var evt = new CustomEvent(eventType,{
					detail: eventData,
					bubbles: true,
					cancelable: true
				});
			var self = this;
			evt.pullToRefreshDone = function(){
				self.pullToRefreshDone(arguments[0]);
			};
			//保存方便取用，这样外部不需要保存此变量
			evt.pullToRefresh = this;
			setTimeout(function(){
				self.container.dispatchEvent(evt);
				if(typeof self.callback === 'function') self.callback(evt);
			},0)
		}
	}
	if ( typeof module != 'undefined' && module.exports ) {
		module.exports = PullToRefresh;
	} else if ( typeof define == 'function' && define.amd ) {
        define( function () { return PullToRefresh; } );
	} else {
		win.PullToRefresh = PullToRefresh;
	}
})(window,document);
