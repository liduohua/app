<template>
	<div class='swipe' ref='container' style="transform: translateZ(0);">
        <div class='swipe-wrap' style="transform: translateZ(0);">
            <div class="swipe-wrap-item" :key="index" v-for="(item,index) in loopImgList"><img :src="item.imgUrl" style="width:100%;vertical-align: middle;" /></div>
        </div>
        <div class="swipe-indicator" ref="indicator" data-bg-color="00bd16">
            <span :key="index" v-for="(item,index) in loopImgList"></span>
        </div>
    </div>
</template>
<script>
	import {httpPost} from '../api';
	import config from '../config';
	let Swiper = require('../lib/Swipe-es5.js').Swiper;
	export default {
		data : function (){
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
			async getLoopImgs (){
				let loopImgList = await httpPost('loopImgs');
				loopImgList.map(function(imgItem){
					imgItem.imgUrl = config.host + imgItem.imgUrl;
				})
				console.log(loopImgList);
				this.loopImgList = loopImgList;
				this.swiper.refresh();
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
        }
</style>
