<template>
	<div class="five-grade-panel" @click="changePrices">
		<table class="five-grade">
			<tbody>
				<tr v-for="({prices, num},index) of sellFiveGradeReverse" :key="index">
					<td class="tl">卖{{5-index}}</td>
					<td class="tc red" :data-prices="prices">{{prices}}</td>
					<td class="tr green">{{num}}</td>
				</tr>
				<tr>
					<td colspan="3" class="cutting-line"></td>
				</tr>
				<tr v-for="({prices, num},index) of buyFiveGrade" :key="index">
					<td class="tl">买{{index+1}}</td>
					<td class="tc red" :data-prices="prices">{{prices}}</td>
					<td class="tr blue">{{num}}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>
<script>
	export default {
		computed : {
			sellFiveGradeReverse(){
				return this.sellFiveGrade.reverse();
			}
		},
		props : {
			buyFiveGrade : {
				type : Array,
				required : true
			},
			sellFiveGrade : {
				type : Array,
				required : true
			},
		},
		methods : {
			changePrices (e){
				var prices = e.target.getAttribute('data-prices');
				if(prices !== null){
					this.$emit('changePrices',prices)
				}
			}
		}
	}
</script>
<style lang='scss'>
	@import '../scss/mixins.scss';
	.five-grade-panel {
  		float: right;
  		background-color: #fff;
  		width: 2.48rem;
  		height: 5.14rem;
  		border: 1px solid #e5e5e5;
  		padding: .05rem .15rem 0 .2rem;
	}

	.five-grade {
  		width: 100%;
  		font-size: .18rem;
	}

	.five-grade .cutting-line {
  		height: 0px;
  		position: relative;
  		@include hairline(bottom , #e5e5e5);  
	}

	.five-grade td {
  		height: .49rem;
  		width: 30.3%;
	}

	.five-grade th {
  		font-weight: 300;
  		height: .54rem;
  		border-bottom: 1px solid #b4bbd6;
	}

</style>
