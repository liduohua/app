export default class Chart{
	constructor(cvs,opts){
		this.cvs = typeof cvs === 'string' ? document.querySelector(cvs) : cvs;
    	this.ctx = cvs.getContext('2d');
        opts.width = opts.width || this.cvs.offsetWidth;
        opts.width = opts.height || this.cvs.offsetHeight;
        cvs.style.cssText = 'width:'+ opts.width + 'px;height:'+opts.width + 'px';
        var devicePixelRatio = Math.max(window.devicePixelRatio || 1,1);
        this.ctx.scale(devicePixelRatio,devicePixelRatio);
        this.cvs.width = opts.width * devicePixelRatio;
        this.cvs.height = opts.height * devicePixelRatio;
        this.width =  this.cvs.width;//real width
        this.height = this.cvs.height;//real height
        this.devicePixelRatio = devicePixelRatio;
	}
	drawEmptyCircle(cirArgs){
    	this.ctx.beginPath();
    	this.ctx.arc(cirArgs.x,cirArgs.y,cirArgs.r,0,2*Math.PI)
    	this.ctx.stroke();
    }
    drawSolidCircle(cirArgs){
    	this.ctx.beginPath();
    	this.ctx.arc(cirArgs.x,cirArgs.y,cirArgs.r,0,2*Math.PI)
    	this.ctx.fill();
    }
    clearCanvas(){
    	this.ctx.clearRect(0,0,this.width,this.height);
    }
    drawLine(startPoint,endPoint){
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
    }
}
