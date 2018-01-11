<template>
	<div class="page">
		<NavHeader title="注册"></NavHeader>
        <div class="content">
        	<div class="list-block">
            	<ul>
        			<router-link tag="li" to='recharge'>充值<i class="list-block-arrow-right"></i></router-link>
        			<router-link tag="li" to="withdrawCash">提现<i class="list-block-arrow-right"></i></router-link>
        			<router-link tag="li" to="fundWater">资金流水<i class="list-block-arrow-right"></i></router-link>
        		</ul>
           </div>
        </div>
   </div>
</template>
<script>
	import NavHeader from '../../components/NavHeader.vue';

	export default {
		name : 'pay-manage',
		components : {
			NavHeader,
			
		},
		created (){
			
		}
	}
</script>
<style lang="scss">
	@import '../../scss/mixins.scss';
	.content{
		background:#fff;
	}
</style>