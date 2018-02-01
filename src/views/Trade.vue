<template>
<div class="page" >
	<NavHeader title="交易" :isHiddenBack="true"></NavHeader>
	<NavFooter></NavFooter>
	<div class="content">
		<ul class="nav-tab" @click="navTab">
			<li class="active">买入</li>
			<li>卖出</li>
			<li>撤单</li>
			<li >持有</li>
		</ul>
		<div class="tab-content" v-bind:class="tabContentIndex==0 ? 'show' : '' ">
			<FreeOnBoard></FreeOnBoard>
			<div class="stock-panel  mt10">
				<FiveGrade></FiveGrade>
				<div class="input-panel">
					<div class="input-text">
						<input type="text" placeholder="" value="AA0018">
					</div>
					<div class="input-text">
						<input type="text" placeholder="" value="三黄土鸡 0.7kg/只A2德鑫盛">
					</div>
					<div class="input-num">
						<span class="pric-">—</span>
						<input type="text" class="pricvle" value="198.24" placeholder="请输入买入价格">
						<span class="pricall">+</span>
					</div>
					<div class="f25">最大可买数量：312</div>
					<div class="input-num mt20">
						<span class="mun-">—</span>
						<input type="text" class="munvle" value="20" placeholder="请输入买入数量">
						<span class="munall">+</span>
					</div>
					<div class="shortcut-select">
						<ul>
							<li>100%</li>
							<li>75%</li>
							<li class="active">50%</li>
							<li>25%</li>
							<li>10%</li>
						</ul>
					</div>
				</div>
				<div class="clear"></div>
				<div class="large-btn mt10">
					<button type="button">立即买入</button>
				</div>
			</div>
			<HistoryBrowse></HistoryBrowse>
		</div>
		<div class="tab-content" v-bind:class="tabContentIndex==1 ? 'show' : '' ">
			<FreeOnBoard></FreeOnBoard>
			<div class="stock-panel mt10">
				<FiveGrade></FiveGrade>
				<div class="input-panel">
					<div class="input-text">
						<input type="text" placeholder="" value="AA0018">
					</div>
					<div class="input-text">
						<input type="text" placeholder="" value="三黄土鸡 0.7kg/只A2德鑫盛">
					</div>
					<div class="input-num">
						<span class="pric-">—</span>
						<input type="text" class="pricvle" value="198.24" placeholder="请输入买入价格">
						<span class="pricall">+</span>
					</div>
					<div class="f25">最大可买数量：312</div>
					<div class="input-num mt20">
						<span class="mun-">—</span>
						<input type="text" class="munvle" value="20" placeholder="请输入买入数量">
						<span class="munall">+</span>
					</div>
					<div class="shortcut-select">
						<ul>
							<li>100%</li>
							<li>75%</li>
							<li class="active">50%</li>
							<li>25%</li>
							<li>10%</li>
						</ul>
					</div>
				</div>
				<div class="clear"></div>
				<div class="large-btn mt10">
					<button type="button">立即卖出</button>
				</div>
			</div>
			<HistoryBrowse></HistoryBrowse>
		</div>
		<div class="tab-content" v-bind:class="tabContentIndex==2 ? 'show' : '' ">
			<ScrollTable :colsWidth="revokableOTColsWidth" :colsTitle="revokableOTColsName" :colsContent="revokableOTColsContent"></ScrollTable>
			<!--<div class="cancelOrder-btn-wrapper">
                <button disabled class="cancelOrder-btn" @click="toCancelCurrDayTradedOrder">撤单</button>
            </div>-->
		</div>
		<div class="tab-content" v-bind:class="tabContentIndex==3 ? 'show' : '' ">
			<ScrollTable :colsWidth="holdTableColsWidth" :colsTitle="holdTableColsName" :colsContent="holdTableColsContent"></ScrollTable>
		</div>
	</div>

</div>

</template>
<script>
	import NavFooter from '../components/NavFooter.vue';
	import NavHeader from '../components/NavHeader.vue';
	import ScrollTable from '../components/ScrollTable.vue';
	import FiveGrade from '../components/FiveGrade.vue';
	import HistoryBrowse from '../components/HistoryBrowse.vue';
	import FreeOnBoard from '../components/FreeOnBoard.vue';
	export default {
		data : () => ({
			tabContentIndex : 0,
			revokableOTColsWidth : [80, 70, 170, 110, 80, 90, 90, 90, 90, 90],// 可撤单表列宽
			revokableOTColsName : ['商品代码','商品名称','委托时间','买/卖','订/转','委托价格','委托数量','成交数量','委托编号','状态'],// 可撤单表列名
			revokableOTColsContent : [{}],
			holdTableColsWidth : [80, 50, 170, 110, 80, 90, 90, 90, 90, 90],// 持仓表列宽
			holdTableColsName : ['商品代码','买卖','商品名称','持有量','可用量','持有总成本'],// 持仓表列名
			holdTableColsContent : [{}],
		}),
		methods : {
			navTab(e){
				var target = e.target || e;
                if (target.tagName.toLowerCase() !== 'li') {
                    return;
                }
                var parent = target.parentNode;
                parent.querySelector('.active').classList.toggle('active');
                target.classList.toggle('active');
                var childNodes = parent.children;
                for (var i = 0; i < 4; i++) {
                    if(childNodes[i] === target){
                    	break;
                    }
                }
               	this.tabContentIndex = i;
			}
		},
		components : {
			NavFooter,
			NavHeader,
			ScrollTable,
			FiveGrade,
			HistoryBrowse,
			FreeOnBoard,
		}
	}
</script>
<style lang="scss">
	.stock-panel {
  margin-bottom: .1rem;
  overflow: hidden;
  padding: .2rem .15rem 0;
  height: 6.5rem;
  background: #fff;
}
.f25{
	font-size:0.25rem;
}
.stock-panel .input-panel {
  width: 4.6rem;
  float: left;
  background-color: #fff;
  height: 5.14rem;
}
.input-panel .input-text {
  height: .75rem;
  border: 1px solid #e5e5e5;
  margin-bottom: .20rem;
}

.input-panel .input-text span {
  font-size: .25rem;
  float: left;
}

.input-panel .input-text input {
  font-size: .2rem;
  float: left;
  width: 100%;
  height: .70rem;
  padding: .1rem .35rem;
  border: none;
}

.input-panel .input-num {
  height: .75rem;
  border: 1px solid #e5e5e5;
  margin-bottom: .20rem;
}

.input-panel .input-num span:first-child {
  font-size: .25rem;
  float: left;
  background-color: #262992;
  display: block;
  line-height: .73rem;
  text-align: center;
  width: .8rem;
  color: #fff;
}

.input-panel .input-num span:last-of-type {
  font-size: .35rem;
  float: right;
  background-color: #262992;
  display: block;
  line-height: .73rem;
  text-align: center;
  width: .8rem;
  color: #fff;
}

.input-panel .input-num span~input {
  box-sizing: border-box;
  width: 2.9rem;
}

.input-panel .input-num input {
  font-size: .2rem;
  float: left;
  width: 100%;
  height: .70rem;
  padding: .1rem .35rem;
  border: none;
}

.shortcut-select {
  margin-top: .23rem;
  border: 1px solid #ddd;
  height: .76rem;
  font-size: .28rem;
}

.shortcut-select ul li {
  display: table-cell;
  width: 1%;
  text-align: center;
  border-right: 1px solid #ddd;
  line-height: .74rem;
  color: #18469e;
}

.shortcut-select ul li:last-child {
  border-right: none;
}

.shortcut-select ul li.active {
  background-color: #18469e;
  color: #fff;
}

.large-btn {
  border-bottom: none;
  height: 1.3rem;
  padding-top: .1rem;
}

.large-btn button {
  width: 100%;
  float: left;
  height: .8rem;
  border-radius: .06rem;
  font-size: .28rem;
  color: #fff;
  background: -webkit-linear-gradient(#324fff, #1d2088);
  background: url("../assets/kjjj_btn_bg.png") no-repeat;
  background-size: 100%;
  border: none;
  box-shadow: 0 1px 4px 0 #5887ff;
}
.nav-tab {
  background-color: #fff;
  border-bottom: 1px solid #e9e9e9;
  height: .7rem;
  display: table;
  width: 100%;
  position: relative;
  z-index: 2;
}

.nav-tab li {
  box-sizing: border-box;
  height: .7rem;
  vertical-align: middle;
  display: table-cell;
  color: #2e2f33;
  font-size: .25rem;
  text-align: center;
  width: 25%;
  position: relative;
}

.nav-tab li.active {
  color: #22ac38;
}

.nav-tab li.active::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  content: '';
  height: 2px;
  background: #22ac38;
  display: inline-block;
}

.tab-content {
  top: 0.7rem;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
  visibility: hidden;
}

.tab-content.show {
  z-index: 1;
  visibility: visible;
}
</style>
