<template>
	<div class="five-grade-panel">
		<table class="five-grade">
			<tbody>
				<tr onclick="priceset(198.24,669)">
					<td class="tl">卖5</td>
					<td class="tc red">198.24</td>
					<td class="tr blue">669</td>
				</tr>
				<tr onclick="priceset(198.24,669)">
					<td class="tl">卖4</td>
					<td class="tc red">198.24</td>
					<td class="tr blue">669</td>
				</tr>
				<tr onclick="priceset(198.54,9)">
					<td class="tl">卖3</td>
					<td class="tc red">198.54</td>
					<td class="tr blue">9</td>
				</tr>
				<tr onclick="priceset(197.24,679)">
					<td class="tl">卖2</td>
					<td class="tc red">197.24</td>
					<td class="tr blue">679</td>
				</tr>
				<tr onclick="priceset(173.62,1407)">
					<td class="tl">卖1</td>
					<td class="tc red">173.62</td>
					<td class="tr blue">1407</td>
				</tr>
				<tr>
					<td colspan="3" class="cutting-line"></td>
				</tr>
				<tr onclick="priceset(198.24,669)">
					<td class="tl">买5</td>
					<td class="tc red">198.24</td>
					<td class="tr blue">669</td>
				</tr>
				<tr onclick="priceset(198.24,669)">
					<td class="tl">买4</td>
					<td class="tc red">198.24</td>
					<td class="tr blue">669</td>
				</tr>
				<tr onclick="priceset(198.24,669)">
					<td class="tl">买3</td>
					<td class="tc red">198.24</td>
					<td class="tr blue">669</td>
				</tr>
				<tr onclick="priceset(198.24,669)">
					<td class="tl">买2</td>
					<td class="tc red">198.24</td>
					<td class="tr blue">669</td>
				</tr>
				<tr onclick="priceset(173.62,1407)">
					<td class="tl">买1</td>
					<td class="tc red">173.62</td>
					<td class="tr blue">1407</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

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