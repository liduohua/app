<template>
	<transition name="fade">
		<keep-alive >
			<router-view></router-view>
		</keep-alive>   
  </transition>
</template>
<script>
	export default {
		name : 'my',
		computed : {
			cacheViews(){
				return this.$store.state.cacheViews;
			} 
		}
	}
</script>
<style>
	
</style>