<template>
	<div class="top-news">
        <strong>今日头条：</strong>
            <div ref="container" class='swipe'>
                <div class='swipe-wrap' @click="toNewsDetails">
                    <div class="swipe-wrap-item" :data-id="item.id" :key="index" v-for="(item,index) in topNewsList">{{item.title}}</div>
                </div>
            </div>
		<router-link to="/newList" class="right-arrow-icon" append>更多</router-link>
    </div>
</template>
<script>
	import {httpPost} from '../api';
	let Swiper = require('../lib/Swipe-es5.js').Swiper;
	export default {
		data : function (){
			return {
				topNewsList : [],
			}
		},
		methods : {
			toNewsDetails (e){
				var id = e.target.getAttribute('data-id')
				if(id){
					this.$router.push(`/newsDetail/${id}`);
				}
			},
			toNewsListView (){
				alert();
			},
			/*
			 * 加载头条新闻
			 */
			async getTopNews (){
				let topNewsList = await httpPost('getTopNews')
				this.topNewsList = topNewsList;
				this.swiper.refresh();
			},
		},
		created (){
			this.getTopNews();
		},
		beforeDestroy (){
			this.swiper.destroy();
		},
		mounted (){
			this.swiper = new Swiper(this.$refs.container, {
				slideX: false, // 水平滑动
				slideY: true, // 垂直滑动
				disableGuesture : true
			});
		}
	}
</script>
<style lang="scss">
@import '../scss/topNews.scss';
</style>
