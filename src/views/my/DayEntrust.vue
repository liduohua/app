<template>
	<div class="page">
		<NavHeader title="当日委托"></NavHeader>
		<div class="content">
			<ScrollTable :colsWidth="colsWidth" :colsTitle="colsName" :colsContent="dayEntrustList"></ScrollTable>
		</div>
	</div>
</template>
<script>
	import NavHeader from '../../components/NavHeader.vue';
	import ScrollTable from '../../components/ScrollTable.vue';
	import {httpGet} from '../../api';
	export default {
		data : () => ({
			dayEntrustList : [],
			colsWidth : [80, 70, 170, 110, 80, 90, 90, 90, 90, 90],// 可撤单表列宽
			colsName : ['商品代码','商品名称','委托时间','买/卖','订/转','委托价格','委托数量','成交数量','委托编号','状态'],// 可撤单表列名
		}),
		methods : {
			/*
			 * 获取当日成交列表
			 */
			async getDayEntrustList (){
				let dayEntrustList = await httpGet('300012');
				let leftContent = [];
				let rightContent = [];
				for({code} of dayEntrustList){
					leftContent.push(code);
				}
				for({name, entrustTime, entrustDirection, dt, entrustPrices, entrustAmount, tradedAmount, entrustNo, status} of dayEntrustList){
					rightContent.push([name, entrustTime, entrustDirection, dt, entrustPrices, entrustAmount, tradedAmount, entrustNo, status]);
				}
				this.dayEntrustList = [leftContent,rightContent];
			}
		},
		components : {
			NavHeader,
			ScrollTable,
		},
		mounted (){
			this.getDayEntrustList();
		}
	}
</script>
