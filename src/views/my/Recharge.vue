<template>
	<div class="page">
    <NavHeader title="充值"></NavHeader>
    <div class="content">
       <p class="account-amout">可用金额：<strong>23423423424</strong></p>
        <div class="input-box">
            <input placeholder="请选择银行"/>
        </div>
        <div class="input-box">
            <input placeholder="请选择币种"/>
        </div>
        <div class="input-box">
            <input placeholder="转账金额"/>
        </div>
        <div class="input-box">
            <input placeholder="支付密码"/>
        </div>
        <div class="btn">
            <button>立即转账</button>
        </div>
    </div>
</div>

</template>
<script>
	import NavHeader from '../../components/NavHeader.vue';
	export default {
		components : {
			NavHeader
		},
	}
</script>
<style>
	.content{
    background:#fff;
    font-size:0.3rem;
  }
  .input-box{
    position: relative;
    height: 0.8rem;
    margin: 10px;

  }
  .input-box input{
    border:none;
    outline:none;
    height:0.7rem; border: 1px solid #ccc;
    width:100%;
    border-radius: 5px;
    padding:0 10px;
  }
  .btn{
    margin:10px;
  }
  .btn button{
    height: 0.8rem;
    display: block;
    background: #2296de;
    color: #fff;
    border: none;
    outline: none;
    width: 100%;
    border-radius: 5px;
  }
  .account-amout{
    border-bottom:1px solid #ccc;
    padding: 0.36rem 0  0.36rem;
    text-align: center;
    margin:0;
  }
  .account-amout strong{
    color:#f00;
  }
</style>
