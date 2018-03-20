<div class="page" id="myspaceEditAddr" style="display:none;">
    <div class="bar bar-nav">
        <a class="fl" ><img src="./assets/head-ico4.png" alt="" class="nav-ico back"></a>
        <h1>编辑地址</h1>
    </div>
  
    <div class="content">
     	<ul>
     		<li>收货人 <label><input type="text" placeholder="请输入收货人"/></label></li>
     		<li>联系电话 <label><input type="number" placeholder="请输入联系电话"/></label></li>
     		<li>所在地区 <label><input type="text" readonly placeholder="请选择地址"/></label></li>
     		<li><textarea rows="5" placeholder="请输入您的详细地址"></textarea></li>
     	</ul>
     	<div class="btn-wrapper">
     		<button>保存地址</button>
     	</div>
     	
    </div>
</div>
<style>
	#myspaceEditAddr{
	.content li{
		font-size:0.3rem;
		border-bottom:1px solid #eee;
		margin-left:10px;
		padding-top:10px;
		padding-bottom:10px;
		padding-right:10px;
	}
	.content li label{
		float:right;
	}
	.content li textarea{
		width:100%;
		border: 1px solid #ddd;
        border-radius: 5px;
        padding:5px;
	}
	.content li input{
	    border:none;
	    text-align: right;
	}
	.btn-wrapper{
		padding:10px;
	}
	.btn-wrapper button{
		width:100%;
		font-size:0.3rem;
		height:40px;
		border-radius: 5px;
		color:#fff;
		background:#1c69b7;
		outline:none;
		border:none;
	}
}

</style>