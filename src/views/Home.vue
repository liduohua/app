<template>
	<div class="page">
		<NavHeader></NavHeader>
		<div class='content'>
			<GuesturePassword ref="g"></GuesturePassword>
		</div>
	</div>
</template>
<style scoped lang="scss">
@import '../scss/mixins.scss';
	
</style>
<script>
	import NavHeader from '../components/NavHeader.vue';
	import GuesturePassword from '../components/GuesturePassword.vue';
	export default {
		components : {
			NavHeader,
			GuesturePassword,
		},
		mounted (){
			
		//console.log(this.$refs);
		}
	}
</script>
