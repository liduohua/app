<template>
	<div class="toast" v-show="showToast">
		<div ref="toastMsg" class="toast-msg"  :style="{transition ,opacity}">{{msg}}</div>
	</div>
</template>

<script>
	import {mapMutations, mapState} from 'vuex'; 
	export default {
		data : function (){
			return {
				transition: '',
				opacity : 0,
				msg : ''
			};
		},
		computed : {
			...mapState(['toastMsgs','showToast'])
		},
		watch : {
			showToast (status){
				if(status){
					setTimeout(()=>{
						this.transition = this.toastMsgs[0].aniTime;
						this.$refs.toastMsg.offsetWidth
						this.opacity = 1;
						this.msg = this.toastMsgs[0].msg;
					
						setTimeout(()=>{
							this.opacity = 0;
							this.hiddenToast();
						},this.toastMsgs[0].delay);
					})
					
				}
			}
		},
		methods : {
			...mapMutations(['hiddenToast'])
		},
		mounted (){
			console.log(this.toastMsgs);
		}
	}
	
</script>
<style>
	.toast{
		position: absolute;
    	top: 50%;
    	z-index: 2001;
    	left: 50%;
    	pointer-events : none;
	}
	.toast-msg{
		margin-left:-50%;
    	background: rgba(0, 0, 0, 0.63);
    	color: #fff;
    	border-radius: 5px;
    	display:inline-block;
    	transform: translateY(-50%);
    	padding: 3px 7px;
    	opacity: 0;
	}
</style>
