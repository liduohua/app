<template>
	<div class="page">
		<NavHeader title="注册"></NavHeader>
        <div class="content">
        	<div class="list-block">
            	<ul>
        			<router-link tag="li" to='/personReg'>登录密码修改<i class="list-block-arrow-right"></i></router-link>
        			<router-link tag="li" to="setGuesturepassword">手势密码设置<i class="list-block-arrow-right"></i></router-link>
        		</ul>
           </div>
        </div>
   </div>
</template>
<script>
	import NavHeader from '../../components/NavHeader.vue';

	export default {
		name : 'account-manage',
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
