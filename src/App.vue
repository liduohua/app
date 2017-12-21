<template>
	<div id="app">
		
			<transition>
				<keep-alive :include="cacheComponents">
				<router-view></router-view>
				</keep-alive>
			</transition>
		
	</div>
</template>

<script>

	export default {
		data :()=>{
			return {
				cacheComponents : cache
			}
		},
		methods : {
			resizeFont(){
				var htmlEl = document.documentElement;
				let deviceWidth = htmlEl.getBoundingClientRect().width;
        		if(deviceWidth > 750) deviceWidth = 750;
        		htmlEl.style.fontSize = deviceWidth / 7.5 + 'px';
			}, 
		},
		mounted(){ 
			this.resizeFont();
		},
		components : {
			
		},
	}
</script>
<style>
	.v-enter{
		
	}
	.v-enter-active{
		
	}
</style>