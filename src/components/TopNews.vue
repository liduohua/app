<template>
	<div class="top-news">
        <strong>今日头条：</strong>
            <div ref="container" class='swipe'>
                <div class='swipe-wrap' @click="toNewsDetails">
                    <div class="swipe-wrap-item" :data-id="item.id" v-for="item in topNewsList">{{item.title}}</div>
                </div>
            </div>
       	<router-link to="/newList" class="right-arrow-icon" append>更多</router-link>
    </div>
</template>
<script>
	let Swiper = require('../lib/Swipe-es5.js').Swiper;
	export default {
		data : function(){
			return {
				topNewsList : [],
			}
		},
		methods : {
			toNewsDetails (e){
				var id = e.target.getAttribute('data-id')
				if(id){
					this.$router.push(`/newsDetails/${id}`);
				}
			},
			toNewsListView (){
				alert();
			},
			/*
			 * 加载头条新闻
			 */
			async getTopNews(){
				this.$http.post('getTopNews').then((response)=>{
					
				}).catch((err)=>{
					this.topNewsList = [
						{
							title : '大胸200以上A2六合10（AB10002）',id : 1
						},
						{
							title : '大胸200以上A2六合10（AB10003）',id : 2
						},
						{
							title : '大胸200以上A2六合10（AB10004）',id : 3
						},
						{
							title : '大胸200以上A2六合10（AB10005）',id : 4
						},
						{
							title : '大胸200以上A2六合10（AB10001）',id : 5
						},
					];
					this.swiper.refresh();
				})
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
				slideX: false, //水平滑动
				slideY: true, //垂直滑动
				disableGuesture : true
			});
		}
	}
</script>
<style lang="scss">
	/*今日头条*/
    .top-news {
        height: 0.5rem;
        font-size: 0.2rem;
        line-height: 0.5rem;
        color: #6f7597;
        background: #fff;
        padding-left: 0.35rem;
        border-bottom: 1px solid #e0e4ef;
        position: relative;
        padding-right: 0.2rem;
    }
    .top-news strong {
        color: #ff0000;
    }

    .top-news span {
        color: #ff0000;
    }

    .top-news .right-arrow-icon {
        color: #4f7df5;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0.2rem;
    }

    .top-news .swipe {
        height: 0.5rem;
        left: 1.6rem;
        line-height: 0.5rem;
        position: absolute;
        right: 0.8rem;
        top: 0;
      	overflow: hidden;
    }

    .top-news .swipe:active {
        background: #eee;
    }
</style>