<template>
	 <div class="page">
        <NavHeader title="交易行情" :isHiddenBack="true"></NavHeader>
        <NavFooter></NavFooter>
        <div class="content">
            <BrandAndClassify>
                <div ref="goods" class="goods-list-wrapper">
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
                    <div ref="tableContent" class="table-content" @click="toTradeDetail">
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
            </BrandAndClassify>
        </div>
    </div>
</template>
<script>
	import NavFooter from '../components/NavFooter.vue';
	import NavHeader from '../components/NavHeader.vue';
	import BrandAndClassify from '../components/BrandAndClassify.vue';
	export default {
		components : {
			NavFooter,
			NavHeader,
			BrandAndClassify,
		},
		methods :{
			toTradeDetail(){
				this.$router.push('stockDetail');
			},
			alignment(){
				var height = this.$refs.goods.offsetHeight - this.$refs.goods.querySelector('.table-head').offsetHeight;
				var tableContent = this.$refs.tableContent;
				console.log(tableContent);
                    tableContent.style.height = height + 'px';
                    var width = 0;
                    setTimeout(function() {
                        var contentTds = [].slice.call(tableContent.querySelectorAll(' tr:first-child td'));
                        var headThs = [].slice.call(tableContent.querySelectorAll('.table-head tr:first-child th'));
                        console.log(contentTds);
                        console.log(headThs);
                        contentTds.forEach(function(td, idx) {
                            headThs[idx].style.minWidth = td.offsetWidth + 'px';
                            width += td.offsetWidth;
                        });
                        tableContent.style.width = width + 'px';
                    }, 0);
			}
		},
		mounted(){
			this.alignment();
		}
	}
</script>
<style>
        .list-layout-panel .two-level-classification {
            position: absolute;
            top: 0;
            bottom: 0;
            background-color: #f0f1f7;
            overflow: hidden;
        }
        
        .list-layout-panel .two-level-classification ul li {
            height: .8rem;
            color: #2e2f33;
            line-height: .8rem;
            border-bottom: 1px solid #dcdcdc;
            font-size: .25rem;
            text-align: center;
            width: 1.8rem;
        }
        
        .list-layout-panel .two-level-classification ul li.active {
            color: #22ac38;
            background-color: #fff;
        }
        
        .list-layout-panel .goods-list-wrapper {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 2rem;
            background-color: #fff;
            width: 5.5rem;
            overflow: auto;
        }
        
        .list-layout-panel .goods-list-wrapper table {}
        
        .list-layout-panel .goods-list-wrapper table th {
            color: #191717;
            font-size: 0.24rem;
            text-align: center;
            white-space: nowrap;
            height: 0.6rem;
        }
        
        .list-layout-panel .goods-list-wrapper table th .click-to-enter {
            color: #191717;
            font-size: 0.18rem;
        }
        
        .list-layout-panel .goods-list-wrapper table th:first-child {
            text-align: left;
        }
        
        .list-layout-panel .goods-list-wrapper .table-content {
            position: absolute;
            top: 0.6rem;
            bottom: 0;
            left: 0;
            overflow: auto;
        }
        
        .list-layout-panel .goods-list-wrapper .table-content table td {
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
        
        .list-layout-panel .goods-list-wrapper .table-content table td:first-child {
            text-align: left;
            padding-left: 0rem;
        }
        
        .list-layout-panel .goods-list-wrapper .table-content table td.name {
            font-size: 0.23rem;
        }
        
        .list-layout-panel .goods-list-wrapper .table-content table td.green {
            color: #22ac38;
        }
        
        .list-layout-panel .goods-list-wrapper .table-content table td.red {
            color: #ff0000;
        }
        
        .list-layout-panel .goods-list-wrapper .table-content table td .code {
            font-size: 0.2rem;
            color: #b1b1b1;
            padding-right: 0.1rem;
            vertical-align: bottom;
        }
        
        .list-layout-panel .goods-list-wrapper .table-content table td .btn {
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
