<template>
	<div class="page" >
    	<NavHeader className="transparent" ref="navHeader" background="rgba(11,68,187, 0)">
			<h1>个人中心</h1>
		</NavHeader>
   		<NavFooter></NavFooter>
    	<div class="content" @scroll="onScroll" ref="content">
        	<div class="myspace">
            	<div class="user-info">
                	<img class="head-img" src="../../assets/head.png"/>
                	<h1>13120888078
                    	<p>普通会员</p>
                	</h1>
            	</div>
            	<div class="grid-nav">
                	<ul class="">
                    	<li>
                       	 	<img src="../../assets/myspace-nav1.png" alt=""> 支付管理
                    	</li>
                    	<router-link tag="li" to="orderManage">
                        	<img src="../../assets/myspace-nav4.png" alt=""> 订单管理
                    	</router-link>
                    	<router-link tag="li" to="assetsInfo">
                        	<img src="../../assets/myspace-nav2.png" alt=""> 资产信息
                    	</router-link>
                    	<li>
                        	<img src="../../assets/myspace-nav3.png" alt=""> 查询账单
                    	</li>
                	</ul>
            	</div>
        	</div>
        	<div class="list-block">
            	<ul>
        			<router-link tag="li" to='/personReg'><i class="list-block-icon account-manage"></i>账户管理<i class="list-block-arrow-right"></i></router-link>
        			<router-link tag="li" to="mySelect"><i class="list-block-icon manage"></i>自选产品管理<i class="list-block-arrow-right "></i></router-link>
        			<router-link tag="li" to="mySelect"><i class="list-block-icon goods-info-query"></i>商品信息查询<i class="list-block-arrow-right"></i></router-link>
        			<router-link tag="li" to="/mySelect"><i class="list-block-icon manage"></i>交收管理<i class="list-block-arrow-right"></i></router-link>
        			<router-link tag="li" to="/mySelect"><i class="list-block-icon manage"></i>自选产品管理<i class="list-block-arrow-right"></i></router-link>
        			<li class="disabled">
        				<i class="list-block-icon pd"></i>
                                                                                   手势密码
                    	<div ref='switch' class="switch" style="display:inline-block;right:15px;">
                        	<i class="on hidden">ON</i>
                        	<i class="off hidden">OFF</i>
                        	<div class="switch-handle"></div>
                    	</div>
                	</li>
                	<router-link tag="li" to="/mySelect"><i class="list-block-icon settings"></i>系统设置<i class="list-block-arrow-right"></i></router-link>
                	<li class="exit-login">退出登录</li>
        		</ul>
        	</div>
    	</div>
	</div>
</template>
<script>
	import NavFooter from '../../components/NavFooter.vue';
	import NavHeader from '../../components/NavHeader.vue';
	
	const Switch = require('../../lib/Switch-es5.js').Switch;
	export default {
		name : 'myindex',
		components : {
			NavFooter,
			NavHeader,
		},
		activated (){
			this.$refs.content.scrollTop = this.scrollTop || 0;
		},
		deactivated(){
			this.scrollTop = this.$refs.content.scrollTop ;
		},
		methods : {
			/*
			 * 处理顶部导航栏渐变
			 */
			onScroll(e){
				var currTarget = e.currentTarget;
				var fontSize = parseInt(document.documentElement.style.fontSize)
				var needMoveHeight = fontSize * 1.2;
				var changePercent = currTarget.scrollTop / needMoveHeight
				if (changePercent > 1) {
					changePercent = 1;
				}
				this.$refs.navHeader.$el.style.background = 'rgba(' + Math.round(11 * 1) + ', ' +
					Math.round(68 * 1) + ', ' + Math.round(187 * 1) + ',' + ( 1 * changePercent) + ')'
			},
		},
		mounted(){
			this.switch = new Switch({
                el : this.$refs.switch,
                switchOn : false,
                callback : function(status){
                    //if(status === 'on'){
                    //    localStorage.setItem('isOpenGuesturePwd','true')
                   // }else{
                        localStorage.removeItem('isOpenGuesturePwd')
                    //}
                }
            });
		},
		beforeDestroy(){
			alert();
			this.switch.destroy();
		}
	}
</script>
<style lang="scss">
	.myspace {
  		background: url("../../assets/myspace_bg.png") center bottom no-repeat;
  		background-size: 100%;
  		height: 5rem;
  		position: relative;
  		.user-info {
  			position: absolute;
  			top: 1.2rem;
  			left: .9rem;
  			.head-img {
  				width: 1.5rem;
  				height: 1.5rem;
  				border-radius: 50%;
  				overflow: hidden;
  				background: url("../../assets/head.png") no-repeat;
  				background-size: contain;
  				vertical-align: middle;
  				display:inline-block;
			}
			h1 {
  				font-size: .3rem;
  				color: #fff;
  				line-height: 1;
  				margin: 0;
  				display:inline-block;
  				padding: .4rem 0 0 .25rem;
			}
			h1 p {
	  			font-size: .25rem;
  				color: #fff;
  				line-height: 1;
  				margin: 0;
  				padding-top: .2rem;
			}
		}
		.grid-nav {
  			height: 1.5rem;
  			position: absolute;
  			bottom: 0;
  			ul li {
  				display: table-cell;
  				width: 1%;
  				text-align: center;
  				font-size: .25rem;
  				color: #fff;
			}
			ul li img {
  				width: .8rem;
  				display: block;
  				margin: 0 auto .12rem;
			}
		}
	}
	.exit-login{
		text-align: center;
		color: #2f6bec;
	}
	.account-manage{
		background:url('../../assets/myspace-ico3.png') no-repeat center;
	}
	.manage{
		background:url('../../assets/myspace-ico4.png') no-repeat center;
	}
	.goods-info-query{
		background:url('../../assets/myspace-ico2.png') no-repeat center;
	}
	.settings{
		background:url('../../assets/myspace-ico6.png') no-repeat center;
	}
	.pd{
		background:url('../../assets/myspace-ico1.png') no-repeat center;
	}
</style>