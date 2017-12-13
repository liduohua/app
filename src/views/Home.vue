<template>
	<div class="page">
		<NavHeader ref="navHeader"></NavHeader>
		<NavFooter></NavFooter>
		<div class='content' style="top:0;transform: translateZ(0);" @scroll="onScroll">
			<LoopImg></LoopImg>
            <div class="grid-panel">
                <ul>
                    <li><img src="../assets/notice-icon.png" /><br/>公告</li>
                    <li><img src="../assets/honor-icon.png" /><br/>畅销榜单</li>
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
            <div class='banner'>
                <img src="../assets/banner1.png" />
                <div class="view-more-detial"><span>查看详情>></span></div>
            </div>
            <div class='banner'>
                <img src="../assets/banner2.png" />
                <div class="view-more-detial"><span>查看详情>></span></div>
            </div>
            <div class='banner'>
                <img src="../assets/banner3.png" />
                <div class="view-more-detial"><span>查看详情>></span></div>
            </div>
            <div class='banner'>
                <img src="../assets/banner4.png" />
                <div class="view-more-detial"><span>查看详情>></span></div>
            </div>
		</div>
	</div>
</template>
<script>
	import NavHeader from '../components/NavHeader.vue';
	import NavFooter from '../components/NavFooter.vue';
	import TopNews from '../components/TopNews.vue';
	import LoopImg from '../components/LoopImg.vue';
	
	export default {
		components : {
			NavHeader,
			NavFooter,
			TopNews,
			LoopImg,
		},
		methods : {
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
		},
		mounted (){
			
		//console.log(this.$refs);
		},
	}
</script>
<style scoped lang="scss">
@import '../scss/mixins.scss';
	/*功能按钮面板*/

        .grid-panel {
            display: table;
            width: 100%;
            background: #fff;
            padding-left: 0.18rem;
            padding-right: 0.18rem;
            height: 2.5rem;
            border-bottom: 1px solid #e0e4ef;
        }

        .grid-panel ul {
            display: table-row;
        }

        .grid-panel ul li {
            display: table-cell;
            text-align: center;
            font-size: 0.2rem;
            color: #2e2f33;
            vertical-align: middle;
        }

        .grid-panel ul li:active {
            background: #e9e9e9;
        }

        .grid-panel ul li img {
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

