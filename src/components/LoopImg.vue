<template>
	<div class='swipe' ref='container'>
        <div class='swipe-wrap'>
            <div class="swipe-wrap-item"><img src="../assets/loop1.png" style="width:100%;vertical-align: middle;" /></div>
            <div class="swipe-wrap-item"><img src="../assets/loop2.png" style="width:100%;vertical-align: middle;" /></div>
            <div class="swipe-wrap-item"><img src="../assets/loop1.png" style="width:100%;vertical-align: middle;" /></div>
        </div>
        <div class="swipe-indicator" ref="indicator" data-bg-color="00bd16">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>
<script>
	let Swiper = require('../lib/Swipe-es5.js').Swiper;
	
	export default {
		mounted (){
			this.swiper = new Swiper(this.$refs.container, {
				indicator :  this.$refs.indicator
			});
		},
		beforeDestroy (){
			this.swiper.destroy();
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
}

</style>