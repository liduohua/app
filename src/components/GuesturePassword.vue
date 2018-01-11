<template>
	<canvas ref="cvs">
		
	</canvas>
</template>
<script>
	import GuesturePassword from '../lib/GuesturePassword.js';
	export default{
		mounted(){
			new GuesturePassword(this.$refs.cvs);
		},
	}
</script>
<style lang="scss" scoped>
	canvas{
		width:100%;
		//top:50%;
  		//margin-top:-50%;
  		//position:absolute;
	}
</style>
