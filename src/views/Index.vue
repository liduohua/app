<template>
	<div class="page">
		<NavHeader></NavHeader>
		<div class='content'>
			<p>实时金价</p>
			<div class='gold-prices-panel'>
				<label class='prices'><span >283.11</span>元/克</label><br />
				<label class="market-prices">市场价: 340.00元/克</label><br />
				<label class="to-see-prices-trend">金价走势</label>
				<button class="btn">买入</button>
			</div>
			<canvas ref="canvas" width="100" height="100"></canvas>
		</div>
	</div>
</template>
<style scoped lang="scss">
@import '../scss/mixins.scss';
	.content{
		border:1px solid red;
	}
	p{
		padding-left:20px;
		font-size:1rem;
	}
	.gold-prices-panel{
		background:$white;
		padding:10px 20px;
		position:relative;
	}
	.prices{
		color:$yellow;
		
	}
	.prices span{
		font-size:1.6rem;
		padding-right:0.5rem;
	}
	.market-prices{
		color:$gray;
		
	}
	.to-see-prices-trend{
		color:$yellow;
	}
	.btn{
		height:2.5rem;
		position:absolute;
		right:20px;
		top:50%;
		@include vendor-prefix(transform,translateY(-50%));
		font-size:1.2rem;
		color:$white;
		background:$yellow;
		padding:5px 2rem;
		border:none;
		border-radius:5px;
		outline:none;
	}
</style>
<script>
	import NavHeader from '../components/NavHeader.vue';
	export default {
		components : {
			NavHeader,
		},
		created (){
			
			var ctx = this.$refs.canvas;
			console.log(ctx);

  ctx.fillRect(0, 0, 150, 150);   // Draw a rectangle with default settings
  ctx.save();                  // Save the default state
 
  ctx.fillStyle = '#09F';      // Make changes to the settings
  ctx.fillRect(15, 15, 120, 120); // Draw a rectangle with new settings

  ctx.save();                  // Save the current state
  ctx.fillStyle = '#FFF';      // Make changes to the settings
  ctx.globalAlpha = 0.5; 
  ctx.fillRect(30, 30, 90, 90);   // Draw a rectangle with new settings

  ctx.restore();               // Restore previous state
  ctx.fillRect(45, 45, 60, 60);   // Draw a rectangle with restored settings

  ctx.restore();               // Restore original state
  ctx.fillRect(60, 60, 30, 30);   // Draw a rectangle with restored settings
		}
	}
</script>
