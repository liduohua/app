<template>
	<div class="page">
		<NavHeader title="历史委托"></NavHeader>
		<div class="content">
			<ScrollTable @infinite="toLoadNextPage" :noMoreData="noMoreData"  :isScrolling="true" :colsWidth="colsWidth" :colsTitle="colsName" :colsContent="historyTradedList"></ScrollTable>
		</div>
	</div>
</template>
<script>
	import NavHeader from '../../components/NavHeader.vue';
	import ScrollTable from '../../components/ScrollTable.vue';
	import {httpGet} from '../../api';
	export default {
		data : () => ({
			historyTradedList : [],
			colsWidth : [80, 70, 170, 110, 80, 90, 90, 90, 90, 90],// 
			colsName : ['商品代码','商品名称','成交时间','买/卖','订/转','成交价格','成交数量','手续费','委托编号','成交编号'],// 
			leftContent : [],
			rightContent : [],
			pageIndex : 0,
			noMoreData : false,
		}),
		methods : {
			/*
			 * 获取历史成交列表
			 */
			async getHistoryTradedList (infinte){
				let historyTradedList = await httpGet('300013');
				for({code} of historyTradedList){
					this.leftContent.push(code);
				}
				for({name, tradedTime, tradedDirection, dt, tradedPrices, tradedAmount, serviceChange, entrustNo, tradedNo} of historyTradedList){
					this.rightContent.push([name, tradedTime, tradedDirection, dt, tradedPrices, tradedAmount, serviceChange, entrustNo, tradedNo]);
				}
				this.historyTradedList = [this.leftContent,this.rightContent];
				if(this.pageIndex > 5){
					infinte.end(true);
					this.noMoreData = true;
				}else{
					this.pageIndex++;
					infinte.end(false);
				}
			},
			toLoadNextPage (infinte){
				this.getHistoryTradedList(infinte);
			}
		},
		components : {
			NavHeader,
			ScrollTable,
		},
		mounted (){
			//this.getHistoryTradedList();
		}
	}
</script>
