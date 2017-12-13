/*
 * 滑动块
 */
;(function(){
	"use strict";
	function noop(){}
	function offloadFn(fn){setTimeout(fn || noop),0}
	var checkBrower = {
		touch : 'ontouchstart' in window || window.TouchDocument && document instanceof window.TouchDocument,
		transitions : (function(el){
			var props = [{transition : 'transition',eventType : 'transitionend'},
						 {transition : 'WebkitTransition',eventType : 'webkitTransitionEnd'},
						 {transition : 'MozTransition',eventType : 'transitionend'}, 
						 {transition : 'OTransition',eventType : 'oTransitionEnd'},
						 {transition : 'msTransition',eventType : 'MSTransitionEnd'}];
      			for ( var i in props ) if (el.style[ props[i].transition ] !== undefined) 
      				return props[i];
      			return false;
			})(document.createElement('div')),
		transform : (function (el) {
			var transforms = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'];
				for ( var i in transforms ) if (el.style[ transforms[i] ] !== undefined) 
      				return transforms[i];
				return false;
			})(document.createElement('div'))
	};
	var rAF = window.requestAnimationFrame	||
		window.webkitRequestAnimationFrame	||
	    window.mozRequestAnimationFrame		||
	    window.oRequestAnimationFrame		||
	    window.msRequestAnimationFrame		||
		function (callback) { window.setTimeout(callback, 1000 / 60); };
	//"getComputedPosition" copy from iscroll.js
	function getComputedPosition(el) {
		var matrix = window.getComputedStyle(el, null),
			x, y;

		if ( checkBrower.transitions ) {
			matrix = matrix[checkBrower.transform].split(')')[0].split(', ');
			x = +(matrix[12] || matrix[4]);
			y = +(matrix[13] || matrix[5]);
		} else {
			x = +matrix.left.replace(/[^-\d.]/g, '');
			y = +matrix.top.replace(/[^-\d.]/g, '');
		}

		return { x: x, y: y };
	}
	
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
	
	function Swipe(container,options){
		if(!container){
			return ;
		}
		var opts = {
			slideX : true,//水平滑动
			slideY : false,//垂直滑动
			forward : true,//滑动方向，默认向前
			successive :　true,　//是否连续
			delay : 3000,//0表示不开始轮播
			speed : 500,
			isBounds : true,//是否反弹
			preventDefault : true,
			startSlide : 0,
			disableGuesture : false,
			stopPropagation : true
		}
		var wrapperEl = container.children[0];
		var options = options || {};
		for(var key in options){
			opts[key] = options[key];
		}
		var speed = parseInt(opts.speed,10) ||500;
		var index = parseInt(opts.startSlide,10) || 0;
		this.opts = opts;
		this.index = index;
		this.wrapperEl = wrapperEl;
		this.container = container;
		this.init();
		this.begin();
	}
	Swipe.prototype = {
		init : function(){
			var index = this.index;
			var slides = this.wrapperEl.children;
    		length = slides.length;
	   		//slide少于2不轮播
    		//if (slides.length < 2) this.opts.successive = false;
    		//只有两个子节点的时候进行复制
    		if (checkBrower.transitions && this.opts.successive && slides.length < 3) {
				this.cloneFirstEl = slides[0].cloneNode(true);
      			this.wrapperEl.appendChild(this.cloneFirstEl);
				this.cloneSecondEl = slides[1].cloneNode(true);
      			this.wrapperEl.appendChild(this.cloneSecondEl);
      			slides = this.wrapperEl.children;
    		}
    		this.slides = slides;
    		//存储每个slide的位置
    		this.slidePos = new Array(slides.length);
    		//此宽度包括边框的宽度
    		var width = this.container.getBoundingClientRect().width || this.container.offsetWidth;
    		var height = this.wrapperEl.children[0].getBoundingClientRect().height || this.wrapperEl.children[0].offsetHeight;
    		this.width = width;
    		this.height = height;
			//水平滑动
			if(this.opts.slideX){
				this.wrapperEl.style.width = (slides.length * width) + 'px';
			}
			//垂直滑动
			if(this.opts.slideY){
				this.wrapperEl.style.height = height + 'px';
			}
    		var pos = slides.length;
    		//初始化位置
   			while(pos--) {
      			var slide = slides[pos];
				slide.setAttribute('data-index', pos);
      			if(this.opts.slideX){
      				slide.style.width = width + 'px';
      			}
				if(this.opts.slideY){
					slide.style.height = height + 'px';
				}
      			if (checkBrower.transitions) {
      				if(this.opts.slideX){
      					slide.style.left = (pos * -width) + 'px';
      					this.move(pos, index > pos ? -width : (index< pos ? width : 0), 0);
      				}
      				if(this.opts.slideY){
      					slide.style.top = (pos * -height) + 'px';
      					this.move(pos, index > pos ? -height : (index < pos ? height : 0), 0);
      				}
      			}
    		}
    		// 设置index前后的元素位置，在第一个和最后一个元素index时不一样
    		if (this.opts.successive && checkBrower.transitions) {
    			if(this.opts.slideX){
    				this.move(this.circle(index-1), -width, 0);
      				this.move(this.circle(index+1), width, 0);
    			}
    			if(this.opts.slideY){
    				this.move(this.circle(index-1), -height, 0);
      				this.move(this.circle(index+1), height, 0);
    			}
    		}
   			this.container.style.visibility = 'visible';
			if(!this.opts.disableGuesture){
				this.wrapperEl.addEventListener('touchstart',this,false);
			}
   			this.container.addEventListener(checkBrower.transitions.eventType, this);
		},
		circle : function(index) {
    		return (this.slides.length + (index % this.slides.length)) % this.slides.length;
  		},
		move : function(index, dist, speed) {
    		this.translate(index, dist, speed);
    		this.slidePos[index] = dist;
  		},
  		translate : function(index, dist, speed) {
    		var slide = this.slides[index];
    		var style = slide && slide.style;
    		if (!style) return;
    		style.webkitTransitionDuration =
    		style.MozTransitionDuration =
    		style.msTransitionDuration =
    		style.OTransitionDuration =
   	 		style.transitionDuration = speed + 'ms';
			//cubic-bezier(0.165, 0.84, 0.44, 1)
			
			style.webkitTransitionTimingFunction = 
			style.MozTransitionTimingFunction = 
			style.mskitTransitionTimingFunction = 
			style.OkitTransitionTimingFunction = 
			style.transitionTimingFunction = 'cubic-bezier(0.165, 0.84, 0.44, 1)';

 
			style.webkitTransform = 'translate(' + (this.opts.slideX ? (dist + 'px,0') : ('0,'+dist+'px')) +')' + 'translateZ(0)';
    		style.msTransform =
    		style.MozTransform =
    		style.OTransform = 'translate(' + (this.opts.slideX ? (dist + 'px,0') : ('0,'+dist+'px')) +')';
			slide.offsetWidth;
  		},
  		stop : function() {
  			this.isStop = true;
    		clearTimeout(this.interval);
  		},
  		begin : function() {
  			if(!this.opts.delay) return;
  			var self = this;
  			var wrapperNext = function(){
  				self.opts.forward ? self.next() : self.prev();
  			}
    		this.interval = setInterval(wrapperNext, this.opts.delay);
    		this.isStop = false;
  		},
  		prev : function() {
    		this.slide(this.index-1);
    		this._slideStart(this.index-1);
  		},
  		next : function() {
    		this.slide(this.index+1);
    		this._slideStart(this.index+1);
  		},
  		slide : function(to, slideSpeed) {
  			var slideX = this.opts.slideX;
    		if (this.index == to) return;
    		if (this.opts.successive) {
      			var direction = Math.abs(this.index-to) / (this.index-to); // 1: 向前, -1: 向后
      			to = this.circle(to);
				this.move(to, 0, slideSpeed || this.opts.speed);
				this.move(this.index, (slideX ? this.width : this.height) * direction, slideSpeed || this.opts.speed);

				//修改接下要显示元素的位置	
      			if (this.opts.successive) 
      				this.move(this.circle(to - direction), -((slideX ? this.width : this.height) * direction), 0); 
    		}else{
    			var direction = Math.abs(this.index-to) / (this.index-to); // 1: 向前, -1: 向后
      			to = this.circle(to);
      			//alert(this.index + "   "+to);
				this.move(this.index, (slideX ? this.width : this.height) * direction, slideSpeed || this.opts.speed);
      			this.move(to, 0, slideSpeed || this.opts.speed);
      			//this.move(this.circle(to-1), 0, 0);
				//修改接下要显示元素的位置
      			//this.move(, -((slideX ? this.width : this.height) * direction), 0); 
      			//不知道有没有更好的方法一句代码搞定,以后再看看
      			for(var i=0, l=this.slides.length ; i<l;i++){
      				if(i == to || i == this.index) continue;
      				if(i<to){
      					this.move(i, -(slideX ? this.width : this.height), 0);
      				}else{
      					this.move(i, (slideX ? this.width : this.height), 0);
      				}
      			}
    		}
    		this.index = to;
    		//slideStart
  		},	
    	handleEvent: function(event) {
     	 	switch (event.type) {
        		case 'touchstart': this._start(event); break;
        		case 'touchmove': this._move(event); break;
        		case 'touchend': this._end(event); break;
        		case checkBrower.transitions.eventType:
        			var target = event.target;
        			var pos = target.getAttribute('data-index');
        			//因为触发两次,屏蔽掉一次
        			if(pos == this.index)
        				this._transitionEnd(event); 
        				this.opts.stopPropagation && event.stopPropagation();
        				break;
        		case 'resize': ; break;
      		}
    	},
    	_start: function(event) {
    		//可以防止第一次触摸时出现抖动,但问题是原生滚动无法执行
    		if(this.opts.preventDefault){ event.preventDefault(); }
      		var touches = event.touches[0];
      		//起始坐标点和时间
      		this.startPos = {
        		x: touches.pageX,
        		y: touches.pageY,
        		time: +new Date
      		};
      		this.isScrolling = undefined;
      		this.delta = {};
      		var self = this;
      		this.wrapperEl.addEventListener('touchmove', this, false);
      		this.wrapperEl.addEventListener('touchend', this, false);
      		this.opts.stopPropagation && event.stopPropagation();
   	 	},
   	 	destroy : function(){
   	 		this.stop();
			this.cloneFirstEl.parentNode.removeChild(this.cloneFirstEl);
			this.cloneFirstEl = null;
			this.cloneSecondEl.parentNode.removeChild(this.cloneSecondEl);
			this.cloneSecondEl = null;
   	 		this.wrapperEl.addEventListener('touchstart', this, false);
   	 	},
    	_move: function(event) {
    		
      		if ( event.touches.length > 1 || event.scale && event.scale !== 1) return
      		var touches = event.touches[0];
      		var index = this.index;
      		//移动距离
      		this.delta = {
        		x: touches.pageX - this.startPos.x,
        		y: touches.pageY - this.startPos.y
      		}
      		var slideX = this.opts.slideX;
      		if(this.isScrolling == undefined){
      			this.isScrolling = (slideX ? Math.abs(this.delta.x) > Math.abs(this.delta.y)
      				: Math.abs(this.delta.x) < Math.abs(this.delta.y))
      		}
      		
      		 
      		if (this.isScrolling) {
        		event.stopPropagation();
        		event.preventDefault();
        		//暂停自动轮播
        		this.stop();
        				
        		if (this.opts.successive) {
          			this.translate(this.circle(this.index-1), (slideX ?  this.delta.x : this.delta.y) + this.slidePos[this.circle(this.index-1)], 0);
          			this.translate(this.index, (slideX ?  this.delta.x : this.delta.y) + this.slidePos[this.index], 0);
          			this.translate(this.circle(this.index+1), (slideX ?  this.delta.x : this.delta.y) + this.slidePos[this.circle(this.index+1)], 0);
        		} else {
        			//非连续时增加反弹阻力
          			this.delta.x = 
            			this.delta.x /
              			( (!index && (slideX ? this.delta.x > 0 : this.delta.y>0   )          
                		|| index == this.slides.length - 1        
                		&& (slideX ? this.delta.x < 0 : this.delta.y<0   )                     
              			) ?
              			(this.opts.isBounds ? ( Math.abs(slideX ? this.delta.x : this.delta.y) / (slideX ? this.width : this.height) + 3 )  : 0)   
             			: 1 );   
             		//因为上面除0可能会变为Infinite;
          			this.delta.x = isFinite(this.delta.x) ? this.delta.x : 0;	
          			this.translate(index-1, (slideX ? this.delta.x : this.delta.y) + this.slidePos[index-1], 0);
          			this.translate(index, (slideX ? this.delta.x : this.delta.y) + this.slidePos[index], 0);
          			this.translate(index+1, (slideX ? this.delta.x : this.delta.y) + this.slidePos[index+1], 0);
        		}
        		
        		this._dragMove(slideX);
        		this.opts.stopPropagation && event.stopPropagation();
      		}
    	},
    	_end: function(event) {
    		var slideX = this.opts.slideX;
    		var speed = this.opts.speed;
    		//alert(300);
    		var index = this.index;
      		var duration = +new Date - this.startPos.time;
      		// 判断是否触发滑动
      		var isValidSlide =
            		Number(duration) < 250               // 如果滑动时间小于 250ms
            		&& Math.abs(slideX ? this.delta.x : this.delta.y) > 20            // 并且距离大于20px
            		|| Math.abs(slideX ? this.delta.x : this.delta.y) > (slideX ? this.width/2 : this.height/2);      // 或者距离大于指定大小
      		// 判断是否边界反弹
      		var isBounds =
            	!this.index && this.delta.x > 0                            // 是第一个并且距离大于0
            	|| index == this.slides.length - 1 && this.delta.x < 0;    	  // 是最后一个并且距离小于0
			//是连续的无需反弹
      		if (this.opts.successive) isBounds = false;
      				
      		if(slideX){
      			this.delta.y = 0;
      		}else{
      			this.delta.x = 0;
      		}
      		// 判断方向 true : left|up ,false : right|down 
      		var direction =  (this.delta.x < 0  || this.delta.y<0);
      		var slideDistance = slideX ? this.width : this.height;
      		if (this.isScrolling) {
        		if (isValidSlide && !isBounds) {
        			
          			if (direction) {
          							
            			if (this.opts.successive) {
             	 			this.move(this.circle(index+2), slideDistance, 0);
            			} else {
              				this.move(index-1, -slideDistance, 0);
            			}
            			this.move(index, this.slidePos[index]-slideDistance, speed);
            			this.move(this.circle(index+1), this.slidePos[this.circle(index+1)]-slideDistance, speed);
            			this.index = this.circle(index+1);
          			} else {
            			if (this.opts.successive) { 
              				this.move(this.circle(index+1), slideDistance, 0);
              				this.move(this.circle(index-2), -slideDistance, 0);
            			} else {
              				this.move(index-2, -slideDistance, 0);
            			}
		
            			this.move(index, this.slidePos[index]+slideDistance, speed);
            			this.move(this.circle(index-1), this.slidePos[this.circle(index-1)]+slideDistance, speed);
            			this.index = this.circle(index-1);
          			}
         			//options.callback && options.callback(index, slides[index]);
        		} else {
        			
        			//还原
          			if (this.opts.successive) {
            			this.move(this.circle(index-1), slideX ? -this.width : -this.height,speed);
            			this.move(this.index, 0, speed);
            			this.move(this.circle(index+1), slideX ? this.width : this.height, speed);
            						
          			} else {
            			this.move(this.index-1, slideX ? -this.width : -this.height, speed);
            			this.move(this.index, 0, speed);
            			this.move(this.index+1, slideX ? this.width : this.height, speed);
          			}
          			this.aniEl = this.slides[index];
          			
        		}
        		if (this.opts.successive) this.begin();
        		this._dragEnd(slideX,isValidSlide);
      		}
      		this.opts.stopPropagation && event.stopPropagation();
      		this.wrapperEl.removeEventListener('touchmove', this, false)
      		this.wrapperEl.removeEventListener('touchend', this, false)
    	},
    	/*_animate : function(){
    		var pos = getComputedPosition(this.aniEl);
    		
    		rAF(this.step);
    	},*/
    	//拖动结束时触发"dragEnd"事件,用于做联动
    	_dragEnd : function(slideX,isValidSlide){
    		var direction = slideX ? (this.delta.x < 0 ? "slideLeft" : "slideRight") 
    		 		: (this.delta.y < 0 ? "slideUp" : "slideDown");
    		var data={
    			index : this.index,
    			isValidSlide : isValidSlide,
    			direction    : direction
    		};
    		this.trigger(this.container,'dragEnd',{data : data});
    	},
    	//拖动时触发"dragMove"事件,data中会包含相关数据,用于做联动
    	_dragMove : function(slideX){ 
    		var size = slideX ? this.width : this.height,
    			moveDist = slideX ? this.delta.x : this.delta.y,
    		 	index = this.index,
    		 	direction = slideX ? (this.delta.x < 0 ? "slideLeft" : "slideRight") 
    		 		: (this.delta.y < 0 ? "slideUp" : "slideDown"),
    		 	data = {
    				width : this.width,
    				height : this.height,
    				moveDist : moveDist,
    				index : index,
    				direction : direction
    			}
    		 	
    		this.trigger(this.container,'dragMove',{data : data});
    	},
    	//自动轮播时触发"slideStart"事件
    	_slideStart: function(index) {
    		var data = {
    			index : index-1
    		}
      		this.trigger(this.container,'slideStart',{data : data});
    	},
    	//过渡结束时触发"slideEnd"事件
    	_transitionEnd: function(callback) {
      		this.trigger(this.container,'slideEnd',{},this.opts.transitionEnd);
    	},
    	trigger : function(el,eventType,eventData,callback){
    		var data = {};
    		if(eventData.data){
    			data = eventData.data;
    			delete eventData.data;
    		}
			var evt = new CustomEvent(eventType,{
					detail: eventData,
					bubbles: true,
					cancelable: true
				});
			evt.data = data;
			var self = this;
			setTimeout(function(){
				el.dispatchEvent(evt);
				if(typeof callback === 'function') callback.call(self,evt);
			},0)
		},
	};
	window.Swipe = Swipe;
})();
/*
 * 滑动块指示器
 */
(function(win){
	var extractColorRegExp = /.*rgb\((\d+) *, *(\d+) *, *(\d+)\).*/;
	function SliderIndicator(container,options){
		if(!container){
			return ;
		}
		var opts = {
			isCenter : true,
		}
		
		var options = options || {};
		for(var key in options){
			opts[key] = options[key];
		}
		this.swipe = opts.swipe;
		this.container = container;
		if(this.swipe){
			this.init();
		}
	}
	SliderIndicator.prototype = {
		init : function(){
			this.indicators = this.container.children;
			var activeBgColor = this.container.getAttribute('data-bg-color');
			var el = document.createElement('div');
			el.style.background = '#'+activeBgColor;
			
			document.body.appendChild(el);
			var activeRgbColor = this.getRgbColor(el,'background');
			this.activeRgbColor = activeRgbColor;
			document.body.removeChild(el);
			this.defaultRgbColor = this.getRgbColor(this.container.firstElementChild,'background');
			this.preIndex = this.swipe.index;
			this.setColor(this.preIndex,activeRgbColor);
			if(this.indicators.length<2){
				return;
			}
			this.swipe.container.addEventListener('slideEnd',this);
			this.swipe.container.addEventListener('dragMove',this);
			this.swipe.container.addEventListener('dragEnd',this);
			this.swipe.container.addEventListener('slideStart',this);
		},
		destroy : function(){
			this.swipe.container.removeEventListener('slideEnd',this);
			this.swipe.container.removeEventListener('dragMove',this);
			this.swipe.container.removeEventListener('dragEnd',this);
			this.swipe.container.removeEventListener('slideStart',this);
			var len = this.indicators.length
			for(var i=0;i<len;i++){
				this.setColor(i,this.defaultRgbColor);
			}
			this.swipe = null;
		},
		setColor : function(index,color){
			var style = this.indicators[index].style;
			//style.cssText += "background:rgb("+color.a+","+color.b+","+color.c+");-webkit-box-shadow:"+
			//	"0 0 1px 1px rgba("+color.a+","+color.b+","+color.c+",.7);box-shadow:0 0 1px 1px rgba("+color.a+","+color.b+","+color.c+",.7);";
			style.cssText += "background:rgb("+color.a+","+color.b+","+color.c+");";
		},
		handleEvent : function(e){
			switch(e.type){
				case "slideEnd" : this.handleSlideEnd(e);break;
				case "dragMove" : this.handleDragMove(e);break;
				case "dragEnd" : this.handleDragEnd(e);break;
				case "slideStart" : this.handleDragEnd(e);break;
			}
		},
		circle : function(index) {
			
    		return (this.indicators.length + (index % this.indicators.length)) % this.indicators.length;
  		},
  		handleDragEnd : function(e){
  			var data = e.data;
  			var direction = data.direction;
  			
  			var index = this.circle(data.index);
  			
  			var prevIndex ;
  			
  			if(data.isValidSlide){
  				if(direction =='slideLeft'){
  					prevIndex = this.circle(index-1);
  				}else{
  					prevIndex = this.circle(index+1);
  				}
  			}else{
  				if(direction =='slideLeft'){
  					prevIndex = this.circle(index+1);
  				}else{
  					prevIndex = this.circle(index-1);
  				}
  			}
  			
  			/*if(this.indicators.length == 2){
  				index = this.activeIndex === 0 ? 1 : 0;
  				prevIndex = this.activeIndex;
  				this.activeIndex = index;
  				console.log(prevIndex+'  '+index);
  			}
  			*/
  			var nextEl=this.indicators[index];
  			var indexEl=this.indicators[prevIndex];
  			this.transitionDuration(index,this.swipe.opts.speed);
  			this.transitionDuration(prevIndex,this.swipe.opts.speed);
  			if(data.isValidSlide){
  				this.setColor(index,this.activeRgbColor);
  				this.setColor(prevIndex,this.defaultRgbColor);
  			}else{
  				this.setColor(index,this.activeRgbColor);
  				this.setColor(prevIndex,this.defaultRgbColor);
  			}
  		},
  		transitionDuration : function(index,time){
  			var el = this.indicators[index];
  			var style = el.style;
  			style.webkitTransitionDuration =
    		style.MozTransitionDuration =
    		style.msTransitionDuration =
    		style.OTransitionDuration =
   	 		style.transitionDuration = time === null ? null : time + 'ms';
  		},
		handleDragMove : function(e){
			var data = e.data;
			var direction = data.direction;
			var index = this.circle(data.index);
			
			var nextIndex ;
			if(direction == 'slideLeft'){
				nextIndex = this.circle(index+1);
			}else{
				nextIndex = this.circle(index-1);
			}
			/*if(this.indicators.length == 2){
  				nextIndex = this.activeIndex === 0 ? 1 : 0;
  				index = this.activeIndex;
  			}*/
			var moveRate = Math.abs(data.moveDist/data.width);
			var color = {};
			this.transitionDuration(index,null);
  			this.transitionDuration(nextIndex,null);
			var defaultRgbColor = this.defaultRgbColor;
			var activeRgbColor = this.activeRgbColor;
			color.a = Math.round(defaultRgbColor.a+(activeRgbColor.a - defaultRgbColor.a)*moveRate);
			color.b = Math.round(defaultRgbColor.b+(activeRgbColor.b - defaultRgbColor.b)*moveRate);
			color.c = Math.round(defaultRgbColor.c+(activeRgbColor.c - defaultRgbColor.c)*moveRate);
			
			this.setColor(nextIndex,color);
			color.a = Math.round(activeRgbColor.a-(activeRgbColor.a - defaultRgbColor.a)*moveRate);
			color.b = Math.round(activeRgbColor.b-(activeRgbColor.b - defaultRgbColor.b)*moveRate);
			color.c = Math.round(activeRgbColor.c-(activeRgbColor.c - defaultRgbColor.c)*moveRate);
			this.setColor(index,color);
			
		},
		handleSlideStart : function(e){
			alert();
			var index = this.circle(this.swipe.index);
			this.transitionDuration(index,this.swipe.opts.speed);
			if(this.preIndex !== index){
				this.setColor(this.preIndex,this.defaultRgbColor);
				this.preIndex = index;
			}
			this.setColor(index,this.activeRgbColor);
			
		},
		handleSlideEnd : function(e){
			
		},
		setSwipe : function(swipe){
			this.swipe = swipe;
			if(this.swipe){
				this.init();
			}
		},
		getRgbColor : function(el,type){
			var style = getComputedStyle(el,null);
			var sVal = style[type];
			//console.log(sVal);
			var matches = extractColorRegExp.exec(sVal);
			if(!matches){
				throw new Error('Background color value is error!');
			}
			return {
				a : +matches[1],
				b : +matches[2],
				c : +matches[3],
			}
		}
	}
	win.SliderIndicator = SliderIndicator;
})(window);
