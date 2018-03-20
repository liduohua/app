
(function(root, factory) {
	//AMD
	if (typeof define === 'function' && define.amd)  {
		define(['exports'], function(exports) {
			exports.TableScroll = root.Switch = factory();
		});
		//Node.js
	} else if (typeof exports !== 'undefined') {
		exports.TableScroll = factory( );
		//Browser
	} else {
		root.TableScroll = factory();
	}
})(this, function() {
	'use strict';
		var IScroll = require('./iscroll-probe').IScroll;
		function addEvent(el,type,fn,capture){
			el.addEventListener(type,fn,!!capture);
		}
		function removeEvent(el,type,fn,capture){
			el.removeEventListener(type,fn,!!capture);
		}
		var tableCount = 1;
		function TableScroll(el,widths){
			if(el.tableCount>0){
				return ;
			}
			this.options = {
				scrollTitleSelector : '.scroll-table-title-right',
				scrollContentSelector  : '.scroll-table-content-right',
				tableContent : '.scroll-table-content',
				widths : widths || [110,110,110,110]
			}
			reLayout(el,this.options.widths,el.querySelector(this.options.tableContent),el.querySelector(this.options.scrollContentSelector));
			this.titleScroll = new IScroll(el.querySelector(this.options.scrollTitleSelector),{
				scrollY: false,
				probeType: 3,
				scrollX: true
			});
			
			this.contentScroll  = new IScroll(el.querySelector(this.options.scrollContentSelector),{
				scrollY: false,
				probeType: 3,
				scrollX: true
			});
			this.on();
			TableContentScroll(el);
			el.tableCount=tableCount;
			el.setAttribute('data-tabel-count',tableCount);
			tableCount++;
			this.el = el;
		}
		function reLayout(el,widths,tableContentEl ,scrollContentEl){
			el.classList.add('column-width-custom-'+tableCount);
			var totalWidth = tableContentEl.offsetWidth;
			var l = widths.length;
			var customTotalWidth = 0;
			widths.forEach(function(width){
				customTotalWidth+=width;
			});
			console.log(customTotalWidth);
			if(customTotalWidth<totalWidth){
				var diff = (totalWidth - customTotalWidth)/l;
				widths = widths.map(function(width){
					return width + diff;
				}) 
			}else{
				
				scrollContentEl.querySelector('table').style.cssText += 'width:'+(customTotalWidth-widths[0])+'px';
			
				el.querySelector('.scroll-table-title-right table').style.cssText += 'width:'+(customTotalWidth-widths[0])+'px';

			}
			var css = '.scroll-table.column-width-custom-'+tableCount+' .scroll-table-title-right,\
						.scroll-table.column-width-custom-'+tableCount+' .scroll-table-title-right{\
							left:'+widths[0]+'px;\
						}\
						.scroll-table.column-width-custom-'+tableCount+' .scroll-table-title-left,\
						.scroll-table.column-width-custom-'+tableCount+' .scroll-table-content-left{\
							width:'+widths[0]+'px;\
						}'
			css += '.scroll-table.column-width-custom-'+tableCount+' .scroll-table-title-left td,\
					.scroll-table.column-width-custom-'+tableCount+' .scroll-table-content-left td{\
						width:'+widths[0]+'px;\
					}';
			widths.shift();
			widths.forEach(function(width,idx){
				idx++;
				css += '.scroll-table.column-width-custom-'+tableCount+' .scroll-table-title-right td:nth-child('+idx+'),\
						.scroll-table.column-width-custom-'+tableCount+' .scroll-table-content-right td:nth-child('+idx+'){\
					     	width:'+width+'px;\
						}';
			});
			var style = document.createElement('style');
			style.textContent = css;
			document.head.appendChild(style);
			
			var lw =  tableContentEl.querySelector('.scroll-table-content-left').offsetWidth;
			scrollContentEl.style.width =  totalWidth-lw+'px';
		}
		function TableContentScroll(el){
			var startX,startY, moved;
			var tableContent = el.querySelector('.scroll-table-content');
			initEvent();
			function initEvent(){
				addEvent(tableContent,'touchstart',handleStartEvent);
				addEvent(tableContent,'touchmove',handleMoveEvent);
			}
			function handleStartEvent(e){
				var point = e.touches ? e.touches[0] : e;
				startX = point.pageX;
				startY = point.pageY;
				moved = null;
			}
			function handleMoveEvent(e){
				if(moved !== null){
					if(moved === false){
						e.preventDefault();
					}
					return;
				}
				var point = e.touches ? e.touches[0] : e;
				if(Math.abs(point.pageX - startX) >= Math.abs(point.pageY - startY)){
					e.preventDefault();
					moved = false;
				}else{
					moved = true;
				}
			}
		}
		TableScroll.prototype.on = function(){
			this.contentScroll.on('scroll', this.updatePosition(this.titleScroll));
			this.contentScroll.on('scrollEnd', this.updatePosition(this.titleScroll));
			this.titleScroll.on('scroll', this.updatePosition(this.contentScroll));
			this.titleScroll.on('scrollEnd', this.updatePosition(this.contentScroll));
		};
		TableScroll.prototype.updatePosition = function(updateScroll){
			return function(){
				updateScroll.x = this.x;
				var cssStr = 'transform: translate('+( this.x)+'px, 0px) translateZ(0px)';
				updateScroll.scroller.style.cssText += cssStr;
			}
		};
		//当高度不一致时对其高度,在添加新数据时调用这个方法
		TableScroll.prototype.alignHeight = function(){
			var leftTabletrs = this.el.querySelectorAll('.scroll-table-content-left tr');
			var rightTableTrs = this.el.querySelectorAll('.scroll-table-content-right tr');
			var len = leftTabletrs.length;
			var leftHeight ,rightHeight;
			for(var i =0;i<len;i++){
				leftHeight = leftTabletrs[i].offsetHeight;
				rightHeight = rightTableTrs[i].offsetHeight;
				if(leftHeight > rightHeight){
					rightTableTrs[i].style.cssText +="height:"+leftHeight + 'px';
					leftTabletrs[i].style.cssText +="height:"+leftHeight + 'px';
				}else if(leftHeight < rightHeight){
					leftTabletrs[i].style.cssText +="height:"+rightHeight + 'px';
					rightTableTrs[i].style.cssText +="height:"+rightHeight + 'px';
				}
			}
			
		};
	return TableScroll;
});