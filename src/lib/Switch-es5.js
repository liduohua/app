(function(root, factory) {
	//AMD
	if (typeof define === 'function' && define.amd)  {
		define(['exports'], function(exports) {
			exports.Switch = root.Switch = factory();
		});
		//Node.js
	} else if (typeof exports !== 'undefined') {
		exports.Switch = factory( );
		//Browser
	} else {
		root.Switch = factory();
	}
})(this, function() {
	'use strict';
	function Switch(options){
		options = options || {};
		this.switchEl = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
		this.switchOn = !!options.switchOn;
		this.switchHandleEl = this.switchEl.querySelector('.switch-handle');
		this.switchOn ? this.on() : this.off();
		this.callback = options.callback;
		this._initEvents(this.switchEl);
	}
	Switch.prototype = { 
		_initEvents : function(el){
			el.addEventListener('touchstart', this);
			el.addEventListener('touchmove', this);
			el.addEventListener('touchend', this);
			el.addEventListener('touchcancel', this);
		},
		destroy :function(){
			var el = this.switchEl;
			el.removeEventListener('touchstart', this);
			el.removeEventListener('touchmove', this);
			el.removeEventListener('touchend', this);
			el.removeEventListener('touchcancel', this);
		},
		handleEvent : function(e){
			switch ( e.type ) {
				case 'touchstart':
				this._start(e);
				break;
				case 'touchend':
				case 'touchcancel':
				this._end(e);
			}
		},
		_start : function(e){
			this.switchHandleEl.classList.add('switch-active');
			this.startTime = new Date;
		},
		on : function(time){
			this.switchHandleEl.style.cssText = 'transform: translate(44px ,0);-webkit-transform: translate(34px ,0);';
			this.switchEl.classList.add('switch-on');
			this.switchEl.querySelector('.on').classList.remove('hidden');
			this.switchEl.querySelector('.off').classList.add('hidden');
			typeof this.callback === 'function' && this.callback('on');
		},
		off : function(time){ 
			this.switchHandleEl.style.cssText = 'transform: translate(0px ,0);-webkit-transform: translate(0px ,0);';
			this.switchEl.classList.remove('switch-on');
			this.switchEl.querySelector('.off').classList.remove('hidden');
			this.switchEl.querySelector('.on').classList.add('hidden');
			typeof this.callback === 'function' && this.callback('off');
		},
		_end : function(e){
			if(this.switchOn){
				this.switchOn = false;
				this.off();
				this.switchHandleEl.classList.remove('switch-active');
			}else{
				this.switchOn = true;
				this.on();
				this.switchHandleEl.classList.remove('switch-active');
			}
		}
	};
	return Switch;
});