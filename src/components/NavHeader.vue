<template>
	<div class="bar bar-nav" :class="bgClass" v-bind:style="{background}">
        <slot></slot>
        <template v-if='isHidden'>
        	<a class="fl back"><img  @click="goBack" src="../assets/head-ico4.png" alt="" class="nav-ico back"></a>
        	<h1>{{title}}</h1>
        </template>
    </div>
</template>
<script>
	export default{
		props : ['title','background','bgClass','isNotBack'],
		methods : {
			goBack(){
				this.$router.go(-1);
			},
		},
		data (){
			return {
				isHidden : true,
			}
		},
		created(){
			if(this.background){
				this.isHidden = false;
			}
		}
	}
</script>
<style scoped lang='scss'>


</style>