<template>
	<div id="app">
		<transition>
			<router-view></router-view>
		</transition>
	</div>
	
</template>

<script>
	export default {
		methods : {
			resizeFont(){
				var htmlEl = document.documentElement;
				let deviceWidth = htmlEl.getBoundingClientRect().width;
        		if(deviceWidth > 750) deviceWidth = 750;
        		htmlEl.style.fontSize = deviceWidth / 7.5 + 'px';
			}, 
		},
		mounted(){ 
			//alert(this.resizeFont);
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