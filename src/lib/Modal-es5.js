(function(root, factory) {
	//AMD
	if (typeof define === 'function' && define.amd)  {
		define(['exports'], function(exports) {
			exports.Modal = root.Modal = factory();
		});
		//Node.js
	} else if (typeof exports !== 'undefined') {
		exports.Modal = factory( );
		//Browser
	} else {
		root.Modal = factory();
	}
})(this, function() {
	'use strict';
	function __extends(SubClass,SuperClass){
    	for(var p in SuperClass){
    		if(SuperClass.hasOwnProperty(p)){
    			SubClass[p] = SuperClass[p];
    		}
    	}
    	var Super = function(){
    		this.constructor = SubClass;
    	};
    	Super.prototype = SuperClass.prototype;
    	var __super = new Super();
    	for(var p in SubClass.prototype){
    		if(SubClass.prototype.hasOwnProperty(p)){
    			__super[p] = SubClass.prototype[p];
    		}
    	}
    	SubClass.prototype = __super;
    }
	function Modal(options) {
		var opts = {
			isAnimate: true,
			isPushStack : true,
			history : 'hash',
			eventType: 'click',
			animateIn: 'scale-in',
			animateOut: 'scale-out'
		}
		for(var key in options)
			opts[key] = options[key];
		this.opts = opts;
		//默认的根节点类名
		this.rootNodeClassName = 'modal';
		//可能在一个Modal对象上有多个弹出框，用栈保存，大多数情况下是由用户手动关闭的，
		//因此是一个栈顺序，但对于其他情况（e.g.加载中的弹出框），可能由代码自动关闭，并不一定遵守栈顺序。 
		
	}
	
	function History(){
		/*alert();
		this.type = this.opts.history;
		alert(this.type);*/
	}
	var eventHandlers = [];
	History.prototype = {
		push : function(callback){
			
			var timestamp = Date.now();	
			if('hash'){
				location.hash = timestamp;	
			}
			var callbackWrapper = function(){
				callback();
				window.removeEventListener('hashchange',callbackWrapper);
			}
			eventHandlers.push({timestamp : timestamp,callbackWrapper : callbackWrapper});
			setTimeout(function(){
				window.addEventListener('hashchange',callbackWrapper);
			},0)	
		},
		back : function(){
			
			window.removeEventListener('hashchange',eventHandlers.pop().callbackWrapper);
			history.back();
		},
	};
	var cacheModals = [];
	Modal.cacheModals = cacheModals;
	var slice = Array.prototype.slice,
		simpleSelectorRE = /^[\w-]*$/,
		noop = function() {},
		dummyStyle = document.createElement('div').style,
		//获取支持的浏览器前缀
		vendor = (function() {
			var vendors = 't,webkitT,MozT,msT,OT'.split(','),
				t,
				i = 0,
				l = vendors.length;

			for(; i < l; i++) {
				t = vendors[i] + 'ransform';
				if(t in dummyStyle) {
					return vendors[i].substr(0, vendors[i].length);
				}
			}
			return false;
		})(),
		transitionEnd = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
		animationEnd = ['webkitAnimationEnd', 'OAnimationEnd', 'MSAnimationEnd', 'animationend'],
		_proto = {
			//确认框
			confirm: function(text, ok, cancel) {
				var html = '<div class="confirm"><p class="modal-content">' + text + '</p>\
    					<div class="confirm-btns"><button class="ok">确认</button>\
    					<button class="cancel">取消</button></div></div>';
				var modal = this._createModal(html);
				var self = this;
				var wrapperOk = function() {
					this.closeModal();
					if(typeof ok == 'function') {
						ok.apply(this, slice.apply(arguments))
					}
				};
				var wrapperCancel = function() {
					this.closeModal();
					if(typeof cancel == 'function') {
						cancel.apply(this, slice.apply(arguments))
					}
				};
				this.eventsBind(modal, [{
					handler: wrapperOk,
					selector: '.ok'
				}, {
					handler: wrapperCancel,
					selector: '.cancel'
				}]);
			
				return modal;
			},

			//提示框
			alert: function(text, ok, buttonText) {
				if(typeof buttonText !== 'string') {
					buttonText = '我知道了';
				}
				var html = '<div class="alert"><h3 class="title"><span class="">提示</span></h3>\
        			<p class="modal-content">' + text + '</p>\
        			<div class="btn">\
           				<button class="ok">' + buttonText + '</button>\
        			</div></div>';
				var modal = this._createModal(html);
				var self = this;
				var wrapperOk = function() {
					self.closeModal();
					if(typeof ok == 'function') {
						ok.apply(this, slice.apply(arguments))
					}
				};
				this.eventsBind(modal, [{
					handler: wrapperOk,
					selector: '.ok'
				}]);
				
				
				return modal;
			},
			showModal:function(modal){
				var self = this;
				this.push(function(){
					self.closeModal(modal,true);
				});
				var modalContent = modal.modalContent,
					appendToEl = modal.appendToEl,
					overlay = modal.overlay;
				(appendToEl || document.body).appendChild(overlay);
				(appendToEl || document.body).appendChild(modalContent);
				overlay.offsetHeight;
				//下一帧插入
				overlay.classList.add('overlay-visible');
				
				//如果有图片，则延迟到图片加载完，这样才可以准确的计算高度,(有更简单的方法可用,这里就这样处理了)
				var imgs = slice.call(modalContent.querySelectorAll('img'));
				var loadedImgCount = 0;

				function imgEventHandler() {
					this.onload = null;
					this.onerror = null;
					loadedImgCount++;
					if(loadedImgCount == imgs.length) {
						self._addAnimate(modal);
					}
				}
				for(var i = 0; i < imgs.length; i++) {
					imgs[i].onload = imgEventHandler;
					imgs[i].onerror = imgEventHandler;
				}
				if(!imgs.length) {
					this._addAnimate(modal);
				}
			},
			_addAnimate: function(modal) {
				var modalContent = modal.modalContent;
				modalContent.offsetHeight;
				modalContent.style.marginTop = -modalContent.offsetHeight / 2 + 'px';
				if(this.opts.isAnimate) {
					modalContent.classList.add('animated');
					modalContent.classList.add(this.opts.animateIn);
				}
			},
			// 如果不提供modal参数,默认从Modal.cacheModals中弹出最上面的modal关闭,
			// 否则关闭指定的modal
			closeModal: function(modal,isNotBack) {
				
				if(!modal && cacheModals.length==0){
					return;
				}else if(!modal && cacheModals.length > 0){
					modal = Modal.cacheModals.shift();
				}else{
					cacheModals.splice(cacheModals.indexOf(modal),1);
				}
				
				var modalContent = modal.modalContent;

				var overlay = modal.overlay;
				var self = this;

				function destroy() {
					if(self.opts.isAnimate) {
						for(var i = 0; i < transitionEnd.length; i++) {
							modalContent.removeEventListener(transitionEnd[i], destroy);
						}
						for(i = 0; i < animationEnd.length; i++) {
							modalContent.removeEventListener(animationEnd[i], destroy);
						}
					}
					self.eventsBind(modal, modal.events, true);
					overlay.parentNode.removeChild(overlay);
					modalContent.parentNode.removeChild(modalContent);
					
				}
				overlay.classList.remove('overlay-visible');	
				if(this.opts.isAnimate) {
					modalContent.classList.remove(this.opts.animateIn);
					for(var i = 0; i < transitionEnd.length; i++) {
						modalContent.addEventListener(transitionEnd[i], destroy);
					}
					for(i = 0; i < animationEnd.length; i++) {
						modalContent.addEventListener(animationEnd[i], destroy);
					}
					modalContent.classList.add(this.opts.animateOut);
				} else {
					destroy();
				}
				this.opts.history && !isNotBack  && this.back(modal);
				if(cacheModals.length > 0){
					setTimeout(function(){
						self.showModal(cacheModals[0]);
					},0)
				}
				
			},
			//如果提供的html有根节点,就不创建默认的根元素
			_createModal: function(html,appendToEl) {
				appendToEl = typeof appendToEl === 'object' ? appendToEl : undefined;
				var rootNode = document.createElement('div');
				rootNode.innerHTML = html;
				if(rootNode.children.length === 1) {
					rootNode = rootNode.children[0];
				}
				var overlay = document.createElement('div');
				overlay.className += 'overlay';
				rootNode.classList.add(this.rootNodeClassName);
				var modal = {
					overlay: overlay,
					modalContent: rootNode,
					events: [],
					appendToEl : appendToEl
				}
				if(cacheModals.length == 0){
					this.showModal(modal);
				}
				cacheModals.push(modal);
				return modal;
			},
			// 自定义弹出框如果没有提供root元素将使用div作为根元素
			// 所有事件处理器都会绑定当前Modal的this
			// 关闭弹出框可以使用this.closeModal();
			// 默认是从堆栈弹出最上的modal关闭,也可以给closeModal()提供指定关闭的modal
			// 返回当前创建的modal对象
			// customModal({html : '',events: [{selector : '',eventType:'',handler :function(){}}]});
			customModal: function(params) {
				var html = params.html,
					events = params.events || [];
				if(!html) return;
				var modal = this.modal(html);
				this.eventBind(modal, events);
				modal.events = events;
				return modal;
			},
			eventsBind: function(modal, events, remove) {
				var modalContent = modal.modalContent,
					self = this;
				events.forEach(function(item) {
					slice.call(modalContent.querySelectorAll(item.selector)).forEach(function(el) {
						var handler = item.handler;
						if(remove){
							el.removeEventListener(item.eventType || self.opts.eventType, item.handler);
						}else{
							item.handler = function(e) {
								handler.apply(self, [e, modalContent]);
							}
							modal.events.push(item);
							el.addEventListener(item.eventType || self.opts.eventType, item.handler);
						}
					});
				});
			},
			toast : function(){
				
			},
			// 显示预加载图标
			showPreloader: function(html, appendToEl) {
				if(html && html.nodeType == 1) {
					appendToEl = html;
					html = undefined;
				}
				appendToEl = typeof appendToEl === 'object' ? appendToEl :
					simpleSelectorRE.test(appendToEl) ? document.querySelector(appendToEl) : document.body;
				if(!html){
					html = '<div style="" class="modal-preloader"><div class="preloader"><div class="preloader-icon" style=""></div></div></div>'
				}
				var modal = this._createModal(html, appendToEl);
				//modal.overlay.style.opacity = 0;
				return modal;
			},
			// 隐藏预加载图标
			hidePreloader: function(modal) {
				this.closeModal(modal);
			},
		};
	
	Modal.prototype = _proto;
	__extends(Modal,History);
	return Modal;
});
