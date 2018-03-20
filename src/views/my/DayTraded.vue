<template>
	<div class="page">
		<NavHeader title="当日成交"></NavHeader>
		<div class="content">
			<ScrollTable :colsWidth="colsWidth" :colsTitle="colsName" :colsContent="dayTradedList"></ScrollTable>
		</div>
	</div>
</template>
<script>
	import NavHeader from '../../components/NavHeader.vue';
	import ScrollTable from '../../components/ScrollTable.vue';
	import {httpGet} from '../../api';
	export default {
		data : () => ({
			dayTradedList : [],
			colsWidth : [80, 70, 170, 110, 80, 90, 90, 90, 90, 90],// 可撤单表列宽
			colsName : ['商品代码','商品名称','成交时间','买/卖','订/转','成交价格','成交数量','手续费','委托编号','成交编号'],// 可撤单表列名
		}),
		methods : {
			/*
			 * 获取当日成交列表
			 */
			async getDayTradedList (){
				let dayTradedList = await httpGet('300011');
				let leftContent = [];
				let rightContent = [];
				for({code} of dayTradedList){
					leftContent.push(code);
				}
				for({name, tradedTime, tradedDirection, dt, tradedPrices, tradedAmount, serviceChange, entrustNo, tradedNo} of dayTradedList){
					rightContent.push([name, tradedTime, tradedDirection, dt, tradedPrices, tradedAmount, serviceChange, entrustNo, tradedNo]);
				}
				this.dayTradedList = [leftContent,rightContent];
			}
		},
		components : {
			NavHeader,
			ScrollTable,
		},
		mounted (){
			this.getDayTradedList();
		}
	}
</script>
