<template>
	<div class="page">
		<NavHeader title="详情"></NavHeader>
    	<div class="content">
        	<h1 class="news-title">{{newsTitle}}</h1>
        	<p class="release-time">{{releaseTime}}</p>
        	<div class="news-content" v-html="newsContent">
				
        	</div>
    	</div>
	</div>
</template>
<script>
	import NavHeader from '../components/NavHeader.vue';
	import {httpGet} from '../api';
	const Modal = require('../lib/Modal-es5').Modal;

	export default {
		props : ['id'],
		data : () => ({
			newsContent : '',
			newsTitle : '',
			releaseTime : '',
		}),
		components :{
			NavHeader,
		},
		methods :{
			async loadNewsContent(){	
				var preloader = new Modal();
				var modal = preloader.showPreloader();
				let html = await httpGet('getNewsDetail',{
					id : 1
				});
				this.newsContent = html;
				this.newsTitle = '历史性的突破';
				this.releaseTime = '12-05 12:43';
				preloader.hidePreloader(modal);
			}
		},
		created(){
			
		},
		mounted(){
			this.loadNewsContent()
		}
	}
</script>
<style lang="scss" scoped>
	@import '../scss/mixins.scss';
	.news-title{
		text-align:center;
		font-size:0.3rem;
  		text-indent:2em;
	}
	.release-time{
  		text-align: right;
  		font-size: 0.2rem;
  		color: $gray;
	}
	.news-content{
		padding:10px;
		font-size:0.3rem;
		padding-top:0;
	}
	.content{
		background:#fff;
	}
	p{
		text-indent: 2em;
		line-height:1.5em;
		font-size:inherit;
	}
</style>
