<template>
	 <div class="page">
        <NavHeader title="交易行情" :isBack="false"></NavHeader>
        <NavFooter></NavFooter>
        <div class="content">
            <div class="h-scroll-panel">
                <div class="wrapper one-level-classification">
                    <ul>
                        <li class="active">鸡产品</li>
                        <li>鸭产品</li>
                        <li>猪产品</li>
                        <li>牛羊产品</li>
                        <li>海鲜产品</li>
                        <li>海鲜产品</li>
                        <li>海鲜产品</li>
                        <li>海鲜产品</li>
                        <li>海鲜产品</li>
                    </ul>
                </div>
            </div>
            <!--<div class="ad-img-large"></div>
				<div class="ad-img-small"></div>-->
            <div class="h-scroll-panel">
                <div class="wrapper brand">
                    <ul>
                        <li class="active">全 部</a>
                        </li>
                        <li>昌 源</li>
                        <li>超 和</li>
                        <li>春 歌</li>
                        <li>春 雪</li>
                        <li>大 成</li>
                        <li>大 成</li>
                        <li>大 成</li>
                        <li>大 成</li>
                        <li>大 成</li>
                    </ul>
                </div>
            </div>
            <div class="layout-panel" @click="toTradeDetail">
                <div class="two-level-classification">
                    <ul>
                        <li class="active">琵琶腿</li>
                        <li>琵琶腿</li>
                        <li>琵琶腿</li>
                        <li>琵琶腿</li>
                        <li>琵琶腿</li>
                        <li>琵琶腿</li>
                        <li>琵琶腿</li>
                        <li>琵琶腿</li>
                        <li>琵琶腿</li>
                        <li>琵琶腿</li>
                        <li>琵琶腿</li>
                        <li>琵琶腿</li>
                        <li>琵琶腿</li>
                        <li>琵琶腿</li>
                        <li>琵琶腿</li>
                        <li>琵琶腿</li>
                    </ul>
                </div>
                <div class="goods-list-wrapper">
                    <table class="table-head">
                        <thead>
                            <tr>
                                <th>热门产品行情<span class="click-to-enter">（点击进入）</span></th>
                                <th>可售量</th>
                                <th>卖价一<span class="sort-arrow"></span></th>
                                <th>卖一量<span class="sort-arrow active"></span></th>
                                <th>卖价二<span class="sort-arrow"></span></th>
                                <th>卖二量<span class="sort-arrow active"></span></th>
                                <th>涨跌幅</th>
                                <th>涨跌额</th>
                            </tr>
                        </thead>
                    </table>
                    <div class="table-content">
                        <table>
                            <tr>
                                <td class="name">

                                    大鸡腿150g以上A3六合10<br/><span class="code">323222</span><button class="btn">点击竞价</button>

                                </td>
                                <td>12000</td>
                                <td class="red">344.76</td>
                                <td class="green">23</td>
                                <td>22.43</td>
                                <td>22</td>
                                <td>+13.3%</td>
                                <td>32.23</td>
                            </tr>
                            <tr>
                                <td class="name">大鸡腿150g以上A3六合10<br/><span class="code">323222</span><button class="btn">点击竞价</button></td>
                                <td>12000</td>
                                <td class="red">344.76</td>
                                <td class="green">23</td>
                                <td>22.43</td>
                                <td>22</td>
                                <td>+13.3%</td>
                                <td>32.23</td>
                            </tr>
                            <tr>
                                <td class="name">大鸡腿150g以上A3六合10<br/><span class="code">323222</span><button class="btn">点击竞价</button></td>
                                <td>12000</td>
                                <td class="red">344.76</td>
                                <td class="green">23</td>
                                <td>22.43</td>
                                <td>22</td>
                                <td>+13.3%</td>
                                <td>32.23</td>
                            </tr>
                            <tr>
                                <td class="name">大鸡腿150g以上A3六合10<br/><span class="code">323222</span><button class="btn">点击竞价</button></td>
                                <td>12000</td>
                                <td class="red">344.76</td>
                                <td class="green">23</td>
                                <td>22.43</td>
                                <td>22</td>
                                <td>+13.3%</td>
                                <td>32.23</td>
                            </tr>
                            <tr>
                                <td class="name">大鸡腿150g以上A3六合10<br/><span class="code">323222</span><button class="btn">点击竞价</button></td>
                                <td>12000</td>
                                <td class="red">344.76</td>
                                <td class="green">23</td>
                                <td>22.43</td>
                                <td>22</td>
                                <td>+13.3%</td>
                                <td>32.23</td>
                            </tr>
                            <tr>
                                <td class="name">大鸡腿150g以上A3六合10<br/><span class="code">323222</span><button class="btn">点击竞价</button></td>
                                <td>12000</td>
                                <td class="red">344.76</td>
                                <td class="green">23</td>
                                <td>22.43</td>
                                <td>22</td>
                                <td>+13.3%</td>
                                <td>32.23</td>
                            </tr>
                            <tr>
                                <td class="name">大鸡腿150g以上A3六合10<br/><span class="code">323222</span><button class="btn">点击竞价</button></td>
                                <td>12000</td>
                                <td class="red">344.76</td>
                                <td class="green">23</td>
                                <td>22.43</td>
                                <td>22</td>
                                <td>+13.3%</td>
                                <td>32.23</td>
                            </tr>
                            <tr>
                                <td class="name">大鸡腿150g以上A3六合10<br/><span class="code">323222</span><button class="btn">点击竞价</button></td>
                                <td>12000</td>
                                <td class="red">344.76</td>
                                <td class="green">23</td>
                                <td>22.43</td>
                                <td>22</td>
                                <td>+13.3%</td>
                                <td>32.23</td>
                            </tr>
                            <tr>
                                <td class="name">大鸡腿150g以上A3六合10<br/><span class="code">323222</span><button class="btn">点击竞价</button></td>
                                <td>12000</td>
                                <td class="red">344.76</td>
                                <td class="green">23</td>
                                <td>22.43</td>
                                <td>22</td>
                                <td>+13.3%</td>
                                <td>32.23</td>
                            </tr>
                            <tr>
                                <td class="name">大鸡腿150g以上A3六合10<br/><span class="code">323222</span><button class="btn">点击竞价</button></td>
                                <td>12000</td>
                                <td class="red">344.76</td>
                                <td class="green">23</td>
                                <td>22.43</td>
                                <td>22</td>
                                <td>+13.3%</td>
                                <td>32.23</td>
                            </tr>
                            <tr>
                                <td class="name">大鸡腿150g以上A3六合10<br/><span class="code">323222</span><button class="btn">点击竞价</button></td>
                                <td>12000</td>
                                <td class="red">344.76</td>
                                <td class="green">23</td>
                                <td>22.43</td>
                                <td>22</td>
                                <td>+13.3%</td>
                                <td>32.23</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
	import NavFooter from '../components/NavFooter.vue';
	import NavHeader from '../components/NavHeader.vue';
	import TopNews from '../components/TopNews.vue';
	export default {
		components : {
			NavFooter,
			TopNews,
			NavHeader,
		},
		methods :{
			toTradeDetail(){
				this.$router.push('stockDetail');
			}
		}
	}
</script>
<style>
	.h-scroll-panel {
            background-color: #fff;
            border-bottom: 1px solid #e9e9e9;
            line-height: 0;
            height: 0.8rem;
        }
        
        .h-scroll-panel .wrapper {
            overflow: hidden;
            margin: 0 .3rem;
            overflow: hidden;
        }
        
        .h-scroll-panel .wrapper ul {
            line-height: 0rem;
            white-space: nowrap;
            display: inline-block;
        }
        
        .h-scroll-panel .wrapper ul li {
            line-height: .8rem;
            margin-right: .3rem;
            color: #2e2f33;
            padding: 0 .1rem;
            font-size: .25rem;
            display: inline-block;
            position: relative;
        }
        
        .h-scroll-panel .wrapper ul li.active::after {
            content: '';
            background: #22ac38;
            display: inline-block;
            width: 100%;
            height: 0.05rem;
            width: 100%;
            position: absolute;
            left: 0;
            bottom: 0;
        }
        
        .layout-panel {
            position: absolute;
            top: 1.6rem;
            bottom: 0;
            left: 0;
            width: 100%;
        }
        
        .layout-panel .two-level-classification {
            position: absolute;
            top: 0;
            bottom: 0;
            background-color: #f0f1f7;
            overflow: hidden;
        }
        
        .layout-panel .two-level-classification ul li {
            height: .8rem;
            color: #2e2f33;
            line-height: .8rem;
            border-bottom: 1px solid #dcdcdc;
            font-size: .25rem;
            text-align: center;
            width: 1.8rem;
        }
        
        .layout-panel .two-level-classification ul li.active {
            color: #22ac38;
            background-color: #fff;
        }
        
        .layout-panel .goods-list-wrapper {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 2rem;
            background-color: #fff;
            width: 5.5rem;
            overflow: auto;
        }
        
        .layout-panel .goods-list-wrapper table {}
        
        .layout-panel .goods-list-wrapper table th {
            color: #191717;
            font-size: 0.24rem;
            text-align: center;
            white-space: nowrap;
            height: 0.6rem;
        }
        
        .layout-panel .goods-list-wrapper table th .click-to-enter {
            color: #191717;
            font-size: 0.18rem;
        }
        
        .layout-panel .goods-list-wrapper table th:first-child {
            text-align: left;
        }
        
        .layout-panel .goods-list-wrapper .table-content {
            position: absolute;
            top: 0.6rem;
            bottom: 0;
            left: 0;
            overflow: auto;
        }
        
        .layout-panel .goods-list-wrapper .table-content table td {
            color: #111010;
            font-size: 0.25rem;
            text-align: center;
            white-space: nowrap;
            min-width: 1.2rem;
            height: 0.9rem;
            border-bottom: 1px solid #e5e5e5;
            padding-left: 0.05rem;
            padding-right: 0.05rem;
        }
        
        .layout-panel .goods-list-wrapper .table-content table td:first-child {
            text-align: left;
            padding-left: 0rem;
        }
        
        .layout-panel .goods-list-wrapper .table-content table td.name {
            font-size: 0.23rem;
        }
        
        .layout-panel .goods-list-wrapper .table-content table td.green {
            color: #22ac38;
        }
        
        .layout-panel .goods-list-wrapper .table-content table td.red {
            color: #ff0000;
        }
        
        .layout-panel .goods-list-wrapper .table-content table td .code {
            font-size: 0.2rem;
            color: #b1b1b1;
            padding-right: 0.1rem;
            vertical-align: bottom;
        }
        
        .layout-panel .goods-list-wrapper .table-content table td .btn {
            font-size: 0.18rem;
            color: #fff;
            background: #1d2088;
            border: none;
            outline: none;
            border-radius: 0.2rem;
            line-height: 0.25rem;
            height: 0.25rem;
            margin-top: 0.1rem;
        }
        
        .ad-img-large {
            height: 2.6rem;
            background: url('../assets/ad1.png') center center no-repeat;
            background-size: 100%;
        }
        
        .ad-img-small {
            height: 1.45rem;
            background: url('../assets/ad2.png') center center no-repeat;
            margin-top: 0.1rem;
            background-size: 100%;
        }
        
        .content {
            background: #fff;
        }
        
        .sort-arrow {
            display: inline-block;
            width: 0.1rem;
            height: 0.24rem;
            position: relative;
        }
        
        .sort-arrow::before {
            content: '';
            position: absolute;
            top: 0;
            border-top: 0.06rem solid transparent;
            border-bottom: 0.06rem solid #b0b0b0;
            border-left: 0.06rem solid transparent;
            border-right: 0.06rem solid transparent;
        }
        
        .sort-arrow::after {
            content: '';
            position: absolute;
            bottom: -0.05rem;
            border-top: 0.06rem solid #ff0000;
            border-bottom: 0.06rem solid transparent;
            border-left: 0.06rem solid transparent;
            border-right: 0.06rem solid transparent;
        }
        
        .sort-arrow.active::before {
            border-bottom: 0.06rem solid #ff0000;
        }
        
        .sort-arrow.active::after {
            border-top: 0.06rem solid #b0b0b0;
        }
</style>