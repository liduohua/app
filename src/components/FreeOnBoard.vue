<template>
	<div class="free-on-board">
		<table>
			<tr>
				<th>卖家</th>
				<th>仓库</th>
				<th>离岸价</th>
				<th>到岸价</th>
				<th>数量</th>
			</tr>
			<tr>
				<td>100001</td>
				<td>杭州仓</td>
				<td class="lianjia">46.70</td>
				<td class="daoanjia">54.77</td>
				<td>669</td>
			</tr>
			<tr>
				<td>100001</td>
				<td>杭州仓</td>
				<td class="lianjia">46.70</td>
				<td class="daoanjia">54.77</td>
				<td>669</td>
			</tr>
			<tr>
				<td>100001</td>
				<td>杭州仓</td>
				<td class="lianjia">46.70</td>
				<td class="daoanjia">54.77</td>
				<td>669</td>
			</tr>
		</table>
	</div>
</template>
<style lang="scss">
@import '../scss/mixins.scss';
.free-on-board {
  	background-color: #fff;
  	padding: .2rem;
}

.free-on-board table {
  	width: 100%;
  	text-align: center;
}

.free-on-board th {
  	height: .55rem;
  	font-size: .2rem;
  	font-weight: 300;
  	position: relative;
  	@include hairline(bottom , #b4bbd6);  
}

.free-on-board td {
  	height: .6rem;
  	font-size: .22rem;
  	font-weight: 700;
}
</style>
