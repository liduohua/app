<template>
	<div class="page">
		<NavHeader title="详情"></NavHeader>
    	<div class="content">
        	<h1 class="news-title">232323</h1>
        	<p class="release-time">312313</p>
        	<div class="news-content">
				{{id}}
        	</div>
    	</div>
	</div>
</template>
<script>
	import NavHeader from '../components/NavHeader.vue';
	export default {
		props : ['id'],
		components :{
			NavHeader,
		},
		methods :{
			
			//loadNewsContent(){
				
			//}
		},
		created(){
			
		},
		mounted(){
			
		}
	}
</script>
<style lang="scss">
	@import '../scss/news.scss';
</style>