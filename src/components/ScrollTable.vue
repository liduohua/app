<template>
	<div class="scroll-table" ref="scrollTable">
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
		<div class="scroll-table-content" :data-auto-load="isScrolling" ref="infinteContainer" @infinite="triggerInfinite">
			<!--<div class="mui-hidden hold-tips hold-sell-tips">您还没有持仓哦。</div>-->
			<!-- 左边固定部分 -->
			<div class="scroll-table-content-left">
				<table class="">
					<tr :key="index" v-for="(rightLine,index) of colsContent[0]" class="">
						<td>
							{{rightLine}}
						</td>
					</tr>
				</table>
			</div>
			<!-- 右边滚动部分 -->
			<div class="scroll-table-content-right" style="width:225px;">
				<table class="">
					<tr :key="index" v-for="(leftLine,index) of colsContent[1]" >
						<td v-for="(item,index) of leftLine">{{item}}</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
	var TableScroll = require('../lib/table-scroll').TableScroll;
	import InfiniteScroll from '../lib/InfiniteScroll';
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
			},
			isScrolling : {
				require : false,
				type :Boolean,
				default : false
			},
			noMoreData : {
				require : false,
				type : Boolean,
				default : false
			}
		},
		watch : {
			colsTitle (val){
				setTimeout(() => {
					this.tableScroll.alignHeight();
				})
			},
			colsContent (val){
				setTimeout(() => {
					this.tableScroll.alignHeight();
				})
			}
		},
		computed : {
			rightSideColsName (){
				return this.colsTitle.slice(1);
			},
		},
		mounted (){
			this.tableScroll = new TableScroll(this.$refs.scrollTable,this.colsWidth);
			if(this.isScrolling){
				this.infinte = new InfiniteScroll(this.$refs.infinteContainer);
			}
		},
		methods : {
			triggerInfinite (){
				this.$emit('infinite', this.infinte);
			}
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
	.scroll-table-content-right::after{
		content : ' ';
		clear:both;
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
