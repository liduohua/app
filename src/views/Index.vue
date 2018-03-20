<template>
	<div class="page" >
		<NavHeader ref="navHeader" background="rgba(0,0,0, 0.2)">
			<a><img src="../assets/icon/user-icon.png" alt="" class="nav-ico"></a>
        	<a class="message"><img src="../assets/head-ico2.png" alt="" class="nav-ico"></a>
        	<div class="nav-search">
            	<input />
            	<router-link tag="p" to="search"><img src='../assets/head-ico3.png' />琵琶有腿</router-link>
        	</div>
		</NavHeader>
		<NavFooter></NavFooter>
		<div ref="infiniteContent" class='content' data-auto-load="true" style="top:0;transform: translateZ(0);" @scroll="onScroll" @infinite="getBannerImgs">
			<LoopImg></LoopImg>
            <div class="grid-panel">
            	<ul>
                	<li v-for="(item,index) in preFuncBtns" :data-id="item.id" :key="index"><i :class="item.iconClass"></i><img :src="item.imgAddr" />{{item.labelText}}</li>
            		<router-link tag="li" to="/allFunBtns">
                       <img src="../assets/icon/all-icon.png" />全部功能
                    </router-link>
            	</ul>
            </div>
            <TopNews></TopNews>
            <div class="banner-wrapper">
            	<div class='banner' v-for="(item,index) in bannerImgList" :key="index">
                	<img :src="item.imgUrl" />
                	<div class="view-more-detial"><span>查看详情>></span></div>
            	</div>
            </div>
            
		</div>
	</div>
</template>
<script>
	import NavHeader from '../components/NavHeader.vue';
	import NavFooter from '../components/NavFooter.vue';
	import TopNews from '../components/TopNews.vue';
	import LoopImg from '../components/LoopImg.vue';
	import InfiniteScroll from '../lib/InfiniteScroll';
	import config from '../config';
	import {httpGet,httpPost} from '../api';
	console.log(httpPost);
	export default {
		name : 'index',
		data : () => {
			return {	
				bannerImgList : [],
				pageSize : 3,
				pageNum : 1,
				preFuncBtns : []
			};
		},
		components : {
			NavHeader,
			NavFooter,
			TopNews,
			LoopImg,
		},
		activated(){
			this.funcBtnInit();
			this.$refs.infiniteContent.scrollTop = this.scrollTop || 0;
		},
		deactivated(){
			this.scrollTop = this.$refs.infiniteContent.scrollTop;
		},
		methods : {
			// 所有的功能按钮
        	getAllFuncBtns (){
            	return [
                	{imgName : 'notice-icon.png', descText : '公告',id : 0},
                	{imgName : 'best-sell-icon.png', descText : '畅销榜单',id : 1,url:'home/bestSellerRank'},
                	{imgName : 'activity-center-icon.png', descText : '活动中心',id : 2,url:'my/payManage'},
                	{imgName : 'pay-manage-icon.png', descText : '付款管理',id : 3},
                	{imgName : 'my-select-icon.png', descText : '自选产品',id : 4},
                	{imgName : 'my-order-icon.png', descText : '我的订单',id : 5},
                	{imgName : 'latest-browse-icon.png', descText : '最近浏览',id : 6},
                	{imgName : 'my-order-icon.png', descText : '常用清单',id : 7},
                	{imgName : 'index-ico10.png', descText : '财经要闻',id : 8},
                	{imgName : 'index-ico11.png', descText : '行情分类',id : 9},
                	{imgName : 'index-ico12.png', descText : '热点推荐',id : 10},
                	{imgName : 'index-ico13.png', descText : '资金流向',id : 11},
            	]
        	},
			/*
			 * 处理顶部导航栏渐变
			 */
			onScroll(e){
				var currTarget = e.currentTarget;
				var fontSize = parseInt(document.documentElement.style.fontSize)
				var needMoveHeight = fontSize * 3.2;
				var changePercent = currTarget.scrollTop / needMoveHeight
				if (changePercent > 1) {
					changePercent = 1;
				}
				this.$refs.navHeader.$el.style.background = 'rgba(' + Math.round(9 * changePercent) + ', ' +
					Math.round(90 * changePercent) + ', ' + Math.round(170 * changePercent) + ',' + (0.2 + 0.8 * changePercent) + ')'
			},
			/*
			 * 加载广告图片列表
			 */
			async getBannerImgs(e){
				let bannerImgList = await httpGet('getBannerImgs' ,{
					pageSize : this.pageSize,
					pageNum : this.pageNum
				});
				bannerImgList.map(function(imgItem){
					imgItem.imgUrl = config.host + imgItem.imgUrl;
				});
				if(bannerImgList.length < this.pageSize){
					this.infiniteScroll.end(true);
				}else{
					this.infiniteScroll.end(false);
				}
				
				this.bannerImgList = [].concat(this.bannerImgList,bannerImgList);
				this.pageNum++;
			},
			/*
			 * 进入畅销榜页面
			 */
			toBestSellerRank(){
				this.$router.push('bestSellerRank');
			},
			toPayManage(){
				this.$router.push('/my/payManage');
			},
			toOrderManage(){
				this.$router.push('/my/orderManage');
			},
			/*
             * 功能按钮初始化
             */
            funcBtnInit: function() {
                var allFuncBtns = this.$store.state.allFuncBtns;
                var preFunBtnIds;
                var preFuncBtns = [];
                if (preFunBtnIds = JSON.parse(localStorage.getItem('preFunBtnIds'))) {
                    var len = preFunBtnIds.length;
                    var id;
                   // var self = this;
                    for (var i = 0; i < len; i++) {
                    	id = preFunBtnIds[i];
                    	allFuncBtns.some(function (funcBtn){
                    		if(funcBtn.id === id){
                    			preFuncBtns.push(funcBtn);
                    			return true;
                    		}
                    		return false;
                    	});   
                    }
                } else {
                    preFuncBtns = allFuncBtns.slice(0, 7);
                    preFunBtnIds = preFuncBtns.map(function (funcBtn){
                    	return funcBtn.id;
                    })
                    localStorage.setItem('preFunBtnIds', JSON.stringify(preFunBtnIds));
                }
                this.preFuncBtns = preFuncBtns;
            },
		},
		mounted (){
			this.infiniteScroll = new InfiniteScroll(this.$refs.infiniteContent);
		},
		beforeDestroy (){
			this.infiniteScroll.destroy();
		}
	}
</script>
<style lang="scss">
	@import '../scss/index.scss';
</style>
