<template>
	<div class="page">
		<NavHeader title="手势密码设置" className="transparent" ref="navHeader" background="rgba(11,68,187, 0)">
		</NavHeader>
	
    <div class="content">
        <img src="../../assets/head.png" class="head-img">
        <p class="account-name">{{clientName}}</p>
        <SetGuesturePassword></SetGuesturePassword>
        <p class="tips">{{tips}}</p>
    </div>
    </div>
</template>
<script>
	import SetGuesturePassword from '../../components/GuesturePassword.vue';
	import NavHeader from '../../components/NavHeader.vue';
	export default {
		data : ()=>({
			clientName : '',
			tips : '请绘制手势密码'
		}),
		computed : {
			
		},
		components : {
			SetGuesturePassword,	
			NavHeader,
		},
		created(){
			this.clientName = this.$store.getters.clientName;
		}
	}	
</script>
<style scoped>
.page{
	background-color: #0c45bc;
}
	.content{
    background: url("../../assets/myspace_bg.png") center 0 no-repeat;
    background-size: 100%;
    
  }
  .head-img{
    width: 1.5rem;
    border-radius: 1rem;
    display: block;
    margin: auto;
    margin-top: 1rem;
  }
  .account-name{
    text-align: center;
    font-size: 0.3rem;
    margin: 0.2rem;
    color: #fff;
    margin-bottom: 0;
  }
  .guesture-password-cvs{
    width: 100%;
    //position: absolute;
    //border: 1px solid red;

    font-size:0.25rem;
    color:#f00;
    text-align: center;
    font-weight: bold;
  }
  .tips{
    font-size:0.3em;
    color:#fff;
    text-align: center;
    margin: 0.2rem;
    
  }
  .tips.error{
    color:#f00;
  }

</style>