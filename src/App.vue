<template>
	<div id="app">
		<transition>
			<keep-alive :include="cacheViews">
				<router-view></router-view>
			</keep-alive>
		</transition>
	</div>
</template>

<script>
	import {mapMutations} from 'vuex';
	export default {
		data :()=>{
			return {
				
			}
		},
		computed : {
			cacheViews(){
				return this.$store.state.cacheViews;
			} 
		},
		methods : {
			//...mapMutations(['increment']),
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
		created(){
		
		}
	}
</script>
<style>
	.v-enter{
		opacity:0;
		transform: translateX(100%);
	}
	.v-enter-active{
		transform: translateX(0%);
		transition:all 0.3s ease;
	}
	.v-leave-active{
		opacity:0;
		transition:all 0.3s ease;
	}
</style>