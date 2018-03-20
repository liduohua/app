<template>
	<div class="page">
		<NavHeader title="登录" className="transparent" ref="navHeader" background="rgba(11,68,187, 0)">
		</NavHeader>
		<div class="content" @scroll="onScroll">
			<div class="login-bg"></div>
			<div class="login">
				<div class="login-tab">
					<ul @click="slideTab">
						<li class="active">手机快捷登录</li>
						<li>账号密码登录</li>
					</ul>
				</div>
				<div class="form-wrapper">
					<div class="login-form">
						<ul v-if="isShow">
							<li>
								<span><img src="../assets/login-form-ico1.png" alt=""></span>
								<input type="number" v-model.trim='phoneNo'>
							</li>
							<li class="yzm">
								<p>获取验证码</p>
								<span><img src="../assets/login-form-ico2.png" alt=""></span>
								<input type="text" v-model.trim='phoneCheckCode'>
							</li>
						</ul>
						<ul v-else>
							<li>
								<span><img src="../assets/login-form-ico1.png" alt=""></span>
								<input type="text" v-model.trim='userName'>
							</li>
							<li>
								<span><img src="../assets/login-form-ico3.png" alt=""></span>
								<input type="password" v-model.trim='password'>
							</li>
						</ul>
					</div>
					<div class="findpwd">
						<router-link to="/reg">注册账号</router-link>
						<a>找回密码</a>
					</div>
					<div class="login-btn">
						<button type="submit" @click="toLogin">登 录</button>
					</div>
				</div>
			</div>
			<div class="user-protocol-prompt">
				点击登录即表示同意《冻现批用户协议免责条款》
			</div>
		</div>
	</div>
</template>
<script>
	import NavHeader from '../components/NavHeader.vue';
	import {httpPost} from '../api';
	const Modal = require('../lib/Modal-es5').Modal;
	import {mapMutations} from 'vuex';
	export default {
		data : () => ({
			isShow : true,
			phoneNo : '',
			phoneCheckCode : '',
			userName : '',
			password : '',
		}),
		methods :{
			...mapMutations(['showToast']),
			validateArgs (){
				if(this.isShow){
					if(this.phoneNo === ''){
						this.showToast('手机号不能为空！');
						//new Modal().alert('手机号不能为空！');
						return false;
					}
					if(this.phoneCheckCode === ''){
						new Modal().alert('手机验证码不能为空！');
						return false;
					}
				}else{
					if(this.userName === ''){
						new Modal().alert('用户名不能为空！');
						return false;
					}
					if(this.password === ''){
						new Modal().alert('密码不能为空！');
						return false;
					}
				}
				return true;
			},
			/*
			 * 登录
			 */
			async toLogin (e){
				if(!this.validateArgs()){
					return;
				}
				let userInfo;
				var preloader = new Modal();
				var modal = preloader.showPreloader();
				if(this.isShow){
					userInfo = await httpPost('300002' ,{
						phoneNo : this.phoneNo,
						phoneCheckCode : this.phoneCheckCode
					});
				}else{
					userInfo = await httpPost('300001' ,{
						userName : this.userName,
						password : this.password
					});
				}
				preloader.hidePreloader(modal);
				if(userInfo.error_no !== 0){
					new Modal().alert(userInfo.error_info);
				}else{
					this.$store.commit('userLogin',userInfo);
					this.$store.commit('saveNextRoute',this.nextRoute);
					this.$router.back();
				}
			},
			/*
			 * 切换登录方式
			 */
			slideTab (e){
				var target = e.target;
                if (target.tagName.toLowerCase() !== 'li') return;
                var ul = target.parentNode;
                var preActive = ul.querySelector('.active');
                if (target === preActive) return;
                	preActive.classList.toggle('active');
                target.classList.toggle('active');
                this.isShow = !this.isShow;
			},
			
			/*
			 * 处理顶部导航栏渐变
			 */
			onScroll (e){
				var currTarget = e.currentTarget;
				var fontSize = parseInt(document.documentElement.style.fontSize)
				var needMoveHeight = fontSize * 1.2;
				var changePercent = currTarget.scrollTop / needMoveHeight
				if (changePercent > 1) {
					changePercent = 1;
				}
				this.$refs.navHeader.$el.style.background = 'rgba(' + Math.round(11 * 1) + ', ' +
					Math.round(68 * 1) + ', ' + Math.round(187 * 1) + ',' + (1 * changePercent) + ')'
			},
		},
		components : {
			NavHeader,
		},
		created (){
			// 先保存，然后删掉，这样按返回键时就可以正常返回，而登录成功后，再重新给他赋值，这样就可以跳到登录之后的页面
			this.nextRoute = this.$store.state.nextRoute;
		
			this.$store.commit('delNextRoute');
		},
		mounted (){
			
		}
	}
</script>
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
  color:#1d2088;
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
  font-size: .25rem;
  text-align: center;
}

.login .findpwd a {
  color: #0894ec;
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
  position: absolute;
  width: 100%;
  bottom: .4rem;
}
</style>
