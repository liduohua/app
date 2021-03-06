(function(root, factory) {
    //AMD
    if (typeof define === 'function' && define.amd)  {
        define(['exports'], function(exports) {
            exports.GuesturePassword = root.GuesturePassword = factory();
        });
        //Node.js
    } else if (typeof exports !== 'undefined') {
        exports.GuesturePassword = factory( );
        //Browser
    } else {
        root.GuesturePassword = factory();
    }
}(this, function() {
    function offset(el) {
        var left = -el.offsetLeft,
            top = -el.offsetTop;
        while (el = el.offsetParent) {
            left -= el.offsetLeft;
            top -= el.offsetTop;
        }
        return {
            left: left,
            top: top
        };
    }

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

    function Chart(cvs,opts){
        this.cvs = typeof cvs === 'string' ? document.querySelector(cvs) : cvs;
        this.ctx = cvs.getContext('2d');
        opts.width = opts.width || this.cvs.offsetWidth;
        opts.width = opts.height || this.cvs.offsetHeight;
        cvs.style.cssText = 'width:'+ opts.width + 'px;height:'+opts.width + 'px';
        var devicePixelRatio = Math.max(window.devicePixelRatio || 1,1);

        this.ctx.scale(devicePixelRatio,devicePixelRatio);
        this.cvs.width = opts.width * devicePixelRatio;
        this.cvs.height = opts.height * devicePixelRatio;
        this.width =  this.cvs.width;//实际宽度
        this.height = this.cvs.height;//实际高度
        this.devicePixelRatio = devicePixelRatio;
    }
    Chart.prototype = {
        drawEmptyCircle : function(cirArgs){
            this.ctx.beginPath();
            this.ctx.arc(cirArgs.x,cirArgs.y,cirArgs.r,0,2*Math.PI)
            this.ctx.stroke();
        },
        drawSolidCircle : function(cirArgs){
            this.ctx.beginPath();
            this.ctx.arc(cirArgs.x,cirArgs.y,cirArgs.r,0,2*Math.PI)
            this.ctx.fill();
        },
        clearCanvas : function(){
            this.ctx.clearRect(0,0,this.width,this.height);
        },
        drawLine : function(startPoint,endPoint){
            var ctx = this.ctx;
            ctx.beginPath();
            if(startPoint instanceof Array){
                ctx.moveTo(startPoint[0].x,startPoint[0].y);
                var len = startPoint.length;
                for(var i=1;i<len;i++){
                    ctx.lineTo(startPoint[i].x,startPoint[i].y);
                }
            }else{
                ctx.moveTo(startPoint.x,startPoint.y);
                ctx.lineTo(endPoint.x,endPoint.y);
            }
            ctx.stroke();
            ctx.closePath();
        },
    };

    function GuesturePassword(cvs,options){
        options = options || {};
        cvs = typeof cvs === 'string' ? document.querySelector(cvs) : cvs;
        options.width = cvs.offsetWidth;
        options.height = cvs.offsetWidth; //should be a square

        Chart.call(this,cvs,options);

        //default arguments
        var defaultOpts = {
            radiusPaddingRatio : 1.5,//为线段与圆圈的长度百分比，等于1两者比例相等
            radiusGapRatio : 1.5,//为线段与圆圈的长度百分比，等于1两者比例相等
            selectZoneRadiusRatio : 1,//手指在圆圈中的什么区域为可选中区域,参数为半径的比率
            litleCircleRadius : 10,//内部实心小圆半径(px)
            timeout : 0,//手指在圆圈上停留多久选中才选中当前圆圈(ms)
            callback : function(result){alert(),console.log(result.join(','));},//手势操作结束后回调的方法，将选中结果作为字符串参数传进来
            lineWidth : 6,//the line's width
            lineColor : '#fff',
            //cirBgImg : null, //圆圈使用背景图片
            //atvCirBgImg : null,//圆圈被选中时的背景图片
            defaultCircleColor : '#618dce',
            activeCircleColor : '#fff',
            circleLineWidth : 6,
        }
        for(var key in options)
            defaultOpts[key] = options[key];
        this.opts = defaultOpts;

        this._init();
    }

    GuesturePassword.prototype = {
        _init : function(){
            this.timeoutId = null;
            this.selectedCirCoord = [];
            this.result = [];
            this.cirCenCoord = []; //the center coordinate of circles;
            this._initEvents(this.cvs);
            this.calCircleCenterCoordinate();

            this.drawCircles(this.cirCenCoord,this.opts.defaultCircleColor);

            this.offset = offset(this.cvs);
        },
        //计算所有圆的中心坐标
        calCircleCenterCoordinate : function(){
            // width = r*radiusGapRatio*2 + r*6 + 2*r*radiusPaddingRatio;
            var radiusPaddingRatio = this.opts.radiusPaddingRatio;
            var radiusGapRatio = this.opts.radiusGapRatio;
            this.r = this.width/(radiusPaddingRatio*2 + 6 + 2*radiusGapRatio);

            var xCoord , yCoord;
            for(var i=1;i<4;i++){
                yCoord = (radiusPaddingRatio+2*(i-1) + radiusGapRatio*(i-1) + 1)*this.r;
                for(var j=1;j<4;j++){
                    xCoord = (radiusPaddingRatio+2*(j-1) + radiusGapRatio*(j-1) + 1)*this.r;
                    this.cirCenCoord.push({
                        x : xCoord,
                        y : yCoord
                    });
                }
            }
        },
        _initEvents : function(el){
            el.addEventListener('touchstart', this);
            el.addEventListener('touchmove', this);
            el.addEventListener('touchend', this);
            el.addEventListener('touchcancel', this);
        },
        handleEvent : function(e){
            switch ( e.type ) {
                case 'touchstart':
                    this._start(e);
                    break;
                case 'touchmove':
                    this._move(e);
                    break;
                case 'touchend':
                case 'touchcancel':
                    this._end(e);
            }
        },
        _start : function(e){
            if(this.stop) return;
            var offsetPoint = {};
            var touchPoint = e.touches ? e.touches[0] : e;
            offsetPoint.topOffset = touchPoint.pageY + this.offset.top;
            offsetPoint.leftOffset = touchPoint.pageX + this.offset.left;
            var startPoint = this.findFingerPosition(offsetPoint);
			this.canAdd = true;
            if(startPoint){
            	this.lastPoint = startPoint;
            	this.canAdd = false;
                this.selectedCirCoord.push(startPoint);

                this.drawCircles(this.selectedCirCoord,this.opts.activeCircleColor);
            }
        },
        _move : function(e){
            if(this.stop) return;
            e.preventDefault();
            var offsetPoint = {};
            var touchPoint = e.touches ? e.touches[0] : e;
            offsetPoint.topOffset = touchPoint.pageY + this.offset.top;
            offsetPoint.leftOffset = touchPoint.pageX + this.offset.left;
            this.clearCanvas();
            this.drawLines(offsetPoint);

            this.drawCircles(this.cirCenCoord,this.opts.defaultCircleColor,true);
            this.drawCircles(this.cirCenCoord,this.opts.defaultCircleColor);
            this.drawCircles(this.selectedCirCoord,this.opts.activeCircleColor);
            var movePoint = this.findFingerPosition(offsetPoint)
            if(!movePoint){
            	//var toCirCenDistance = Math.sqrt(Math.pow(this.lastPoint.x - offsetPoint.leftOffset* this.devicePixelRatio,2)+
                //    Math.pow(this.lastPoint.y - offsetPoint.topOffset* this.devicePixelRatio,2));//两点的距离公式
                
                //if(toCirCenDistance > (this.r*2*this.opts.selectZoneRadiusRatio)){
                //   this.canAdd = true;
                //}
            	this.canAdd = true;
                if(this.timeoutId !== null){
                    clearTimeout(this.timeoutId);
                    this.timeoutId = null
                }
            }else if(this.canAdd){
                if(this.timeoutId === null){
                    var self = this;
                    this.timeoutId = setTimeout(function(){
                        self.selectedCirCoord.push(movePoint);
                        self.lastPoint = movePoint;
                        self.canAdd = false;
                        self.drawCircles(self.selectedCirCoord,self.opts.activeCircleColor);
                    },this.opts.timeout);
                }
            }
        },
        _end : function(e){
            if(this.stop) return;
            if(this.timeoutId !== null){
                clearTimeout(this.timeoutId);
                this.timeoutId = null;
            }
            for(var i=0;i<this.selectedCirCoord.length;i++){
                this.result.push(this.cirCenCoord.indexOf(this.selectedCirCoord[i])+1);
            }
            if(this.result.length == 0){
                return;
            }
            this.stop = true;
            this.clearCanvas();
            this.drawLines();
            this.drawCircles(this.cirCenCoord,this.opts.defaultCircleColor,true);
            this.drawCircles(this.cirCenCoord,this.opts.defaultCircleColor);
            this.drawCircles(this.selectedCirCoord,this.opts.activeCircleColor);

            if(typeof this.opts.callback == 'function'){
                this.opts.callback.call(this,this.result);
            }
        },
        
        findFingerPosition : function(offsetPoint){
            var leftOffset = offsetPoint.leftOffset;//当前触摸点离canvas左边框的距离
            var topOffset = offsetPoint.topOffset; //当前触摸点离canvas上边框的距离
            for(var i=0;i<9;i++){
                var toCirCenDistance = Math.sqrt(Math.pow(this.cirCenCoord[i].x - leftOffset* this.devicePixelRatio,2)+
                    Math.pow(this.cirCenCoord[i].y - topOffset* this.devicePixelRatio,2));//两点的距离公式
                //选中要满足两个条件（在圆圈内并且不能重复）
                if(toCirCenDistance<this.r*this.opts.selectZoneRadiusRatio && this.selectedCirCoord.indexOf(this.cirCenCoord[i]) === -1){
                    return this.cirCenCoord[i];
                }
            }
            return null;
        },
        destory : function(){
            var el = this.cvs;
            el.removeEventListener('touchstart', this);
            el.removeEventListener('touchmove', this);
            el.removeEventListener('touchend', this);
            el.removeEventListener('touchcancel', this);
        },
        drawCircles : function(cenPoints,circleColor,isComposition){
            if(cenPoints == null || cenPoints.length === 0){
                return;
            }
            this.ctx.save();

            this.ctx.strokeStyle = circleColor;
            this.ctx.lineWidth = this.opts.circleLineWidth;
            this.ctx.fillStyle = circleColor;
            if(isComposition){
                this.ctx.globalCompositeOperation = "destination-out";
                this.ctx.fillStyle = 'black';//设不设置都无所谓，但如果设置就不能是透明色，透明色不会组合
            }
            var cirArgs = {} , len = cenPoints.length;

            for(var i=0;i<len;i++){
                cirArgs.x = cenPoints[i].x;
                cirArgs.y = cenPoints[i].y;
                cirArgs.r = this.r;
                if(isComposition){
                    this.drawSolidCircle(cirArgs)
                }else{
                    this.drawEmptyCircle(cirArgs);
                    cirArgs.r = this.opts.litleCircleRadius;
                    this.drawSolidCircle(cirArgs);
                }

            }
            this.ctx.restore();
        },
        drawLines : function(movePoint){
            var len = this.selectedCirCoord.length;
            if(!len){
                return;
            }
            var allKnots = [];
            if(movePoint){
                allKnots = this.selectedCirCoord.concat([{x:movePoint.leftOffset*this.devicePixelRatio,y:movePoint.topOffset*this.devicePixelRatio}]);
                len++;
            }else{
                allKnots = this.selectedCirCoord.concat();
            }
            this.ctx.save();
            this.ctx.strokeStyle = this.opts.lineColor;
            this.ctx.lineWidth = this.opts.lineWidth;
            this.drawLine(allKnots);

            this.ctx.restore();
        },
        refresh : function(){
            this.stop = false;
            this.selectedCirCoord = [];
            this.result = [];
            this.clearCanvas();
            this.drawCircles(this.cirCenCoord,this.opts.defaultCircleColor);
        },
    };
    __extends(GuesturePassword,Chart);
    return GuesturePassword;
}));