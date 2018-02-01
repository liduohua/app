(function(root, factory) {
    //AMD
    if (typeof define === 'function' && define.amd) {
        define(['exports'], function(exports) {
            exports.Picker = root.Picker = factory();
        });
        //Node.js
    } else if (typeof exports !== 'undefined') {
        exports.Picker = factory();
        //Browser
    } else {
        root.Picker = factory();
    }
})(this, function() {
    'use strict';
    var uid = 1;
    var d = new Date();
    var inputValue = [d.getFullYear(),d.getMonth()+1,d.getDate()];

    function Picker(params) {
        var params = params || {};
        var defaultArgs = {
            container: null,
            cols: [],
           
            eventType : 'click',
            momentumRatio: 7,
            rotateEffect: true,
            updateVal: function(vals) {},
            cancel: function(vals) {},
            confirm: function(vals) {},
            isPushToHistoryStack: true,
            toolbarTemplate: '<header class="picker-bar">\
            <button class="picker-bar-button pull-left picker-cancel">取消</button><h1 class="picker-bar-title" >' + (params.title || "请选择") + '</h1><button class="picker-bar-button pull-right picker-confirm">确定</button></header>',
        };
        for (var def in defaultArgs) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaultArgs[def];
            }
        }
        var self = this;
        this.cancel = function() {
            self.destroy();
            params.cancel(self.colVals);
        };
        this.confirm = function() {
            self.destroy();
            params.confirm(self.colVals);
        };
        this.params = params;
        this.cols = [];
        this.colVals = [];
        this.uid = uid++;
        this.open();

        var overlay = document.createElement('div');
        overlay.className = 'modal-overlay modal-overlay-visible';
        document.body.appendChild(overlay);
        this.overlay = overlay;
    }
    Picker.prototype = {
        setValue: function() {

        },
        updateValue: function(col, itemIndex, updateChildCol) {
            var val = "";
            var self = this;
            var colId = col.colContainer.getAttribute('data-col-id');
            var relateCols = [];
            if (updateChildCol) {
                for (var i = 0; i < self.cols.length; i++) {
                    if (self.cols[i].colContainer.getAttribute('data-col-id') === colId) {
                        relateCols.push(self.cols[i]);
                    }
                }
                var values = this.params.cols[colId];
                var relateCol = relateCols.shift();
                var displayValue;
                var isUpdate = false;
                do {
                    if (isUpdate) {
                        relateCol.colWrapper.innerHTML = this.colHTML(values);
                        relateCol.init();
                        relateCol.setValue(values.displayValues[0]);
                        if (values.sub) {
                            values = values.sub[0];
                        } else {
                            values = null;
                        }
                    } else {

                        displayValue = relateCol.items[relateCol.activeIndex].textContent;

                    }
                    if (!isUpdate) {
                        for (var i = 0; i < values.displayValues.length; i++) {
                            if (displayValue === values.displayValues[i]) {
                                if (values.sub) {
                                    values = values.sub[i];
                                    if (col === relateCol) {
                                        isUpdate = true;
                                    }
                                } else {
                                    values = null;
                                }
                                break;
                            }
                        }
                    }
                    relateCol = relateCols.shift();
                } while (values);
            }
            var colVals = []
            for (var i = 0; i < self.cols.length; i++) {
                var item = self.cols[i].items[self.cols[i].activeIndex];
                var value = item.getAttribute('data-val');
                var displayValue = item.textContent;
                colVals.push({ value: value, displayValue: displayValue });
            }
            this.colVals = colVals
            this.params.updateVal(colVals);
        },
        initCols: function(pickerItems) {
            var colContainers = [].slice.call(pickerItems.querySelectorAll('.picker-items-col'));
            var self = this;
            self.cols = [];
            colContainers.forEach(function(colContainer, index) {
                var col = new Col(colContainer, self);
                col.setValue(inputValue[index]);
                self.cols.push(col);
            });
            for (var i = 0; i < self.cols.length - 1; i++) {
                var col = self.cols[i];
                var colId = col.colContainer.getAttribute('data-col-id');
                var nextCol = self.cols[i + 1];
                var nextColId = nextCol.colContainer.getAttribute('data-col-id');
                if (colId === nextColId) {
                    col.childCol = nextCol;
                }
            }
        },
        /*
         * 生成列结构
         */
        colHTML: function(col) {
            var colHTML = '';
            for (var i = 0; i < col.values.length; i++) {
                colHTML += '<div class="picker-item picker-3d" data-val=' + col.values[i] + '>' + col.displayValues[i] + '</div>';
            }
            //保存当前选中的列值
            this.colVals.push({
                value: col.values[0],
                displayValue: col.displayValues[0]
            });
            return colHTML;
        },
        /*
         * 生成所有列结构，id相同表示这几列有级联关系
         */
        layout: function() {
            var pickerHTML = '';
            var colsHTML = '';
            var colNum = -1;

            function colLayout(col, colId) {
                //this.colsValue.push(col.displayValues);
                colNum++;
                colsHTML += '<div class="picker-items-col" data-col-id=' + colId + '><div class="picker-items-col-wrapper">' + this.colHTML(col) + '</div></div>';
                if (col.sub) {
                    for (var i = 0; i < col.displayValues.length; i++) {
                    	
                        if (col.displayValues[i] === inputValue[colNum]) {
                            colLayout.call(this, col.sub[i], colId);
                            return;
                        }
                    }
                    colLayout.call(this, col.sub[0], colId);
                }
            }
            //生成列结构
            for (var i = 0; i < this.params.cols.length; i++) {
                colLayout.call(this, this.params.cols[i], i);
            }
            pickerHTML = this.params.toolbarTemplate + '<div class="picker-items">' + colsHTML + '<div class="picker-center-highlight"></div></div>';
            var pickerRootNode = document.createElement('div');
            pickerRootNode.className = 'picker';
            pickerRootNode.innerHTML = pickerHTML;

            return pickerRootNode;

        },
        open: function() {
            if (!this.params.container) {
                this.params.container = document.body;
            }
            var pickerRootNode = this.layout();
            this.params.container.appendChild(pickerRootNode);
            this.pickerRootNode = pickerRootNode;
            if (this.params.isPushToHistoryStack) {

            }
            this.initCols(this.pickerRootNode.querySelector('.picker-items'));
            var self = this;
            this.pickerRootNode.querySelector('.picker-cancel').addEventListener(this.params.eventType, this.cancel);
          
            this.pickerRootNode.querySelector('.picker-confirm').addEventListener(this.params.eventType, this.confirm);
        },
        pushToHistoryStack: function() {

        },
        destroy: function() {

            for (var i = 0; i < this.cols.length; i++) {
                this.cols[i].destroy();
            }

            this.pickerRootNode.querySelector('.picker-cancel').removeEventListener(this.params.eventType, this.cancel);
            this.pickerRootNode.querySelector('.picker-confirm').removeEventListener(this.params.eventType, this.confirm);
            document.body.removeChild(this.pickerRootNode);
            document.body.removeChild(this.overlay);
        }
    }

    function addEvent(el, type, fn, capture) {
        el.addEventListener(type, fn, !!capture);
    }

    function removeEvent(el, type, fn, capture) {
        el.removeEventListener(type, fn, !!capture);
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

    function requestAnimationFrame(callback) {
        if (window.requestAnimationFrame) return window.requestAnimationFrame(callback);
        else if (window.webkitRequestAnimationFrame) return window.webkitRequestAnimationFrame(callback);
        else if (window.mozRequestAnimationFrame) return window.mozRequestAnimationFrame(callback);
        else {
            return window.setTimeout(callback, 1000 / 60);
        }
    }

    function cancelAnimationFrame(id) {
        if (window.cancelAnimationFrame) return window.cancelAnimationFrame(id);
        else if (window.webkitCancelAnimationFrame) return window.webkitCancelAnimationFrame(id);
        else if (window.mozCancelAnimationFrame) return window.mozCancelAnimationFrame(id);
        else {
            return window.clearTimeout(id);
        }
    }

    function Col(colContainer, picker) {
        this.colContainer = colContainer;
        this.colWrapper = colContainer.querySelector('.picker-items-col-wrapper');
        this.picker = picker;
        this.init();
    }
    Col.prototype = {
        init: function() {
            this.items = [].slice.call(this.colWrapper.children);

            this.calcSize();
            transition(this.colWrapper, 0);
            transform(this.colWrapper, 'translate3d(0,' + this.maxTranslate + 'px,0)');
            this.activeIndex = 0;
            this.items[this.activeIndex].classList.add('picker-selected');
            this.updateItems(this.activeIndex);
            this.initEvents();
            this.allowItemClick = true;
        },
        setValue: function(value) {
            var self = this;
            this.items.some(function(item, index) {
                if (item.textContent.indexOf(value) > -1) {
                    transition(self.colWrapper, 0);
                    transform(self.colWrapper, 'translate3d(0,' + (self.maxTranslate - self.itemHeight * index) + 'px,0)');
                    self.updateItems(index);
                    return true;
                }
            });
        },
        calcSize: function() {
            this.wrapperHeight = this.colWrapper.offsetHeight;
            var itemHeight = this.items[0].offsetHeight;
            var colContainerHeight = this.colContainer.offsetHeight;
            var itemsHeight = itemHeight * this.items.length;
            this.itemHeight = itemHeight;
            this.itemsHeight = itemsHeight;
            this.minTranslate = colContainerHeight / 2 - this.itemsHeight + itemHeight / 2;
            this.maxTranslate = colContainerHeight / 2 - itemHeight / 2;
        },
        updateItems: function(activeIndex, translate, transition, updateChildCol) {
            if (!translate) {
                translate = getComputedPosition(this.colWrapper).y;
            }
            if (activeIndex === undefined) {
                activeIndex = Math.round((this.maxTranslate - translate) / this.itemHeight);
            }
            if (activeIndex < 0) activeIndex = 0;
            if (activeIndex > this.items.length - 1) activeIndex = this.items.length - 1;
            var preActiveIndex = this.activeIndex;
            if (preActiveIndex != activeIndex) {
                this.colWrapper.querySelector('.picker-selected').classList.remove('picker-selected');
            }
            this.items[activeIndex].classList.add('picker-selected');
            this.activeIndex = activeIndex;
            if (preActiveIndex !== this.activeIndex || updateChildCol)
                this.picker.updateValue(this, this.activeIndex, updateChildCol); //更新选择器值

            if (!this.picker.params.rotateEffect) {
                return;
            }
            var self = this;
            this.items.forEach(function(item, index) {
                var itemOffsetTop = index * self.itemHeight;
                var translateOffset = self.maxTranslate - translate;
                var itemOffset = itemOffsetTop - translateOffset;
                var percentage = itemOffset / self.itemHeight;

                var angle = (-18 * percentage);
                if (angle > 180) angle = 180;
                if (angle < -180) angle = -110;
                transform(item, 'translate3d(0, ' + (self.maxTranslate - translate) + 'px, ' + -110 + 'px) rotateX(' + angle + 'deg)');
                if (angle > 90 || angle < -90) {

                    item.classList.add('hidden');
                } else {
                    item.classList.remove('hidden');
                }
            });
        },
        handleEvent: function(event) {
            switch (event.type) {
                case 'touchstart':
                    this.handleTouchStart(event);
                    break;
                case 'touchmove':
                    this.handleTouchMove(event);
                    break;
                case 'touchend':
                    this.handleTouchEnd(event);
                    break;
                case 'tap':
                    this.handleClick(event);
                    break;
                case 'webkitTransitionEnd':
                case 'msTransitionEnd':
                case 'oTransitionEnd':
                case 'otransitionend':
                case 'transitionend':
                    ;
                    break;
                case 'resize':
                    ;
                    break;
            }
        },
        handleClick: function(e) {
            if (!this.allowItemClick) {
                return;
            }
            var target = e.target;
            if (target.classList.contains('picker-item')) {
                var activeIndex = this.items.indexOf(target);
                transition(this.colWrapper, 300);
                var newTranslate = -activeIndex * this.itemHeight + this.maxTranslate;
                this.updateItems(activeIndex, newTranslate, 0);
                transform(this.colWrapper, 'translate3d(0,' + newTranslate + 'px,0)');
            }
        },
        handleTouchStart: function(e) {
            this.isMoved = false;
            var position = getTouchPosition(e);
            this.startY = position.y;
            this.startTime = (new Date()).getTime();
            this.startTranslate = getComputedPosition(this.colWrapper).y;

        },
        handleTouchMove: function(e) {
            e.preventDefault();
            if (!this.isMoved) {
                this.isMoved = true;
            }
            this.allowItemClick = false;
            var currentY = getTouchPosition(e).y;
            var diff = currentY - this.startY;
            var currTranslate = this.startTranslate + diff;

            this.returnTo = undefined;
            if (currTranslate > this.maxTranslate) {
                currTranslate = this.maxTranslate + Math.pow(currTranslate - this.maxTranslate, 0.8);
                this.returnTo = 'max';
            }
            if (currTranslate < this.minTranslate) {
                currTranslate = this.minTranslate - Math.pow(this.minTranslate - currTranslate, 0.8);
                this.returnTo = 'min';
            }
            this.updateItems(undefined, currTranslate, 0);
            transition(this.colWrapper, 0);
            transform(this.colWrapper, 'translate3d(0,' + currTranslate + 'px,0)');
            this.velocityTranslate = currTranslate - (this.prevTranslate || currTranslate);
            this.velocityTime = (new Date()).getTime();
            this.prevTranslate = currTranslate;
        },
        handleTouchEnd: function(e) {
            //e.preventDefault();
            if (!this.isMoved) {
                return;
            }
            if (this.returnTo) {
                transition(this.colWrapper, 300);
                if (this.returnTo === 'min') {
                    transform(this.colWrapper, 'translate3d(0,' + this.minTranslate + 'px,0)');
                } else transform(this.colWrapper, 'translate3d(0,' + this.maxTranslate + 'px,0)');
            }
            var endTime = new Date().getTime();
            var endTranslate;
            if (endTime - this.startTime > 300) {
                endTranslate = this.prevTranslate;
            } else {
                endTranslate = this.prevTranslate + this.velocityTranslate * this.picker.params.momentumRatio;
            }
            endTranslate = Math.max(Math.min(endTranslate, this.maxTranslate), this.minTranslate);
            var activeIndex = Math.round((this.maxTranslate - endTranslate) / this.itemHeight);
            endTranslate = -activeIndex * this.itemHeight + this.maxTranslate;
            transition(this.colWrapper, 300);
            transform(this.colWrapper, 'translate3d(0,' + endTranslate + 'px,0)');
            this.updateItems(activeIndex, endTranslate, 0, true);

            var self = this;
            setTimeout(function() {
                self.allowItemClick = true;
            }, 300);
            var callback = function() {
                    self.updateItemsDuringScroll();
                    requestAnimationFrame(callback);
                }
                //requestAnimationFrame(callback);
        },
        updateItemsDuringScroll: function() {
            //this.updateItems(undefined,undefined);
        },
        initEvents: function(detach) {
            var eventType = detach ? removeEvent : addEvent;
            var target = this.container;
            eventType(this.colContainer, 'touchstart', this);
            eventType(this.colContainer, 'touchmove', this);
            eventType(this.colContainer, 'touchend', this);
            eventType(this.colContainer, 'tap', this);
        },
        destroyEvents: function() {
            this.initEvents(true);
        },
        destroy: function() {
            this.initEvents(true);
        }
    }
    return Picker;
});