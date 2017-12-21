<template>
	<div class="page">

		<div class="bar bar-nav transparent">
			<a class="fl" href="index.html"><img src="./assets/head-ico4.png" alt="" class="nav-ico"></a>
			<h1>登录</h1>
		</div>
		<div class="content">
			<div class="login-bg"></div>
			<div class="login">
				<div class="login-tab">
					<ul>
						<li class="active">手机快捷登录</li>
						<li>账号密码登录</li>
					</ul>
				</div>
				<div class="form-wrapper">
					<div class="login-form">
						<ul >
							<li>
								<span><img src="./assets/login-form-ico1.png" alt=""></span>
								<input type="text" value="13120888078">
							</li>
							<li class="yzm">
								<p>获取验证码</p>
								<span><img src="./assets/login-form-ico2.png" alt=""></span>
								<input type="text">
							</li>
						</ul>
						<ul style="display:none">
							<li>
								<span><img src="./assets/login-form-ico1.png" alt=""></span>
								<input type="text" value="13120888078">
							</li>
							<li>
								<span><img src="./assets/login-form-ico3.png" alt=""></span>
								<input type="password" value="222222">
							</li>
						</ul>
					</div>
					<div class="findpwd">
						<a>注册账号</a>
						<a>找回密码</a>
					</div>
					<div class="login-btn">
						<a href="tradeDetail.html">
							<button type="submit">登 录</button>
						</a>
					</div>
				</div>
			</div>
			<div class="user-protocol-prompt">
				点击登录即表示同意《冻现批用户协议免责条款》
			</div>
		</div>
	</div>
</template>
<style>
	.content {
  background-color: #f4f5f8;
}

.login-bg {
  height: 3rem;
  background: url("../assets/large-bg1.png") center 0 no-repeat;
  background-size: 100%;
}

.login {
  width: 6.7rem;
  height: 8.13rem;
  margin: -1.85rem auto 0;
  background-color: #fff;
}

.login .login-tab {
  padding: 0 .3rem;
}

.login .login-tab ul li {
  height: .88rem;
  line-height: .6rem;
  display: table-cell;
  width: 1%;
  text-align: center;
  font-size: .25rem;
  color: #5b5c6c;
  border-bottom: .05rem solid #f5f6ff;
  padding-top: .25rem;
}

.login .login-tab ul li.active {
  border-bottom-color: #1d2088;
}

.login .login-form {
  margin: .35rem .9rem 0;
}

.login .login-form ul li {
  height: 1.07rem;
  padding-top: .6rem;
  border-bottom: 1px solid #e0e2f0;
  font-size: .25rem;
}

.login .login-form ul li span {
  float: left;
  vertical-align: middle;
  margin-right: .15rem;
}

.login .login-form ul li span img {
  width: .4rem;
  display: block;
}

.login .login-form ul li input {
  width: 4.3rem;
  color: #32323c;
  border: none;
  height: .4rem;
}

.login .login-form ul li.yzm input {
  width: 2.8rem;
}

.login .login-form ul li.yzm p {
  float: right;
  margin: 0;
  background-color: #aeb1c4;
  width: 1.4rem;
  height: .4rem;
  line-height: .4rem;
  text-align: center;
  color: #fff;
  font-size: .18rem;
}

.login .findpwd {
  padding-top: .5rem;
  font-size: .2rem;
  text-align: center;
}

.login .findpwd a {
  color: #32323c;
}

.login .findpwd a:first-child {
  margin-right: 0.9rem;
}

.login .login-btn {
  margin-top: 2rem;
}

.login .login-btn button {
  width: 5.3rem;
  height: 1rem;
  line-height: 1rem;
  font-size: .35rem;
  color: #fff;
  border: none;
  background-color: #1d2088;
  border-radius: 0;
  padding: 0;
  margin: 0 auto;
  display: block;
}

.user-protocol-prompt {
  font-size: .15rem;
  color: #5b5c6c;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: .4rem;
}
</style>