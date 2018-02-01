<template>
	<div class="bar bar-nav" :class="className" v-bind:style="{background}">
        <slot></slot>
        <template v-if='isHidden'>
        	<a v-if="!isHiddenBack" class="fl back"><img  @click="goBack" src="../assets/head-ico4.png" alt="" class="nav-ico back"></a>
        	<h1 v-if="!isHiddenTitle">{{title}}</h1>
        </template>
    </div>
</template>
<script>
	export default{
		props : ['title','background','className','isNotBack','isHiddenTitle' ,'isHiddenBack'],
		methods : {
			goBack(){
				this.$store.commit('deleteView',this.$route.meta.viewName);// 当退出栈时当前视图不缓存
				this.$router.go(-1);
			},
		},
		data (){
			return {
				isHidden : true,
			}
		},
		created(){
			if(this.background && !this.title){
				this.isHidden = false;
			}
		}
	}
</script>
<style scoped lang='scss'>

</style>
