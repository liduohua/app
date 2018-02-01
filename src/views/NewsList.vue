<template>
<div class="page" >
    <NavHeader title="新闻列表"></NavHeader>
    <div class="content" data-auto-load="true" ref="infinteContainer" @infinite="loadNewsList">
    	<div class="news-list" @click="toNewsDetail" >
    		<div class="news-item" v-for="{id,title,releaseTime} in newsList" :data-id="id" :key="id">
            	<p class="news-title">{{title}}</p>
            	<p class="release-time">{{releaseTime}}</p>
        	</div>
    	</div>
        
    </div>
</div>
</template>
<script>
	import NavHeader from '../components/NavHeader.vue';
	import InfiniteScroll from '../lib/InfiniteScroll';
	import {httpGet} from '../api';
	// const Modal = require('../lib/Modal-es5').Modal;
	export default {
		name : 'newsList',
		data : () => ({
			newsList : [],
			pageSize : 3,
			pageNum : 1
		}),
		components :{
			NavHeader,
		},
		activated(){
			this.$refs.infinteContainer.scrollTop = this.scrollTop || 0;
		},
		deactivated(){
			this.scrollTop = this.$refs.infinteContainer.scrollTop;
		},
		methods :{
			toNewsDetail(e){
				var target = e.target;
				var id;
				while((id = target.getAttribute('data-id')) === null && target !== e.currTarget){
					target = target.parentNode;
				}
				this.$router.push(`/newsDetail/${id}`);
			},
			/*
			 * 加载新闻列表
			 */
			async loadNewsList(){
				let newsList = await httpGet('getNewsList',{
					pageSize : this.pageSize,
					pageNum : this.pageNum
				});
				this.newsList = [].concat(this.newsList,newsList);
				if(newsList.length < 3){
					this.infinteContainer.end(true);
				}else{
					this.infinteContainer.end(false);
				}
				this.pageNum++;
			},
		},
		beforeDestroy (){
			this.infinteContainer.destroy();
		},
		mounted(){
			this.infinteContainer = new InfiniteScroll(this.$refs.infinteContainer);
		},
	}
</script>
<style lang="scss">
	@import '../scss/mixins.scss';
	.news-title{ 
  		font-size:0.3rem;
  		text-indent:2em;
	}
	.content{
  		background:$white;
	}
	.news-content{
  		font-size:0.25rem;
	}
	.news-item{
  		position:relative;
  		padding:5px;
  		@include hairline(bottom,#ddd);
  		transform: translateZ(0);
	}
	.news-item:active{
    	background:#eee
	}
	.release-time{
  		text-align: right;
  		font-size: 0.2rem;
  		color: $gray;
	}
.news-item .news-title , .news-item .release-time{
  margin:5px;
}
</style>
