<template>
	<div class="mt10 history-panel">
		<h5><span>浏览记录</span></h5>
		<div class="goods-wrapper">
			<ul>
				<li>
					<img src="../assets/pic.jpg" alt="">
					<p>三黄土鸡 0.7kg/只A2德鑫盛</p>
				</li>
				<li>
					<img src="../assets/pic.jpg" alt="">
					<p>三黄土鸡 0.7kg/只A2德鑫盛</p>
				</li>
				<li>
					<img src="../assets/pic.jpg" alt="">
					<p>三黄土鸡 0.7kg/只A2德鑫盛</p>
				</li>
				<li>
					<img src="../assets/pic.jpg" alt="">
					<p>三黄土鸡 0.7kg/只A2德鑫盛</p>
				</li>
				<li>
					<img src="../assets/pic.jpg" alt="">
					<p>三黄土鸡 0.7kg/只A2德鑫盛</p>
				</li>
			</ul>
		</div>
	</div>
</template>
<style>
	.history-panel {
  		background-color: #fff;
  		padding-left: .2rem;
  		margin-bottom: .1rem;
  		width: 7.5rem;
  		overflow: hidden;
	}
	.history-panel .goods-wrapper {
  		overflow: auto;
	}

	.history-panel h5 {
  		height: .6rem;
  		padding: .17rem 0;
  		margin: 0;
	}
	.history-panel h5 span {
  		display: block;
  		border-left: .04rem solid #21ac37;
  		padding-left: .2rem;
  		font-size: .25rem;
  		font-weight: 300;
  		line-height: 1;
	}
	.history-panel ul {
  		white-space: nowrap;
  		display: inline-block;
	}
	.history-panel ul li {
  		width: 2.6rem;
 	 	margin-right: .2rem;
  		overflow: hidden;
  		display: inline-block;
	}
	.history-panel ul li img {
  		width: 2.6rem;
  		display: block;
	}
	.history-panel ul li p {
  		margin: 0;
  		padding: 0;
  		font-size: .25rem;
  		text-overflow: ellipsis;
  		white-space: nowrap;
 	 	overflow: hidden;
  		line-height: 2;
	}
</style>