<template>
	<div class="page" >
    <div class="bar bar-nav transparent">
        <h1>个人中心</h1>
    </div>
   	<NavFooter></NavFooter>
    <div class="content">
        <div class="myspace-index">
            <div class="myspace-info">
                <div class="myspace-head fl" style="background-image: url(../../assets/head.jpg)"></div>
                <h1>13120888078
                    <p>普通会员</p>
                </h1>

            </div>
            <div class="myspace-nav">
                <ul class="">
                    <li>
                        <a >
                            <img src="../../assets/myspace-nav1.png" alt=""> 支付管理
                        </a>
                    </li>
                    <li>
                        <a >
                            <img src="../../assets/myspace-nav4.png" alt=""> 订单管理
                        </a>
                    </li>
                    <li>
                        <a >
                            <img src="../../assets/myspace-nav2.png" alt=""> 资产信息
                        </a>
                    </li>
                    <li>
                        <a >
                            <img src="../../assets/myspace-nav3.png" alt=""> 查询账单
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="list-block">
            <ul>
        		<router-link tag="li" to='/personReg'>账户管理<i class="arrow-right"></i></router-link>
        		<router-link tag="li" to="mySelect">自选产品管理<i class="arrow-right"></i></router-link>
        		<router-link tag="li" to="mySelect">商品信息查询<i class="arrow-right"></i></router-link>
        		<router-link tag="li" to="/mySelect">交收管理<i class="arrow-right"></i></router-link>
        		<router-link tag="li" to="/mySelect">自选产品管理<i class="arrow-right"></i></router-link>
        		<li>
                                                                     手势密码
                    <div class="switch" style="display:inline-block;right:15px;">
                        <i class="on hidden">ON</i>
                        <i class="off hidden">OFF</i>
                        <div class="switch-handle"></div>
                    </div>
                </li>
                <router-link tag="li" to="/mySelect">系统设置<i class="arrow-right"></i></router-link>
        	</ul>
        </div>
        <!--<div class="mt10 m-list">
            <ul>
                <li><a href="payManage.html"><span class="myspace-ico"><img src="./assets/myspace-ico1.png" alt=""></span>付款管理</a></li>
                <li><a href="salesReturnManage.html"><span class="myspace-ico"><img src="./assets/myspace-ico2.png" alt=""></span>退货管理</a></li>
                <li><a><span class="myspace-ico"><img src="../../assets/myspace-ico3.png" alt=""></span>账户管理</a></li>
                <li><router-link to="mySelect"><span class="myspace-ico"><img src="../../assets/myspace-ico4.png" alt=""></span>自选产品管理</router-link></li>
                <li><a><span class="myspace-ico"><img src="../../assets/myspace-ico4.png" alt=""></span>商品信息查询</a></li>
                <li><a ><span class="myspace-ico"><img src="../../assets/myspace-ico4.png" alt=""></span>交收管理</a></li>
                <li><a href="messageManage.html"><span class="myspace-ico"><img src="./assets/myspace-ico5.png" alt=""></span>消息盒子管理</a></li>
                <li>
                    <a></span>手势密码</a>
                    <div class="switch" style="display:inline-block;">
                        <i class="on hidden">ON</i>
                        <i class="off hidden">OFF</i>
                        <div class="switch-handle"></div>
                    </div>
                </li>
                <li><a><span class="myspace-ico"><img src="../../assets/myspace-ico6.png" alt=""></span>系统设置</a></li>
            </ul>
        </div>-->
    </div>
</div>
</template>
<script>
	import NavFooter from '../../components/NavFooter.vue';

	export default {
		components : {
			NavFooter,
			
		}
	}
</script>
<style>
	.myspace-index {
  background: url("../../assets/myspace_bg.png") center bottom no-repeat;
  background-size: 100%;
  height: 5rem;
  position: relative;
}

.myspace-index .myspace-info {
  position: absolute;
  top: 1.2rem;
  left: .9rem;
}

.myspace-index .myspace-info .myspace-head {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  background: url("../../assets/head.jpg") no-repeat;
  background-size: contain;
}

.myspace-index .myspace-info h1 {
  font-size: .3rem;
  color: #fff;
  line-height: 1;
  margin: 0;
  float: left;
  padding: .4rem 0 0 .25rem;
}

.myspace-index .myspace-info h1 p {
  font-size: .25rem;
  color: #fff;
  line-height: 1;
  margin: 0;
  padding-top: .2rem;
}

.myspace-index .myspace-nav {
  height: 1.5rem;
  position: absolute;
  bottom: 0;
}

.myspace-index .myspace-nav ul li {
  display: table-cell;
  width: 1%;
  text-align: center;
  font-size: .25rem;
  color: #fff;
}

.myspace-index .myspace-nav ul li img {
  width: .8rem;
  display: block;
  margin: 0 auto .12rem;
}

.m-list {
  background-color: #fff;
  padding: 0 .5rem;
}

.m-list ul li {
  height: 1.05rem;
  line-height: 1.05rem;
  border-bottom: 1px solid #b4bbd6;
  font-size: .3rem;
  position:relative;
}

.m-list ul li .myspace-ico {
  float: right;
  padding-top: .3rem;
}

.m-list ul li .myspace-ico img {
  width: .4rem;
  display: block;
}

.m-list ul li:last-child {
   border: none;
}
</style>