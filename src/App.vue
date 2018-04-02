<template>
	<div id="app">
		<keep-alive :include="cacheViews">
			<router-view></router-view>
		</keep-alive>
		<Toast></Toast>
	</div>
</template>

<script>
	// import {mapMutations} from 'vuex';
	import io from 'socket.io-client';
	import Toast from './components/Toast.vue';
	console.log(11);
	export default { 
		data :() => {
			return {
				
			}
		},
		computed : {
			cacheViews (){
				return this.$store.state.cacheViews;
			} 
		},
		methods : {
			// ...mapMutations(['increment']),
			resizeFont (){
				var htmlEl = document.documentElement;
				let deviceWidth = htmlEl.getBoundingClientRect().width;
				if(deviceWidth > 750) deviceWidth = 750;
				htmlEl.style.fontSize = deviceWidth / 7.5 + 'px';
			}, 
		},
		mounted (){ 
			this.resizeFont();
			window.addEventListener('resize',() => this.resizeFont())
		},
		components : {
			Toast
		},
		created (){
			let socket = io('http://localhost:7002');
			socket.on('marketlist',(data) => {
				console.log(data);
			})
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
