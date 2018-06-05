//通用的选择器应该尽量简单，联动选择的功能不应该在这里实现
export class Picker{
	constructor(params) {
        var defaults = {
          	updateValuesOnMomentum: false,
          	updateValuesOnTouchmove: false,
         	rotateEffect: false,
          	momentumRatio: 7,
          	freeMode: false,
          	// Common settings
         	scrollToInput: true,
          	inputReadOnly: true,
          	convertToPopover: true,
          	onlyInPopover: false,
          	container : document.body,
          	onChange : function(){},
         	//cols : [],
          	input : null,
          	toolbar: true,
          	toolbarCloseText: 'OK',
          	toolbarTemplate: '<header class="picker-bar">\
          		<h1 class="picker-bar-title">日期选择器</h1>\
          		<button class="pull-left picker-bar-button-cancel">取消</button>\
          		<button class="pull-right picker-bar-button-ok">确认</button>\
          		</header>',
      	};
       	params = params || {};
      	for (var def in defaults) {
          	if (typeof params[def] === 'undefined') {
              	params[def] = defaults[def];
          	}
      	}
      	this.params = params;
     	this.cols = [];
      	this.initialized = false;
      
      	// Inline flag
      	this.inline = this.params.container ? true : false;

      	// 3D Transforms origin bug, only on safari
      	//var originBug = $.device.ios || (navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && navigator.userAgent.toLowerCase().indexOf('chrome') < 0) && !$.device.android;

      	// Should be converted to popover
      	
      	if(this.params.input){
      		this.setInput(this.params.input);
      	}
      	if(!this.params.cols)
      		return;
      	this.open();
	}
	columnHTML(col, onlyItems) {
        var columnItemsHTML = '';
        var columnHTML = '';
        if (col.divider) {
            columnHTML += '<div class="picker-items-col picker-items-col-divider ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '">' + col.content + '</div>';
        }
        else {
            for (var j = 0; j < col.values.length; j++) {
                columnItemsHTML += '<div class="picker-item" data-picker-value="' + col.values[j] + '">' + (col.displayValues ? col.displayValues[j] : col.values[j]) + '</div>';
            }
            columnHTML += '<div class="picker-items-col ' + (col.textAlign ? 'picker-items-col-' + col.textAlign : '') + ' ' + (col.cssClass || '') + '"><div class="picker-items-col-wrapper">' + columnItemsHTML + '</div></div>';
        }
        return onlyItems ? columnItemsHTML : columnHTML;
	}
	layout() {
	
		var pickerHTML = '';
        var pickerClass = '';
        var i;
        this.cols = [];
        var colsHTML = '';
        for (i = 0; i < this.params.cols.length; i++) {
            var col = this.params.cols[i];
            colsHTML += this.columnHTML(this.params.cols[i]);
            this.cols.push(col);
        }
        pickerClass = 'picker-modal picker-columns ' + (this.params.cssClass || '') + (this.params.rotateEffect ? ' picker-3d' : '');
        pickerHTML =
            '<div class="' + (pickerClass) + '">' +
                (this.params.toolbar ? this.params.toolbarTemplate.replace(/{{closeText}}/g, this.params.toolbarCloseText) : '') +
                '<div class="picker-modal-inner picker-items">' +
                    colsHTML +
                    '<div class="picker-center-highlight"></div>' +
                '</div>' +
            '</div>';
              
        this.pickerHTML = pickerHTML;    
	}
	open() {
		
		this.layout();
		//console.log(this.pickerHTML);
		var picker = document.createElement('div');
		
		picker.className = 'picker';
		picker.innerHTML = '<div class="modal-overlay modal-overlay-visible"></div>'+this.pickerHTML;
		this.params.container.appendChild(picker);
		this.picker = picker;
		this.pickerCols = [];
		
			[].slice.call(picker.querySelectorAll('.picker-items-col')).forEach((colElement,index)=>{
				this.pickerCols.push(new PickerCol(colElement,index, true,this));
			});
		
		this.initEvents();
		
         // var toPopover = isPopover();

         /* if (!p.opened) {

              // Layout
              p.layout();

              // Append
              if (toPopover) {
                  p.pickerHTML = '<div class="popover popover-picker-columns"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
                  p.popover = $.popover(p.pickerHTML, p.params.input, true);
                  p.container = $(p.popover).find('.picker-modal');
                  $(p.popover).on('close', function () {
                      onPickerClose();
                  });
              }
              else if (p.inline) {
                  p.container = $(p.pickerHTML);
                  p.container.addClass('picker-modal-inline');
                  $(p.params.container).append(p.container);
              }
              else {
                  p.container = $($.pickerModal(p.pickerHTML));
                  $(p.container)
                  .on('close', function () {
                      onPickerClose();
                  });
              }

              // Store picker instance
              p.container[0].f7Picker = p;

              // Init Events
              p.container.find('.picker-items-col').each(function () {
                  var updateItems = true;
                  if ((!p.initialized && p.params.value) || (p.initialized && p.value)) updateItems = false;
                  p.initPickerCol(this, updateItems);
              });
              
              // Set value
              if (!p.initialized) {
                  if (p.params.value) {
                      p.setValue(p.params.value, 0);
                  }
              }
              else {
                  if (p.value) p.setValue(p.value, 0);
              }
          }
*/
        // Set flag
        this.opened = true;
        this.initialized = true;
        //选择器显示
        if (this.params.onOpen) this.params.onOpen(this);
	}
	destroy() {
		this.pickerCols.forEach(function(pickerCol){
			pickerCol.destroy();
		});
	}
	setInput(input) {
		if(this.inputReadOnly){
			input.setAttribute(readOnly,true);
			input.addEventListener('click',function(e){
				//修复部分安卓系统和ios下，即使设置了readonly依然会弹出系统键盘的bug
                this.focus();
               	this.blur();
			});
		}
		
	}
	initEvents(remove){
		let eventType = remove ? removeEvent : addEvent;
		eventType(this.picker,'click',this);
	}
	handleEvent(e) {
		switch(e.type){
			case "click":
				this.handleClick(e);
				break;
		}
	}
	close() {
		this.destroy();
		this.picker.parentNode.removeChild(this.picker);
	}
	handleClick(e) {
		let classList = e.target.classList;
		if(classList.contains('modal-overlay') || 
			classList.contains('picker-bar-button-cancel') || 
			classList.contains('picker-bar-button-ok')){
			this.close();
			if(classList.contains('picker-bar-button-ok')){
				let result = [];
				for(let i=0;i<this.pickerCols.length;i++){
					result.push({
						value : this.pickerCols[i].col.value,
						displayValue : this.pickerCols[i].col.displayValue,
					})
				}
				this.params.ok(result);
			}else{
				this.params.cancel();
			}
		}
		
	}
	updateValue() {
		return;
        var newValue = [];
        var newDisplayValue = [];
        for (var i = 0; i < this.cols.length; i++) {
            if (!this.cols[i].divider) {
                newValue.push(p.cols[i].value);
                newDisplayValue.push(p.cols[i].displayValue);
            }
        }
        if (newValue.indexOf(undefined) >= 0) {
            return;
        }
        this.value = newValue;
        this.displayValue = newDisplayValue;
        if (this.params.onChange) {
            this.params.onChange(this, this.value, this.displayValue);
        }
        if (this.input && this.input.length > 0) {
        	//对输入框赋值
            //$(p.input).val(p.params.formatValue ? p.params.formatValue(p, p.value, p.displayValue) : p.value.join(' '));
           // $(p.input).trigger('change');
        }
    }
	// Value
    setValue(arrValues, transition) {
        var valueIndex = 0;
        console.log(arrValues);
        for (var i = 0; i < this.pickerCols.length; i++) {
            if (this.pickerCols[i] && !this.pickerCols[i].divider) {
                this.pickerCols[i].setValue(arrValues[valueIndex], transition);
                valueIndex++;
            }
        }
    }
    setData(cols){
    	
    }
}

function getTouchPosition(e) {
        var point = e.touches ? e.touches[0] : e;
        return {
            x: point.pageX,
            y: point.pageY
        }
    }

    function getComputedPosition(el) {
        var matrix = window.getComputedStyle(el, null),
            x, y;

        if (useTransform) {
            matrix = matrix[useTransform].split(')')[0].split(', ');
            x = +(matrix[12] || matrix[4]);
            y = +(matrix[13] || matrix[5]);
        }

        return { x: x || 0, y: y || 0 };
    }
    
function transition(el, duration) {
        if (duration == undefined) {
            duration = null;
        } else {
            duration += 'ms';
        }
        var elStyle = el.style;
        elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
        elStyle.webkitTransitionTimingFunction = elStyle.MsTransitionTimingFunction =
            elStyle.msTransitionTimingFunction = elStyle.MozTransitionTimingFunction =
            elStyle.OTransitionTimingFunction = elStyle.transitionTimingFunction = 'cubic-bezier(0.1, 0.57, 0.1, 1)';
    }
    var useTransform = (function(el) {
        var transforms = ['transform', 'webkitTransform', 'MozTransform', 'msTransform', 'OTransform'];
        for (var i in transforms)
            if (el.style[transforms[i]] !== undefined)
                return transforms[i];
        return false;
    })(document.createElement('div'));

    function transform(el, transform) {
        var elStyle = el.style;
        elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
    }
    function addEvent(el, type, fn, capture) {
            el.addEventListener(type, fn, !!capture);
   	}
    function removeEvent(el, type, fn, capture) {
            el.removeEventListener(type, fn, !!capture);
    }
class PickerCol{
	constructor(colContainer,colIndex, updateItems,p) {
		
		this.p = p;
        var col = p.cols[colIndex];
       
        if (col.divider) return;
        col.container = colContainer;
        col.wrapper = col.container.querySelector('.picker-items-col-wrapper');
        col.items = col.wrapper.querySelectorAll('.picker-item');
        this.col = col; 
        var i, j;
        //var wrapperHeight, itemHeight, itemsHeight, minTranslate, maxTranslate;
        this.wrapperHeight = null;
        this.itemHeight = null;
        this.itemsHeight = null;
        this.minTranslate = null;
        this.maxTranslate = null;
        this.calcSize();
        col.wrapper.style.cssText = 'transform:translate3d(0,' + this.maxTranslate + 'px,0);transition:0';
       
       
		
        var activeIndex = 0 ,index;
        var animationFrameId;
        
        
        // Update items on init
       
      	/*if((index = col.values.indexOf(col.value)) > -1){
      		activeIndex = index;
      	}else if((index = col.values.indexOf(col.displayValue)) > -1 ){
      		activeIndex = index;
      	}*/
        
          //if (updateItems) this.updateItems(activeIndex, this.maxTranslate, 0);
          
		this.setValue(col.value,0);
		 
          var allowItemClick = true;
          var isTouched, isMoved, touchStartY, touchCurrentY, touchStartTime, touchEndTime, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;
		
		this.isTouched = null;
		this.isMoved = null;
		this.touchStartY = null;
		this.touchCurrentY = null;
		this.initEvents();
		
	}
	
	initEvents(remove) {
		let eventType = remove ? removeEvent : addEvent;
		eventType(this.col.container,'touchstart',this);
		eventType(this.col.container,'touchmove',this);
		eventType(this.col.container,'touchend',this);
		eventType(this.col.container,'click',this);
	}
	handleEvent(e) {
		switch(e.type){
			case 'touchstart': 
				this.handleTouchStart(e);
				break;
			case 'touchmove':
				this.handleTouchMove(e);
				break;
			case 'touchend': 
				this.handleTouchEnd(e);
				break;
			case 'click':
				break;
		}
	}
	destroy(){
		this.initEvents(true);
	}
	handleTouchStart(e) {
        if (this.isMoved || this.isTouched) return;
        e.preventDefault();
        this.isTouched = true;
        var position = getTouchPosition(e);
        this.touchStartY = this.touchCurrentY = position.y;
        this.touchStartTime = (new Date()).getTime();
              
        this.allowItemClick = true;
        this.startTranslate = this.currentTranslate = getComputedPosition(this.col.wrapper).y;
    }
    handleTouchMove(e) {
        if (!this.isTouched) return;
        e.preventDefault();
        this.allowItemClick = false;
        var position = getTouchPosition(e);
        this.touchCurrentY = position.y;
        if (!this.isMoved) {
            // First move
            //$.cancelAnimationFrame(animationFrameId);
            this.isMoved = true;
            this.startTranslate = this.currentTranslate = getComputedPosition(this.col.wrapper).y;
            transition(this.col.wrapper,'0');
        }
        e.preventDefault();

        var diff = this.touchCurrentY - this.touchStartY;
        this.currentTranslate = this.startTranslate + diff;
        this.returnTo = undefined;

        // Normalize translate
        if (this.currentTranslate < this.minTranslate) {
            this.currentTranslate = this.minTranslate - Math.pow(this.minTranslate - this.currentTranslate, 0.8);
            this.returnTo = 'min';
        }
        if (this.currentTranslate > this.maxTranslate) {
            this.currentTranslate = this.maxTranslate + Math.pow(this.currentTranslate - this.maxTranslate, 0.8);
            this.returnTo = 'max';
        }
        // Transform wrapper
        transform(this.col.wrapper,'translate3d(0,' + this.currentTranslate + 'px,0)');

        // Update items
        this.updateItems(undefined, this.currentTranslate, 0, this.p.params.updateValuesOnTouchmove);
              
        // Calc velocity
        this.velocityTranslate = this.currentTranslate - this.prevTranslate || this.currentTranslate;
        this.velocityTime = (new Date()).getTime();
        this.prevTranslate = this.currentTranslate;
        
    }
    handleTouchEnd(e) {
        if (!this.isTouched || !this.isMoved) {
            this.isTouched = this.isMoved = false;
            return;
        }
        this.isTouched = this.isMoved = false;
        transition(this.col.wrapper,'300');
        if (this.returnTo) {
            if (this.returnTo === 'min') {
                transform(this.col.wrapper,'translate3d(0,' + this.minTranslate + 'px,0)');
            }
            else transform(this.col.wrapper,'translate3d(0,' + this.maxTranslate + 'px,0)');
        }
        this.touchEndTime = new Date().getTime();
        var velocity, newTranslate;
        if (this.touchEndTime - this.touchStartTime > 300) {
        	
            newTranslate = this.currentTranslate;
            
        }
        else {
            velocity = Math.abs(this.velocityTranslate / (this.touchEndTime - this.velocityTime));
            newTranslate = this.currentTranslate + this.velocityTranslate * this.p.params.momentumRatio;
        }
		
        newTranslate = Math.max(Math.min(newTranslate, this.maxTranslate), this.minTranslate);
		
        // Active Index
        var activeIndex = -Math.round((newTranslate - this.maxTranslate)/this.itemHeight);
		
        // Normalize translate
        if (!this.p.params.freeMode) newTranslate = -activeIndex * this.itemHeight + this.maxTranslate;

        // Transform wrapper
        transform(this.col.wrapper,'translate3d(0,' + (parseInt(newTranslate,10)) + 'px,0)');

        // Update items
        this.updateItems(activeIndex, newTranslate, '', true);

        // Watch items
        if (this.p.params.updateValuesOnMomentum) {
            updateDuringScroll();
            col.wrapper.transitionEnd(function(){
                $.cancelAnimationFrame(animationFrameId);
            });
        }

        // Allow click
        var self = this;
        setTimeout(function () {
            self.allowItemClick = true;
        }, 100);
    }
	calcSize() {
		let col = this.col;
		if (this.p.params.rotateEffect) {
            col.container.removeClass('picker-items-col-absolute');
            if (!col.width) col.container.css({width:''});
        }
        var colWidth, colHeight;
        colWidth = 0;
        colHeight = col.container.offsetHeight;
        this.wrapperHeight = col.wrapper.offsetHeight;
        this.itemHeight = col.items[0].offsetHeight;
        
        this.itemsHeight = this.itemHeight * col.items.length;
        this.minTranslate = colHeight / 2 - this.itemsHeight + this.itemHeight / 2;
        this.maxTranslate = colHeight / 2 - this.itemHeight / 2;    
        
        if (col.width) {
            colWidth = col.width;
            col.container.style.width = colWidth;
        }
        if (this.p.params.rotateEffect) {
            if (!col.width) {
                col.items.each(function () {
                    var item = $(this);
                    item.css({width:'auto'});
                    colWidth = Math.max(colWidth, item[0].offsetWidth);
                    item.css({width:''});
                });
            	col.container.css({width: (colWidth + 2) + 'px'});
        	}
        	col.container.addClass('picker-items-col-absolute');
        }
	}
	//替换列里面的值
	replaceValues(values, displayValues) {
        //col.destroyEvents();
        this.col.values = values;
        this.col.displayValues = displayValues;
        var newItemsHTML = this.p.columnHTML(this.col, true);
        this.col.wrapper.innerHTML = newItemsHTML;
        this.col.items = this.col.wrapper.querySelectorAll('.picker-item');
        
        this.calcSize();
       
        this.setValue(this.col.values[0], 0, false);
        //col.initEvents();    
    }
          
    // Set Value Function
    setValue(newValue, transition, valueCallbacks) {

        if (typeof transition === 'undefined') transition = '';
        var newActiveIndex = this.col.values.indexOf(newValue);
        if(typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
            return;
        }
        var newTranslate = -newActiveIndex * this.itemHeight + this.maxTranslate;
       
        // Update wrapper
        //col.wrapper.transition(transition);
        transform(this.col.wrapper,'translate3d(0,' + (newTranslate) + 'px,0)');
                  
        // Watch items
        /*if (p.params.updateValuesOnMomentum && col.activeIndex && col.activeIndex !== newActiveIndex ) {
            $.cancelAnimationFrame(animationFrameId);
            col.wrapper.transitionEnd(function(){
                $.cancelAnimationFrame(animationFrameId);
            });
            updateDuringScroll();
        }*/

        // Update items
        this.updateItems(newActiveIndex, newTranslate, transition,false);
    }

    updateItems(activeIndex, translate, transition, valueCallbacks) {
        /*if (typeof translate === 'undefined') {
            translate = $.getTranslate(col.wrapper[0], 'y');
        }*/
        if(typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - this.maxTranslate)/this.itemHeight);
        if (activeIndex < 0) activeIndex = 0;
        if (activeIndex >= this.col.items.length) activeIndex = this.col.items.length - 1;
        var previousActiveIndex = this.activeIndex;
      
        this.activeIndex = activeIndex;
        var previousActiveItem ;
        if(previousActiveItem = this.col.items[previousActiveIndex]){
        	previousActiveItem.classList.remove('picker-selected');
        }
        //this.col.wrapper.querySelectorAll('.picker-selected, .picker-after-selected, .picker-before-selected')
        //.removeClass('picker-selected picker-after-selected picker-before-selected');

        //col.items.transition(transition);
        var selectedItem = this.col.items[activeIndex];
        selectedItem.style.cssText = 'transition:0ms';
        selectedItem.classList.add('picker-selected');
        if(activeIndex - 1 >-1){
        	//var prevItems = selectedItem.prevAll().addClass('picker-before-selected');
        }
        if(activeIndex + 1 < this.col.items.length){
        	//var nextItems = selectedItem.nextAll().addClass('picker-after-selected');
        }
        
              
        //去掉 .picker-after-selected, .picker-before-selected 以提高性能
        //col.wrapper.find('.picker-selected').removeClass('picker-selected');
        if (this.p.params.rotateEffect) {
            col.items.transition(transition);
        }
        
 this.col.value = this.col.values[activeIndex];//selectedItem.getAttribute('data-picker-value');
            this.col.displayValue = this.col.displayValues ? this.col.displayValues[activeIndex] : this.col.value;
        if (valueCallbacks || typeof valueCallbacks === 'undefined') {
            // Update values
            
           
            
            
            // On change callback
          	//
            //if (previousActiveIndex !== activeIndex) {
            	
                if (this.p.params.onChange) {
                	//值改变了
                    this.p.params.onChange(this, this.col.value, this.col.displayValue);
                }
                this.p.updateValue();
          	//}
        }
                  
        // Set 3D rotate effect
        if (!this.p.params.rotateEffect) {
            return;
        }
        var percentage = (translate - (Math.floor((translate - maxTranslate)/itemHeight) * itemHeight + maxTranslate)) / itemHeight;
              
        col.items.each(function () { 
            var item = $(this);
            var itemOffsetTop = item.index() * itemHeight;
            var translateOffset = maxTranslate - translate;
            var itemOffset = itemOffsetTop - translateOffset;
            var percentage = itemOffset / itemHeight;

            var itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;
                  
            var angle = (-18*percentage);
            if (angle > 180) angle = 180;
                if (angle < -180) angle = -180;
                // Far class
                if (Math.abs(percentage) > itemsFit) item.addClass('picker-item-far');
                else item.removeClass('picker-item-far');
                // Set transform
                item.transform('translate3d(0, ' + (-translate + maxTranslate) + 'px, ' + (originBug ? -80 : 0) + 'px) rotateX(' + angle + 'deg)');
        });
    }
}



export class DatePicker extends Picker{
	constructor(params) {
		let defaults = {
			beginYear : '',
			endYear : '',
			input : null,
			displayValue : '',
			value : ''
		}
		params = params || {};
      	for (var def in defaults) {
          	if (typeof params[def] === 'undefined') {
              	params[def] = defaults[def];
          	}
      	}
      	params.onChange = (pickerCol, value, displayValue) => {
      		this.onChange(pickerCol, value, displayValue);
      	}
		super(params);
		if(!this.params.value){
			let d = new Date();
			this.currYear = d.getFullYear();
			this.currMonth = this.padStart(d.getMonth() + 1);
			this.currDay = this.padStart(d.getDate());
		
		}else{
			/(\d{4})-(\d{2})-(\d{2})/.test(this.params.value);
			this.currYear = RegExp.$1;
			this.currMonth = RegExp.$2;
			this.currDay = RegExp.$3;
			
		}

		this.params.cols = [this.getYears(),this.getMonths(),this.getDays()];
		this.open();
	}
	onChange(pickerCol, value, displayValue) {
		let index = this.pickerCols.indexOf(pickerCol);
		//年有变化
		if(index == 0){
			this.currYear = this.pickerCols[0].col.value;
			let months = this.getMonths();
			this.currMonth = months.values[0];
			this.pickerCols[1].replaceValues(months.values,months.displayValues);
			let days = this.getDays();
			this.currDay = days.values[0];
			this.pickerCols[2].replaceValues(days.values,days.displayValues);
		}
		//月有变化
		if(index == 1){
			this.currYear = this.pickerCols[0].col.value;
			this.currMonth = this.pickerCols[1].col.value;
			let days = this.getDays();
			this.currDay = days.values[0];
			this.pickerCols[index+1].replaceValues(days.values,days.displayValues);
		}
		/*if(index == 2){
			//let days = this.getDays();
			//this.replaceValues(days.values,days.displayValues);
		}*/
	}
	getYears(){
		let yArray = [];
		let beginYear,endYear;
		if(this.params.beginYear){
			beginYear = +this.params.beginYear;
		}else{
			beginYear = this.currYear - 50;
		}
		if(this.params.endYear){
			endYear = +this.params.endYear;
		}else{
			endYear = +this.currYear + 50;
		}

		for(let i=beginYear;i<endYear;i++){
			yArray.push(i + '');
		}
		return {
			values : yArray,
			displayValues : yArray,
			value : this.currYear + '',
			width : '20%',
			textAlign : 'center'
		}
	}
	getMonths(){
		let mArray = [];
		for(let i=1;i<=12;i++){
			mArray.push(this.padStart(i));
		}
		return {
			values : mArray,
			displayValues : mArray,
			value : this.padStart(this.currMonth),
			width : '20%',
			textAlign : 'center'
		}
	}
	getDays(){
		let count ;
		let dArray = [];
		
		if([1, 3, 5, 7, 8, 10, 12].indexOf(+this.currMonth) > -1){
			count = 31;
		}else if([4, 6, 9, 11].indexOf(+this.currMonth) > -1){
			count = 30;
		}else if(this.isLeapYear(+this.currYear)){
			count = 29;
		}else {
			count = 28;
		}
		while(count){
			dArray.push(this.padStart(count));
			count--
		}
		dArray.reverse();
		return {
			values : dArray,
			displayValues : dArray,
			value : this.padStart(this.currDay),
			width : '20%',
			textAlign : 'center'
		}
	}
	
	padStart(num) {
		num = num.toString();
		if (num.length < 2) {
			num = 0 + num;
		}
		return num;
	}
	_isBeginYear() {
		return this.options.beginYear === parseInt(this.ui.y.picker.getSelectedValue());
	}
	_isBeginMonth() {
		return this.options.beginMonth && this._isBeginYear() && this.options.beginMonth === parseInt(this.ui.m.picker.getSelectedValue());
	}
	_isBeginDay() {
		return this._isBeginMonth() && this.options.beginDay === parseInt(this.ui.d.picker.getSelectedValue());
	}
	_isBeginHours() {
		return this._isBeginDay() && this.options.beginHours === parseInt(this.ui.h.picker.getSelectedValue());
	}
	_isEndYear() {
		return this.options.endYear === parseInt(this.ui.y.picker.getSelectedValue());
	}
	_isEndMonth() {
		return this.options.endMonth && this._isEndYear() && this.options.endMonth === parseInt(this.ui.m.picker.getSelectedValue());
	}
	_isEndDay() {
		return this._isEndMonth() && this.options.endDay === parseInt(this.ui.d.picker.getSelectedValue());
	}
	_isEndHours() {
		return this._isEndDay() && this.options.endHours === parseInt(this.ui.h.picker.getSelectedValue());
	}

	_createMonth(current) {
		var self = this;
		var options = self.options;
		var ui = self.ui;

		//生成月列表
		var mArray = [];
		if (options.customData.m) {
			mArray = options.customData.m;
		} else {
			var m = options.beginMonth && self._isBeginYear() ? options.beginMonth : 1;
			var maxMonth = options.endMonth && self._isEndYear() ? options.endMonth : 12;
			for (; m <= maxMonth; m++) {
				var val = self._fill(m);
				mArray.push({
					text: val,
					value: val
				});
			}
		}
		ui.m.picker.setItems(mArray);
		//ui.m.picker.setSelectedValue(current);
	}
	_createDay(current) {
		var self = this;
		var options = self.options;
		var ui = self.ui;

		//生成日列表
		var dArray = [];
		if (options.customData.d) {
			dArray = options.customData.d;
		} else {
			var d = self._isBeginMonth() ? options.beginDay : 1;
			var maxDay = self._isEndMonth() ? options.endDay : self.getDayNum(parseInt(this.ui.y.picker.getSelectedValue()), parseInt(this.ui.m.picker.getSelectedValue()));
			for (; d <= maxDay; d++) {
				var val = self._fill(d);
				dArray.push({
					text: val,
					value: val
				});
			}
		}
		ui.d.picker.setItems(dArray);
		current = current || ui.d.picker.getSelectedValue();
		//ui.d.picker.setSelectedValue(current);
	}
	_createHours(current) {
		var self = this;
		var options = self.options;
		var ui = self.ui;
		//生成时列表
		var hArray = [];
		if (options.customData.h) {
			hArray = options.customData.h;
		} else {
			var h = self._isBeginDay() ? options.beginHours : 0;
			var maxHours = self._isEndDay() ? options.endHours : 23;
			for (; h <= maxHours; h++) {
				var val = self._fill(h);
				hArray.push({
					text: val,
					value: val
				});
			}
		}
		ui.h.picker.setItems(hArray);
		//ui.h.picker.setSelectedValue(current);
	}
	_createMinutes(current) {
		var self = this;
		var options = self.options;
		var ui = self.ui;

		//生成分列表
		var iArray = [];
		if (options.customData.i) {
			iArray = options.customData.i;
		} else {
			var i = self._isBeginHours() ? options.beginMinutes : 0;
			var maxMinutes = self._isEndHours() ? options.endMinutes : 59;
			for (; i <= maxMinutes; i++) {
				var val = self._fill(i);
				iArray.push({
					text: val,
					value: val
				});
			}
		}
		ui.i.picker.setItems(iArray);
		//ui.i.picker.setSelectedValue(current);
	}
	isLeapYear(year) {
		return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
	}
	
}

/*function($) {
  "use strict";
  var Picker = function (params) {
      var p = this;
      var defaults = {
          updateValuesOnMomentum: false,
          updateValuesOnTouchmove: true,
          rotateEffect: false,
          momentumRatio: 7,
          freeMode: false,
          // Common settings
          scrollToInput: true,
          inputReadOnly: true,
          convertToPopover: true,
          onlyInPopover: false,
          toolbar: true,
          toolbarCloseText: 'OK',
          toolbarTemplate: '<header class="bar bar-nav">\
          <button class="button button-link pull-right close-picker">OK</button>\
          <h1 class="title"></h1>\
          </header>',
      };
      params = params || {};
      for (var def in defaults) {
          if (typeof params[def] === 'undefined') {
              params[def] = defaults[def];
          }
      }
      p.params = params;
      p.cols = [];
      p.initialized = false;
      
      // Inline flag
      p.inline = p.params.container ? true : false;

      // 3D Transforms origin bug, only on safari
      var originBug = $.device.ios || (navigator.userAgent.toLowerCase().indexOf('safari') >= 0 && navigator.userAgent.toLowerCase().indexOf('chrome') < 0) && !$.device.android;

      // Should be converted to popover
      function isPopover() {
          var toPopover = false;
          if (!p.params.convertToPopover && !p.params.onlyInPopover) return toPopover;
          if (!p.inline && p.params.input) {
              if (p.params.onlyInPopover) toPopover = true;
              
              else {
                  if ($.device.ios) {
                      toPopover = $.device.ipad ? true : false;
                  }
                  else {
                      if ($(window).width() >= 768) toPopover = true;
                  }
              }
          } 
          return toPopover; 
      }
      function inPopover() {
          if (p.opened && p.container && p.container.length > 0 && p.container.parents('.popover').length > 0) return true;
          else return false;
      }

      // Value
      p.setValue = function (arrValues, transition) {
          var valueIndex = 0;
          for (var i = 0; i < p.cols.length; i++) {
              if (p.cols[i] && !p.cols[i].divider) {
                  p.cols[i].setValue(arrValues[valueIndex], transition);
                  valueIndex++;
              }
          }
      };
      p.updateValue = function () {
          var newValue = [];
          var newDisplayValue = [];
          for (var i = 0; i < p.cols.length; i++) {
              if (!p.cols[i].divider) {
                  newValue.push(p.cols[i].value);
                  newDisplayValue.push(p.cols[i].displayValue);
              }
          }
          if (newValue.indexOf(undefined) >= 0) {
              return;
          }
          p.value = newValue;
          p.displayValue = newDisplayValue;
          if (p.params.onChange) {
              p.params.onChange(p, p.value, p.displayValue);
          }
          if (p.input && p.input.length > 0) {
              $(p.input).val(p.params.formatValue ? p.params.formatValue(p, p.value, p.displayValue) : p.value.join(' '));
              $(p.input).trigger('change');
          }
      };

      // Columns Handlers
      p.initPickerCol = function (colElement, updateItems) {
          var colContainer = $(colElement);
          var colIndex = colContainer.index();
          var col = p.cols[colIndex];
          if (col.divider) return;
          col.container = colContainer;
          col.wrapper = col.container.find('.picker-items-col-wrapper');
          col.items = col.wrapper.find('.picker-item');
          
          var i, j;
          var wrapperHeight, itemHeight, itemsHeight, minTranslate, maxTranslate;
         
          col.calcSize();
          
          col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)').transition(0);


          var activeIndex = 0;
          var animationFrameId;

          // Set Value Function
          col.setValue = function (newValue, transition, valueCallbacks) {
              if (typeof transition === 'undefined') transition = '';
              var newActiveIndex = col.wrapper.find('.picker-item[data-picker-value="' + newValue + '"]').index();
              if(typeof newActiveIndex === 'undefined' || newActiveIndex === -1) {
                  return;
              }
          

          col.updateItems = function (activeIndex, translate, transition, valueCallbacks) {
              if (typeof translate === 'undefined') {
                  translate = $.getTranslate(col.wrapper[0], 'y');
              }
              if(typeof activeIndex === 'undefined') activeIndex = -Math.round((translate - maxTranslate)/itemHeight);
              if (activeIndex < 0) activeIndex = 0;
              if (activeIndex >= col.items.length) activeIndex = col.items.length - 1;
              var previousActiveIndex = col.activeIndex;
              col.activeIndex = activeIndex;
              
              //col.wrapper.find('.picker-selected, .picker-after-selected, .picker-before-selected').removeClass('picker-selected picker-after-selected picker-before-selected');

             // col.items.transition(transition);
              //var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');
             // var prevItems = selectedItem.prevAll().addClass('picker-before-selected');
             // var nextItems = selectedItem.nextAll().addClass('picker-after-selected');
              
              //去掉 .picker-after-selected, .picker-before-selected 以提高性能
              col.wrapper.find('.picker-selected').removeClass('picker-selected');
              if (p.params.rotateEffect) {
                col.items.transition(transition);
              }
              var selectedItem = col.items.eq(activeIndex).addClass('picker-selected').transform('');

              if (valueCallbacks || typeof valueCallbacks === 'undefined') {
                  // Update values
                  col.value = selectedItem.attr('data-picker-value');
                  col.displayValue = col.displayValues ? col.displayValues[activeIndex] : col.value;
                  // On change callback
                  if (previousActiveIndex !== activeIndex) {
                      if (col.onChange) {
                          col.onChange(p, col.value, col.displayValue);
                      }
                      p.updateValue();
                  }
              }
                  
              // Set 3D rotate effect
              if (!p.params.rotateEffect) {
                  return;
              }
              var percentage = (translate - (Math.floor((translate - maxTranslate)/itemHeight) * itemHeight + maxTranslate)) / itemHeight;
              
              col.items.each(function () {
                  var item = $(this);
                  var itemOffsetTop = item.index() * itemHeight;
                  var translateOffset = maxTranslate - translate;
                  var itemOffset = itemOffsetTop - translateOffset;
                  var percentage = itemOffset / itemHeight;

                  var itemsFit = Math.ceil(col.height / itemHeight / 2) + 1;
                  
                  var angle = (-18*percentage);
                  if (angle > 180) angle = 180;
                  if (angle < -180) angle = -180;
                  // Far class
                  if (Math.abs(percentage) > itemsFit) item.addClass('picker-item-far');
                  else item.removeClass('picker-item-far');
                  // Set transform
                  item.transform('translate3d(0, ' + (-translate + maxTranslate) + 'px, ' + (originBug ? -80 : 0) + 'px) rotateX(' + angle + 'deg)');
              });
          };

          function updateDuringScroll() {
              animationFrameId = $.requestAnimationFrame(function () {
                  col.updateItems(undefined, undefined, 0);
                  updateDuringScroll();
              });
          }

          // Update items on init
          if (updateItems) col.updateItems(0, maxTranslate, 0);

          var allowItemClick = true;
          var isTouched, isMoved, touchStartY, touchCurrentY, touchStartTime, touchEndTime, startTranslate, returnTo, currentTranslate, prevTranslate, velocityTranslate, velocityTime;
          function handleTouchStart (e) {
              if (isMoved || isTouched) return;
              e.preventDefault();
              isTouched = true;
              var position = $.getTouchPosition(e);
              touchStartY = touchCurrentY = position.y;
              touchStartTime = (new Date()).getTime();
              
              allowItemClick = true;
              startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
          }
          function handleTouchMove (e) {
              if (!isTouched) return;
              e.preventDefault();
              allowItemClick = false;
              var position = $.getTouchPosition(e);
              touchCurrentY = position.y;
              if (!isMoved) {
                  // First move
                  $.cancelAnimationFrame(animationFrameId);
                  isMoved = true;
                  startTranslate = currentTranslate = $.getTranslate(col.wrapper[0], 'y');
                  col.wrapper.transition(0);
              }
              e.preventDefault();

              var diff = touchCurrentY - touchStartY;
              currentTranslate = startTranslate + diff;
              returnTo = undefined;

              // Normalize translate
              if (currentTranslate < minTranslate) {
                  currentTranslate = minTranslate - Math.pow(minTranslate - currentTranslate, 0.8);
                  returnTo = 'min';
              }
              if (currentTranslate > maxTranslate) {
                  currentTranslate = maxTranslate + Math.pow(currentTranslate - maxTranslate, 0.8);
                  returnTo = 'max';
              }
              // Transform wrapper
              col.wrapper.transform('translate3d(0,' + currentTranslate + 'px,0)');

              // Update items
              col.updateItems(undefined, currentTranslate, 0, p.params.updateValuesOnTouchmove);
              
              // Calc velocity
              velocityTranslate = currentTranslate - prevTranslate || currentTranslate;
              velocityTime = (new Date()).getTime();
              prevTranslate = currentTranslate;
          }
          function handleTouchEnd (e) {
              if (!isTouched || !isMoved) {
                  isTouched = isMoved = false;
                  return;
              }
              isTouched = isMoved = false;
              col.wrapper.transition('');
              if (returnTo) {
                  if (returnTo === 'min') {
                      col.wrapper.transform('translate3d(0,' + minTranslate + 'px,0)');
                  }
                  else col.wrapper.transform('translate3d(0,' + maxTranslate + 'px,0)');
              }
              touchEndTime = new Date().getTime();
              var velocity, newTranslate;
              if (touchEndTime - touchStartTime > 300) {
                  newTranslate = currentTranslate;
              }
              else {
                  velocity = Math.abs(velocityTranslate / (touchEndTime - velocityTime));
                  newTranslate = currentTranslate + velocityTranslate * p.params.momentumRatio;
              }

              newTranslate = Math.max(Math.min(newTranslate, maxTranslate), minTranslate);

              // Active Index
              var activeIndex = -Math.floor((newTranslate - maxTranslate)/itemHeight);

              // Normalize translate
              if (!p.params.freeMode) newTranslate = -activeIndex * itemHeight + maxTranslate;

              // Transform wrapper
              col.wrapper.transform('translate3d(0,' + (parseInt(newTranslate,10)) + 'px,0)');

              // Update items
              col.updateItems(activeIndex, newTranslate, '', true);

              // Watch items
              if (p.params.updateValuesOnMomentum) {
                  updateDuringScroll();
                  col.wrapper.transitionEnd(function(){
                      $.cancelAnimationFrame(animationFrameId);
                  });
              }

              // Allow click
              setTimeout(function () {
                  allowItemClick = true;
              }, 100);
          }

          function handleClick(e) {
              if (!allowItemClick) return;
              $.cancelAnimationFrame(animationFrameId);
            
              var value = $(this).attr('data-picker-value');
              col.setValue(value);
          }

          col.initEvents = function (detach) {
              var method = detach ? 'off' : 'on';
              col.container[method]($.touchEvents.start, handleTouchStart);
              col.container[method]($.touchEvents.move, handleTouchMove);
              col.container[method]($.touchEvents.end, handleTouchEnd);
              col.items[method]('click', handleClick);
          };
          col.destroyEvents = function () {
              col.initEvents(true);
          };

          col.container[0].f7DestroyPickerCol = function () {
              col.destroyEvents();
          };

          col.initEvents();

      };
      p.destroyPickerCol = function (colContainer) {
          colContainer = $(colContainer);
          if ('f7DestroyPickerCol' in colContainer[0]) colContainer[0].f7DestroyPickerCol();
      };
      // Resize cols
      function resizeCols() {
          if (!p.opened) return;
          for (var i = 0; i < p.cols.length; i++) {
              if (!p.cols[i].divider) {
                  p.cols[i].calcSize();
                  p.cols[i].setValue(p.cols[i].value, 0, false);
              }
          }
      }
      $(window).on('resize', resizeCols);


      // Input Events
      function openOnInput(e) {
          e.preventDefault();
          if (p.opened) return;
          p.open();
          if (p.params.scrollToInput && !isPopover()) {
              var pageContent = p.input.parents('.content');
              if (pageContent.length === 0) return;

              var paddingTop = parseInt(pageContent.css('padding-top'), 10),
                  paddingBottom = parseInt(pageContent.css('padding-bottom'), 10),
                  pageHeight = pageContent[0].offsetHeight - paddingTop - p.container.height(),
                  pageScrollHeight = pageContent[0].scrollHeight - paddingTop - p.container.height(),
                  newPaddingBottom;
              var inputTop = p.input.offset().top - paddingTop + p.input[0].offsetHeight;
              if (inputTop > pageHeight) {
                  var scrollTop = pageContent.scrollTop() + inputTop - pageHeight;
                  if (scrollTop + pageHeight > pageScrollHeight) {
                      newPaddingBottom = scrollTop + pageHeight - pageScrollHeight + paddingBottom;
                      if (pageHeight === pageScrollHeight) {
                          newPaddingBottom = p.container.height();
                      }
                      pageContent.css({'padding-bottom': (newPaddingBottom) + 'px'});
                  }
                  pageContent.scrollTop(scrollTop, 300);
              }
          }
      }
      function closeOnHTMLClick(e) {
          if (inPopover()) return;
          if (p.input && p.input.length > 0) {
              if (e.target !== p.input[0] && $(e.target).parents('.picker-modal').length === 0) p.close();
          }
          else {
              if ($(e.target).parents('.picker-modal').length === 0) p.close();   
          }
      }

      if (p.params.input) {
          p.input = $(p.params.input);
          if (p.input.length > 0) {
              if (p.params.inputReadOnly) p.input.prop('readOnly', true);
              if (!p.inline) {
                p.input.on("click", function(e) {
                  openOnInput(e);
                  //修复部分安卓系统下，即使设置了readonly依然会弹出系统键盘的bug
                  if (p.params.inputReadOnly) {
                    this.focus();
                    this.blur();
                  }
                });
              }
              if (p.params.inputReadOnly) {
                  p.input.on('focus mousedown', function (e) {
                      e.preventDefault();
                  });
              }
          }
              
      }
      
      if (!p.inline) $('html').on('click', closeOnHTMLClick);

      // Open
      function onPickerClose() {
          p.opened = false;
          if (p.input && p.input.length > 0) p.input.parents('.page-content').css({'padding-bottom': ''});
          if (p.params.onClose) p.params.onClose(p);

          // Destroy events
          p.container.find('.picker-items-col').each(function () {
              p.destroyPickerCol(this);
          });
      }

      p.opened = false;
      p.open = function () {
          var toPopover = isPopover();

          if (!p.opened) {

              // Layout
              p.layout();

              // Append
              if (toPopover) {
                  p.pickerHTML = '<div class="popover popover-picker-columns"><div class="popover-inner">' + p.pickerHTML + '</div></div>';
                  p.popover = $.popover(p.pickerHTML, p.params.input, true);
                  p.container = $(p.popover).find('.picker-modal');
                  $(p.popover).on('close', function () {
                      onPickerClose();
                  });
              }
              else if (p.inline) {
                  p.container = $(p.pickerHTML);
                  p.container.addClass('picker-modal-inline');
                  $(p.params.container).append(p.container);
              }
              else {
                  p.container = $($.pickerModal(p.pickerHTML));
                  $(p.container)
                  .on('close', function () {
                      onPickerClose();
                  });
              }

              // Store picker instance
              p.container[0].f7Picker = p;

              // Init Events
              p.container.find('.picker-items-col').each(function () {
                  var updateItems = true;
                  if ((!p.initialized && p.params.value) || (p.initialized && p.value)) updateItems = false;
                  p.initPickerCol(this, updateItems);
              });
              
              // Set value
              if (!p.initialized) {
                  if (p.params.value) {
                      p.setValue(p.params.value, 0);
                  }
              }
              else {
                  if (p.value) p.setValue(p.value, 0);
              }
          }

          // Set flag
          p.opened = true;
          p.initialized = true;

          if (p.params.onOpen) p.params.onOpen(p);
      };

      // Close
      p.close = function () {
          if (!p.opened || p.inline) return;
          if (inPopover()) {
              $.closeModal(p.popover);
              return;
          }
          else {
              $.closeModal(p.container);
              return;
          }
      };

      // Destroy
      p.destroy = function () {
          p.close();
          if (p.params.input && p.input.length > 0) {
              p.input.off('click focus', openOnInput);
          }
          $('html').off('click', closeOnHTMLClick);
          $(window).off('resize', resizeCols);
      };

      if (p.inline) {
          p.open();
      }

      return p;
  };

  $(document).on("click", ".close-picker", function() {
    var pickerToClose = $('.picker-modal.modal-in');
    if (pickerToClose.length > 0) {
      $.closeModal(pickerToClose);
    }
    else {
      pickerToClose = $('.popover.modal-in .picker-modal');
      if (pickerToClose.length > 0) {
        $.closeModal(pickerToClose.parents('.popover'));
      }
    }
  });

  //修复picker会滚动页面的bug
  $(document).on($.touchEvents.move, ".picker-modal-inner", function(e) {
    e.preventDefault();
  });

  $.fn.picker = function(params) {
    var args = arguments;
    return this.each(function() {
      if(!this) return;
      var $this = $(this);
      
      var picker = $this.data("picker");
      if(!picker) {
        params = params || {};
        var inputValue = $this.val();
        if(params.value === undefined && inputValue !== "") {
          params.value = params.cols.length > 1 ? inputValue.split(" ") : [inputValue];
        }
        var p = $.extend({input: this}, params);
        picker = new Picker(p);
        $this.data("picker", picker);
      }
      if(typeof params === typeof "a") {
        picker[params].apply(picker, Array.prototype.slice.call(args, 1));
      }
    });
  };
}($);
*/