<template>
	<div class="page">
		<NavHeader ref="navHeader" background="rgba(0,0,0, 0.2)">
			<a class="myspace"><img src="../assets/head-ico1.png" alt="" class="nav-ico"></a>
        	<a class="message"><img src="../assets/head-ico2.png" alt="" class="nav-ico"></a>
        	<div class="nav-search">
            	<input />
            	<router-link tag="p" to="search"><img src='../assets/head-ico3.png' />琵琶有腿</router-link>
        	</div>
		</NavHeader>
		<NavFooter></NavFooter>
		<div ref="infiniteContent" class='content' data-auto-load="true" style="top:0;transform: translateZ(0);" @scroll="onScroll" @infinite="getBannerImgs">
			<LoopImg></LoopImg>
            <div class="fun-btn-grid-panel">
                <ul>
                    <li><img src="../assets/notice-icon.png" /><br/>公告</li>
                    <li @click="toBestSellerRank"><img src="../assets/honor-icon.png" /><br/>畅销榜单</li>
                    <li><img src="../assets/gift-icon.png" /><br/>活动中心</li>
                    <li><img src="../assets/pay-icon.png" /><br/>付款管理</li>
                </ul>
                <ul>
                    <li><img src="../assets/my-select-icon.png" /><br/>自选产品</li>
                    <li><img src="../assets/order-icon.png" /><br/>我的订单</li>
                    <li><img src="../assets/global-icon.png" /><br/>全球指数</li>
                    <li>
                        <a href="allg.html"><img src="../assets/all-icon.png" /><br/>全部功能</a>
                    </li>
                </ul>
            </div>
            <TopNews></TopNews>
            <div class="banner-wrapper">
            	<div class='banner' v-for="item in bannerImgList">
                	<img :src="'../dist/assets/'+item.url" />
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
	
	export default {
		name : 'index',
		data : () =>{
			return {	
				bannerImgList : [],
				pageSize : 3,
				pageNum : 1
			};
		},
		components : {
			NavHeader,
			NavFooter,
			TopNews,
			LoopImg,
		},
		activated (){
			this.$refs.infiniteContent.scrollTop = this.scrollTop || 0;
		},
		deactivated(){
			this.scrollTop = this.$refs.infiniteContent.scrollTop ;
		},
		methods : {
			//所有的功能按钮
        	getAllFuncBtns (){
            	return [
                	{imgName : 'notice-icon.png', descText : '公告',id : 0},
                	{imgName : 'best-sell-icon.png', descText : '畅销榜单',id : 1,url:'home/bestSellerRank'},
                	{imgName : 'activity-center-icon.png', descText : '活动中心',id : 2},
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
				this.$http.post('getBannerImgs' ,{
					pageSize : this.pageSize,
					pageNum : this.pageNum
				}).then((response)=>{
					
				}).catch((err)=>{
					
					if(this.pageNum == 1){
						this.bannerImgList = this.bannerImgList.concat([
							{url : 'test/banner/banner1.png'},
							{url : 'test/banner/banner2.png'},
							{url : 'test/banner/banner3.png'}
						]);
						this.infiniteScroll.end(false);
					}else if(this.pageNum == 2){
						this.bannerImgList = this.bannerImgList.concat([
							{url : 'test/banner/banner4.bmp'},
							{url : 'test/banner/banner5.png'},
							{url : 'test/banner/banner6.bmp'},
						]);
						this.infiniteScroll.end(false);
					}else{
						this.bannerImgList = this.bannerImgList.concat([
							{url : 'test/banner/banner7.bmp'},
							{url : 'test/banner/banner8.bmp'}
						]);
						
						this.infiniteScroll.end(true);
					}
					this.pageNum++;
				});
			},
			/*
			 * 进入畅销榜页面
			 */
			toBestSellerRank(){
				this.$router.push('bestSellerRank');
			},
		},
		mounted (){
			this.infiniteScroll = new InfiniteScroll(this.$refs.infiniteContent);
		},
		beforeDestroy (){
			this.infiniteScroll.destroy();
		},
		created (){
			
		},
	}
</script>
<style scoped lang="scss">
@import '../scss/mixins.scss';
	/*功能按钮面板*/
		.content{
			background:#fff;
		}
		.content::before{
			content : '';
			width : 1px;
			float:left;
			height:calc(100% + 1px);
			margin-left:-1px;
			display:block;
		}
		/*.content::after{
			content : '';
			width : 100%;
			clear : both;
			display:block;
			
		}*/
        .fun-btn-grid-panel {
            display: table;
            width: 100%;
            background: #fff;
            padding-left: 0.18rem;
            padding-right: 0.18rem;
            height: 2.5rem;
            border-bottom: 1px solid #e0e4ef;
        }

        .fun-btn-grid-panel ul {
            display: table-row;
        }

        .fun-btn-grid-panel ul li {
            display: table-cell;
            text-align: center;
            font-size: 0.2rem;
            color: #2e2f33;
            vertical-align: middle;
        }

        .fun-btn-grid-panel ul li:active {
            background: #e9e9e9;
        }

        .fun-btn-grid-panel ul li img {
            width: 0.53rem;
        }
        /*广告图片*/

        .banner {
            margin: 0.1rem;
            position: relative;
        }

        .banner img {
            width: 100%;
            vertical-align: middle;
            border-radius: 3px;
        }

        .banner .view-more-detial {
            height: 0.42rem;
            width: 1.7rem;
            position: absolute;
            bottom: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.77);
            border-top-left-radius: 0.15rem;
            border-bottom-right-radius: 0.05rem;
            text-align: center;
            line-height: 0.42rem;
            font-size: 0.18rem;
            color: #fff;
            vertical-align: bottom;
            border-radius: 3px;
        }

        .banner .view-more-detial span {
            vertical-align: -1px;
        }
        

        .swipe-indicator {
            text-align: center;
            position: absolute;
            bottom: 0;
            width: 100%;
            left: 0;
            pointer-events: none;
        }

        .swipe-indicator span {
            display: inline-block;
            width: 0.2rem;
            height: 0.1rem;
            border-radius: 0.1rem;
            background: #fff;
        }
        
        
        
        
        
        
        
        
        
        
        

</style>

