<div class="page" id="myspaceAddrManage" style="display:none;">
    <div class="bar bar-nav">
        <a class="fl" ><img src="./assets/head-ico4.png" alt="" class="nav-ico back"></a>
        <h1>收货地址管理</h1>
    </div>
    <div><button>新增地址</button></div>
    <div class="content" @click="onChecked">
       <div class="addr-item">
       		<p>收货人：王利民 <label class="phone-no">13989283983</label></p>
       		<p class="bottom-line">中国浙江杭州很少</p>
       		<label class="addr-setting"><input type="checkbox"/>设为默认地址</label> <button class="btn">编辑</button><button class="btn margin-right-20">删除</button>
       </div>
       <div class="addr-item">
       		<p>收货人：王利民 <label class="phone-no">13989283983</label></p>
       		<p class="bottom-line">中国浙江杭州很少</p>
       		<label class="addr-setting"><input type="checkbox"/>设为默认地址</label> <button class="btn">编辑</button><button class="btn margin-right-20">删除</button>
       </div>
       <div class="addr-item">
       		<p>收货人：王利民 <label class="phone-no">13989283983</label></p>
       		<p class="bottom-line">中国浙江杭州很少</p>
       		<label class="addr-setting"><input type="checkbox"/>设为默认地址</label> <button class="btn">编辑</button><button class="btn margin-right-20">删除</button>
       </div>
       <div class="addr-item">
       		<p>收货人：王利民 <label class="phone-no">13989283983</label></p>
       		<p class="bottom-line">中国浙江杭州很少</p>
       		<label class="addr-setting"><input type="checkbox"/>设为默认地址</label> <button class="btn">编辑</button><button class="btn margin-right-20">删除</button>
       </div>
       <div class="addr-item">
       		<p>收货人：王利民 <label class="phone-no">13989283983</label></p>
       		<p class="bottom-line">中国浙江杭州很少</p>
       		<label class="addr-setting"><input type="checkbox"/>设为默认地址</label> <button class="btn">编辑</button><button class="btn margin-right-20">删除</button>
       </div>
       <div class="addr-item">
       		<p>收货人：王利民 <label class="phone-no">13989283983</label></p>
       		<p class="bottom-line">中国浙江杭州很少</p>
       		<label class="addr-setting"><input type="checkbox"/>设为默认地址</label> <button class="btn">编辑</button><button class="btn margin-right-20">删除</button>
       </div>
       <div class="addr-item">
       		<p>收货人：王利民 <label class="phone-no">13989283983</label></p>
       		<p class="bottom-line">中国浙江杭州很少</p>
       		<label class="addr-setting"><input type="checkbox"/>设为默认地址</label> <button class="btn">编辑</button><button class="btn margin-right-20">删除</button>
       </div>
    </div>
</div>
<style lang="scss">
	.addr-item{
		padding:10px;
		color:#333;
		font-size:0.30rem;
		border-bottom:solid 5px #f7f7f7;
	}
	.addr-item p{
		color:#333;
	}
	.phone-no{
		float:right;
	}
	.bottom-line{
		border-bottom: 1px solid #eee;
    	margin: 0;
    	padding-bottom: 5px;
    	margin-bottom:5px;
	}
	.addr-setting input{
		border: 1px solid #d2d2d2;
    	width: 0.4rem;
    	height: 0.4rem;
   	 	border-radius: 0.3rem;
   	 	margin-right:10px;
   	 	vertical-align:middle;
	}
	.addr-setting input:checked{
		border: 1px solid #7c7c7c;
	}
	.btn{
		float:right;
		
		background:#fff;
		display:inline-block;
		border:#948c8c 1px solid ;
		border-radius: 3px;
	}
	.margin-right-20{
		margin-right:20px;
	}
	input[type='checkbox']:checked::after {
    	content: '';
    	position: absolute;
    	display: inline-block;
    	width: 0.2rem;
   	 	height: 0.1rem;
    	    top: 0.08rem;
    	left: 0.08rem;

    	border-left: 1px solid #7c7c7c;
    	border-bottom: 1px solid #7c7c7c;
    	transform: rotate(-45deg);
	}
</style>
