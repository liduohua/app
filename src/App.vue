<template>
	<div id="app">
		<router-view></router-view>
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