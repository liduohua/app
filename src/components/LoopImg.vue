<template>
	<div class='swipe' ref='container'>
        <div class='swipe-wrap'>
            <div class="swipe-wrap-item" v-for="item in loopImgList"><img :src="'../dist/assets/'+item.url" style="width:100%;vertical-align: middle;" /></div>
        </div>
        <div class="swipe-indicator" ref="indicator" data-bg-color="00bd16">
            <span v-for="item in loopImgList"></span>
        </div>
    </div>
</template>
<script>
	let Swiper = require('../lib/Swipe-es5.js').Swiper;
	
	export default {
		data : function(){
			return {
				loopImgList : []
			}
		},
		mounted (){
			this.swiper = new Swiper(this.$refs.container, {
				indicator :  this.$refs.indicator
			});
		},
		methods : {
			/*
			 * 加载轮播图片
			 */
			async getLoopImgs(){
				 this.$http.get('/loopImgs').then((response)=>{
				 	
				 }).catch((err)=>{
				 	this.loopImgList = [
				 		{url : 'test/loopImg/loop1.bmp'},
				 		{url : 'test/loopImg/loop2.bmp'},
				 		{url : 'test/loopImg/loop3.bmp'},
				 		{url : 'test/loopImg/loop4.bmp'},
				 		{url : 'test/loopImg/loop5.bmp'},
				 		{url : 'test/loopImg/loop6.bmp'},
				 		{url : 'test/loopImg/loop7.bmp'},
				 	];
				 	this.swiper.refresh();
				 });
			},
		},
		beforeDestroy (){
			this.swiper.destroy();
		},
		created (){
			this.getLoopImgs();
		}
	}
</script>
<style>
	
	.swipe{
	overflow: hidden;
	visibility : hidden;
	position: relative;
}
.swipe-wrap > div{
	float:left;
	position: relative;
}
.swipe-vertical-wrap-item{
	width:100%;
	position: relative;
	white-space: nowrap;
	text-overflow:ellipsis;
	overflow:hidden;

}
.swipe-indicator {
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    pointer-events: none;
}

.swipe-indicator span {
    display: inline-block;
    width: 0.2rem;
    height: 0.1rem;
    border-radius: 0.1rem;
    background: #fff;
    margin:5px;
}

</style>