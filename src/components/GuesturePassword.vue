<template>
	<canvas ref="cvs">
		
	</canvas>
</template>
<style lang="scss">
	canvas{
		width:100%;
	}
</style>
<script>
	import GuesturePassword from '../lib/GuesturePassword.js';
	export default{
		mounted(){
			new GuesturePassword(this.$refs.cvs);
		},
	}
</script>