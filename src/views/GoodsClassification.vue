<template>
	<div class="page">
        <NavHeader title="商品分类"></NavHeader>
        <NavFooter></NavFooter>
        <div class="content">
            <BrandAndClassify>
                <div class="goods-list-wrapper">
                    <div class="goods-item">
                        <a href="tradeDetail.html" class="item-cell goods-img">

                        </a>
                        <div class="item-cell item-cell-content">
                            <h5><a href="tradeDetail.html">大鸡腿快到碗里来</a></h5>
                            <table>
                                <tr>
                                    <td>卖价一：23</td>
                                    <td>卖价二：233</td>
                                </tr>
                                <tr>
                                    <td>卖量一：233</td>
                                    <td>卖量二：23</td>
                                </tr>
                                <tr>
                                    <td colspan="2">涨跌幅：<strong class="red">+23.33%</strong> 涨跌幅：<strong class="red">+32.323</strong></td>
                                </tr>
                                <tr>
                                    <td class="dark-blue" colspan="2">可售量：<strong>232332</strong><a href="priceBiding.html"><button>快速竞价</button></a></td>
                                </tr>
                            </table>
                        </div>

                    </div>
                    <div class="goods-item">
                        <div class="item-cell goods-img" style="background-image:url(../assets/goods-img2.png)"></div>
                        <div class="item-cell item-cell-content">
                            <h5>大鸡腿快到碗里来</h5>
                            <table>
                                <tr>
                                    <td>卖价一：23</td>
                                    <td>卖价二：233</td>
                                </tr>
                                <tr>
                                    <td>卖量一：233</td>
                                    <td>卖量二：23</td>
                                </tr>
                                <tr>
                                    <td colspan="2">涨跌幅：<strong class="red">+23.33%</strong> 涨跌幅：<strong class="red">+32.323</strong></td>
                                </tr>
                                <tr>
                                    <td class="dark-blue" colspan="2">可售量：<strong>232332</strong><button>快速竞价</button></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="goods-item">
                        <div class="item-cell goods-img" style="background-image:url(../assets/goods-img3.png)"></div>
                        <div class="item-cell item-cell-content">
                            <h5>大鸡腿快到碗里来</h5>
                            <table>
                                <tr>
                                    <td>卖价一：23</td>
                                    <td>卖价二：233</td>
                                </tr>
                                <tr>
                                    <td>卖量一：233</td>
                                    <td>卖量二：23</td>
                                </tr>
                                <tr>
                                    <td colspan="2">涨跌幅：<strong class="red">+23.33%</strong> 涨跌幅：<strong class="red">+32.323</strong></td>
                                </tr>
                                <tr>
                                    <td class="dark-blue" colspan="2">可售量：<strong>232332</strong><button>快速竞价</button></td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="goods-item">
                        <div class="item-cell goods-img" style="background-image:url(../assets/goods-img4.png)"></div>
                        <div class="item-cell item-cell-content">
                            <h5>大鸡腿快到碗里来</h5>
                            <table>
                                <tr>
                                    <td>卖价一：23</td>
                                    <td>卖价二：233</td>
                                </tr>
                                <tr>
                                    <td>卖量一：233</td>
                                    <td>卖量二：23</td>
                                </tr>
                                <tr>
                                    <td colspan="2">涨跌幅：<strong class="red">+23.33%</strong> 涨跌幅：<strong class="red">+32.323</strong></td>
                                </tr>
                                <tr>
                                    <td class="dark-blue" colspan="2">可售量：<strong>232332</strong><button>快速竞价</button></td>
                                </tr>
                            </table>
                        </div>
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
		}
	}
</script>
<style scoped>
     

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
            left: 1.8rem;
            background-color: #fff;
            width: 5.7rem;
            overflow: auto;
        }

        .list-layout-panel .goods-item {
            display: table;
            box-sizing: border-box;
            width: 100%;
            padding: 0.2rem;
            border-bottom: 1px solid #e7e7f1;
            font-size: 0.18rem;
        }

        .list-layout-panel .item-cell {
            display: table-cell;
        }

        .list-layout-panel .goods-img {
            width: 2rem;
            background: url(../assets/goods-img1.png) no-repeat;
            background-position: center;
            background-size: 100%;
        }

        .list-layout-panel .item-cell-content {
            padding-left: 0.19rem;
        }

        .list-layout-panel .item-cell-content td {
            padding-top: 0.08rem;
            padding-bottom: 0.08rem;
            color: #39394c;
        }

        .list-layout-panel .item-cell-content button {
            background: #1d2088;
            color: #fff;
            border: none;
            outline: none;
            height: 0.25rem;
            border-radius: 0.2rem;
            line-height: 0.25rem;
        }

        .list-layout-panel .item-cell-content td strong.red {
            color: red;
        }

        .list-layout-panel .item-cell-content td strong.red {
            color: red;
        }

        .list-layout-panel .item-cell-content td.dark-blue {
            color: #1d2088;
        }

        .list-layout-panel .item-cell-content td strong:first-child {
            padding-right: 0.1rem;
        }

        .list-layout-panel .item-cell h5 {
            margin: 0;
            color: #39394c;
            font-weight: 100;
            font-size: .23rem;
            padding-top: 0.08rem;
            padding-bottom: 0.08rem;
        }
</style>