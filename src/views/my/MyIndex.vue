<template>
	<div class="page" id="indexMyspace" style="display:none;">
    <div class="bar bar-nav transparent">
        <h1>个人中心</h1>
    </div>
    <div class="bar bar-footer" @click="navFooter">
        <a data-href="index/home"><img src="../assets/home-icon.png" />首页</a>
        <a data-href="index/goodsClassification"><img src="../assets/all-icon.png" />商品分类</a>
        <a data-href="index/market"><img src="../assets/hq-icon.png" />交易行情</a>
        <a data-href="index/trade"><img src="../assets/jj-icon.png" />登录竞价</a>
        <a class="active"><img src="../assets/myspace-active-icon.png" />个人中心</a>
    </div>
    <div class="content">
        <div class="myspace-index">
            <div class="myspace-info">
                <div class="myspace-head fl" style="background-image: url(./assets/head.jpg)"></div>
                <h1>13120888078
                    <p>普通会员</p>
                </h1>

            </div>
            <div class="myspace-nav">
                <ul class="">
                    <li>
                        <a @click="toFundManage">
                            <img src="./assets/myspace-nav1.png" alt=""> 支付管理
                        </a>
                    </li>
                    <li>
                        <a @click="toOrderManage">
                            <img src="./assets/myspace-nav4.png" alt=""> 订单管理
                        </a>
                    </li>
                    <li>
                        <a @click="toAssetsInfo">
                            <img src="./assets/myspace-nav2.png" alt=""> 资产信息
                        </a>
                    </li>
                    <li>
                        <a @click="toQueryBill">
                            <img src="./assets/myspace-nav3.png" alt=""> 查询账单
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mt10 m-list">
            <ul>
                <!--<li><a href="payManage.html"><span class="myspace-ico"><img src="./assets/myspace-ico1.png" alt=""></span>付款管理</a></li>-->
                <!--<li><a href="salesReturnManage.html"><span class="myspace-ico"><img src="./assets/myspace-ico2.png" alt=""></span>退货管理</a></li>-->
                <li><a @click="toAccountManage"><span class="myspace-ico"><img src="./assets/myspace-ico3.png" alt=""></span>账户管理</a></li>
                <li><a @click="toMySelectManage"><span class="myspace-ico"><img src="./assets/myspace-ico4.png" alt=""></span>自选产品管理</a></li>
                <li><a @click="toQueryGoodsInfo"><span class="myspace-ico"><img src="./assets/myspace-ico4.png" alt=""></span>商品信息查询</a></li>
                <li><a @click=""><span class="myspace-ico"><img src="./assets/myspace-ico4.png" alt=""></span>交收管理</a></li>
                <!--<li><a href="messageManage.html"><span class="myspace-ico"><img src="./assets/myspace-ico5.png" alt=""></span>消息盒子管理</a></li>-->
                <li>
                    <a @click="toGuesturePassword"></span>手势密码</a>
                    <div class="switch" style="display:inline-block;">
                        <i class="on hidden">ON</i>
                        <i class="off hidden">OFF</i>
                        <div class="switch-handle"></div>
                    </div>
                </li>
                <li><a @click="toSystemSetting"><span class="myspace-ico"><img src="./assets/myspace-ico6.png" alt=""></span>系统设置</a></li>
            </ul>
        </div>
    </div>
</div>
</template>

<style>
	.myspace-index {
  background: url("../assets/myspace_bg.png") center bottom no-repeat;
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
  background: url("../assets/head.jpg") no-repeat;
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
  // border: none;
}
</style>