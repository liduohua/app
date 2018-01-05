<template>
	<div class="page">
		<NavHeader title="注册"></NavHeader>
        <div class="content">
            <div class="list-block">
            	<ul>
        			<router-link tag="li" to='/personReg'>个人注册<i class="list-block-arrow-right"></i></router-link>
        			<router-link tag="li" to="/enterpriseReg">企业注册<i class="list-block-arrow-right"></i></router-link>
        		</ul>
            </div>
        </div>
   </div>
</template>
<script>
	import NavHeader from '../../components/NavHeader.vue';

	export default {
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