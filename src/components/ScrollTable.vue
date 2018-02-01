<template>
	<div class="scroll-table" ref="scrollTable">
				<!--表格标题-->
				<!--表格标题-->
				<div class="scroll-table-title">
					<!-- 左上角（固定，不参与滚动） -->
					<div class="scroll-table-title-left">
						<table><tr><td>{{colsTitle[0]}}</td></tr></table>
					</div>
					<!-- 上滚动栏（表格标题） -->
					<div class="scroll-table-title-right">
						<table>
							<tr><td :key="index" v-for="(name,index) in rightSideColsName">{{name}}</td></tr>
						</table>
					</div>
				</div>
				<!-- 表格内容 -->
				<div class="scroll-table-content">
					<!--<div class="mui-hidden hold-tips hold-sell-tips">您还没有持仓哦。</div>-->
					<!-- 左边固定部分 -->
					<div class="scroll-table-content-left">
						<table class="">
							<tr :key="index" v-for="(item,index) of colsContent" class="">
								<td>
									{{item.code}}
								</td>
							</tr>
						</table>
					</div>
					<!-- 右边滚动部分 -->
					<div class="scroll-table-content-right" style="width:225px;">
						<table class="">
							<tr :key="index" v-for="(item,index) of colsContent" >
								<td>{{item.code}}</td>
								<td>大鸡腿不13212大涨了哈哈哈哈或发多少是多少</td>
								<td>323232</td>
								<td>212</td>
								<td>545454.76</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
</template>
<script>
	var TableScroll = require('../lib/table-scroll').TableScroll;
	export default {
		props : {
			colsWidth : {
				require : true,
				type : Array,
				default : () => [],
			},
			isColClick : {
				require : false,
				type : Boolean,
				default : false,
			},
			colsTitle : {
				require : true,
				type : Array,
				default : () => [],
			},
			colsContent : {
				require : true,
				type : Array,
				default : () => [],
			}
		},
		computed : {
			rightSideColsName (){
				return this.colsTitle.slice(1);
			},
		},
		mounted (){
			this.tableScroll = new TableScroll(this.$refs.scrollTable,this.colsWidth);
		},
		destroyed (){
			
		}
	}
	
</script>
<style>
	.scroll-table{
		position: absolute;
		top:0;
		left:0;
		right:0;
		bottom:0;
		font-size:0.25rem;
		background:#fff;
	}
	.scroll-table-title{
		height:0.6rem;
	}
	.scroll-table-title td{
		height:0.6rem;
	}
	.scroll-table-title-left{
		width:100px;
		display:inline-block;
		height:0.6rem;
		position: relative;
	}
	.scroll-table-title-right{
		position: absolute;
		top:0;
		right:0;
		overflow: hidden;
		z-index:1;
	}
	.scroll-table-content{
		position: absolute;
		overflow: hidden;
		top:0.6rem;
		left:0;
		right:0;
		bottom:0;
		overflow-y: auto;
		overflow-x:hidden;
		font-size:13px;
		color:#555;
	}
	.scroll-table-content td{
		height:1rem;
	}
	.scroll-table-content-left {
		float:left;
		z-index:1;
		position: relative;
	}
	.scroll-table-content-right{
		float:left;
		width:150px;
		z-index:0;
		position: relative;
		overflow-x:hidden;
	}
	.scroll-table table{
		border-collapse: collapse;
	}
	.scroll-table table td,table th{
		text-align: center;
		padding:5px;
		vertical-align: middle;			
	}
	.scroll-table table td{
		white-space: initial;
		word-break:break-all;
	}
	.scroll-table tr{
		white-space: nowrap;
		border-bottom:1px solid #eee;
	}	
</style>
