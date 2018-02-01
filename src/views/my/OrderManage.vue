<template>
	<div class="page">
		<NavHeader title="订单管理"></NavHeader>
        <div class="content">
            <div class="list-block">
            	<ul>
        			<router-link tag="li" to='dayTraded'>当日成交<i class="list-block-arrow-right"></i></router-link>
        			<router-link tag="li" to="dayEntrust">当日委托<i class="list-block-arrow-right"></i></router-link>
        			<router-link tag="li" to="historyEntrust">历史成交<i class="list-block-arrow-right"></i></router-link>
        		</ul>
            </div>
        </div>
   </div>
</template>
<script>
	import NavHeader from '../../components/NavHeader.vue';
	export default {
		name : 'order-manage',
		components : {
			NavHeader,
			
		},
	}
</script>
<style lang="scss">
	@import '../../scss/mixins.scss';
	.content{
		background:#fff;
	}
</style>
