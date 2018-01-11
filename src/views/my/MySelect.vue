<template>
	<div class="page" >

	<NavHeader title="自选产品管理"></NavHeader>

    <div class="content layout-panel">
        <div class="goods-list-wrapper">
            <div class="goods-item">
                <div class="item-cell goods-img"></div>
                <div class="item-cell item-cell-content">
                    <h5>大鸡腿快到碗里来 <span>成交总量：<span style="font-weight:bold;">3232323</span></span>
                    </h5>
                    <table>
                        <tr>
                            <td>卖价一：23</td>
                            <td>卖量一：233</td>
                            <td>卖价二：233</td>
                            <td>卖量二：23</td>
                        </tr>
                    </table>
                    <p>涨跌幅：<span class="green">-232%</span >涨跌额：<span class="green">12323</span> <button>删除产品</button></p>
                </div>
            </div>
            <div class="goods-item">
                <div class="item-cell goods-img"></div>
                <div class="item-cell item-cell-content">
                    <h5>大鸡腿快到碗里来 <span>成交总量：3232323</span></h5>
                    <table>
                        <tr>
                            <td>卖价一:23</td>
                            <td>卖价二:233</td>
                            <td>卖量一:233</td>
                            <td>卖量二:23</td>
                        </tr>
                    </table>
                    <p>涨跌幅：<span class="green">-232%</span >涨跌额：<span class="green">12323</span> <button>删除产品</button></p>
                </div>
            </div>
            <div class="goods-item">
                <div class="item-cell goods-img"></div>
                <div class="item-cell item-cell-content">
                    <h5>大鸡腿快到碗里来 <span>成交总量：3232323</span></h5>
                    <table>
                        <tr>
                            <td>卖价一:23</td>
                            <td>卖价二:233</td>
                            <td>卖量一:233</td>
                            <td>卖量二:23</td>
                        </tr>
                    </table>
                    <p>涨跌幅：<span class="green">-232%</span >涨跌额：<span class="green">12323</span> <button>删除产品</button></p>
                </div>
            </div>
            
            

        </div>
        <div class="add-select-panel">
            <h4>添加自选</h4>
            <p>随时跟踪自选产品最新动态</p>
            <router-link to="/search" tag="button" type="button"  class="btn">立即添加</router-link>
        </div>
    </div>
</div>
</template>
<script>
	import NavHeader from '../../components/NavHeader.vue';
	export default{
		name : 'my-select',
		data : function(){
			return {
				code : ''
			}
		},
		components : {
			NavHeader,
		},
		methods :{
			onInput(){
				alert(this.code);
			}
		},
		
	}
</script>
<style scoped lang="scss">
	@import '../../scss/mixins.scss';
	.add-select-panel {
    	width: 100%;
    	height: 2.4rem;
    	padding-top: .20rem;
    	background-color: #fff;
    	text-align: center;
    	position: absolute;
    	bottom:0;
    	width:100%;
    	left:0;
	}
	.add-select-panel h4 {
    	font-size: .3rem;
    	margin: 0;
    	padding: 0;
    	font-weight: 400;
	}
	.add-select-panel p {
    	margin: .15rem 0;
   	 	padding: 0;
    	font-size: .18rem;
	}
	.add-select-panel button.btn {
    	display: block;
    	width: 2.8rem;
    	height: .8rem;
    	line-height: .8rem;
    	color: #fff;
    	font-size: .3rem;
    	margin: 0 auto;
        background: -webkit-linear-gradient(124deg, #007936, #00be54);
    	box-shadow: 0 1px 4px 0 #009944;
    	border: none;
    	border-radius: .4rem;
	}

.layout-panel .goods-list-wrapper {
    position: absolute;
    top: 0;
    bottom: 2.2rem;
    right: 0;
    left: 0;
    background-color: #fff;
    width: 100%;
    overflow: auto;
    background: #eee;
    margin-bottom:10px;
}

.layout-panel .goods-item {
    display: table;
    box-sizing: border-box;
    width: 100%;
    padding: 0.2rem;
    font-size: 0.18rem;
    background-color: #fff;
    @include hairline(bottom , #e7e7f1);  
    position: relative;
}

.goods-item table {
    width: 100%;
}

.item-cell p {
    height: 0.38rem;
    line-height: 0.38rem;
    margin: 0;
    font-size: 0.18rem;
    color: #39394c
}

.item-cell p>span:first-child {
    padding-right: 0.5rem;
}

.item-cell p>span {
    font-weight: bold;
}

.green {
    color: #22ac38 !important;
}

.layout-panel .item-cell {
    display: table-cell;
}

.layout-panel .goods-img {
    width: 1.4rem;
    background: url(../../assets/goods-img1.png) no-repeat;
    background-position: center;
    background-size: 100%;
}

.layout-panel .item-cell-content {
    padding-left: 0.19rem;
}

.layout-panel .item-cell-content td {
    padding-top: 0.1rem;
    padding-bottom: 0.1rem;
    color: #39394c;
    font-size: 0.18rem;
}

.layout-panel .item-cell-content button{
    background: #1d2088;
    color: #fff;
    border: none;
    outline: none;
    border-radius: 0.3rem;
    float: right;
    line-height: 1;
    padding: 0.1rem 0.5rem;
    font-size: 0.18rem;
    font-weight: bold;
}

.layout-panel .item-cell-content td strong:first-child {
    padding-right: 0.1rem;
}

.layout-panel .item-cell h5 {
    margin: 0;
    color: #39394c;
    font-weight: 100;
    font-size: .23rem;
    padding-top: 0.08rem;
    padding-bottom: 0.1rem;
}

.layout-panel .item-cell h5 span {
    float: right;
    color: #1d2088;
}
</style>