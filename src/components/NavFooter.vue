<template>
	<div class="bar bar-footer">
        <router-link to="/index"  replace><i class="index"></i>首页</router-link>
        <router-link to="/goodsClassification" replace><i class="goodsClassification"></i>商品分类</router-link>
        <router-link to="/tradeMarket" replace><i class="tradeMarket"></i>交易行情</router-link>
        <router-link to="/trade" replace> <i class="trade"></i>登录竞价</router-link>
        <router-link to="/my/index" replace><i class="my"></i>个人中心</router-link>
     </div>
</template>
<style scoped lang='scss'>
.bar-footer {
    background-color: #fff;
    border-top: 1px solid #d0d6ec;
    height: 1rem;
    bottom: 0;
    font-size: 0.22rem;
    display: table;
    width: 100%;
    box-sizing: border-box;
}
.bar-footer a {
    display: table-cell;
    width: 1%;
    text-align: center;
   
    padding-top: .04rem;
    color: #474958;
}
.bar-footer a i {
    width: .5rem;
    display: block;
    margin: 0 auto .08rem;
    height:.5rem;
}
.bar-footer a i.index{
	background:url('../assets/icon/home-icon.png');
	background-size:100%;
}
.bar-footer a.router-link-active i.index{
	background:url('../assets/icon/home-active-icon.png');
	background-size:100%;
}
.bar-footer a i.goodsClassification{
	background:url('../assets/icon/all-icon.png');
	background-size:100%;
}
.bar-footer a.router-link-active i.goodsClassification{
	background:url('../assets/icon/all-active-icon.png');
	background-size:100%;
}
.bar-footer a i.tradeMarket{
	background:url('../assets/icon/hq-icon.png');
	background-size:100%;
}
.bar-footer a.router-link-active i.tradeMarket{
	background:url('../assets/icon/hq-active-icon.png');
	background-size:100%;
}
.bar-footer a i.trade{
	background:url('../assets/icon/jj-icon.png');
	background-size:100%;
}
.bar-footer a.router-link-active i.trade{
	background:url('../assets/icon/jj-active-icon.png');
	background-size:100%;
}
.bar-footer a i.my{
	background:url('../assets/icon/myspace-icon.png');
	background-size:100%;
}
.bar-footer a.router-link-active i.my{
	background:url('../assets/icon/myspace-active-icon.png');
	background-size:100%;
}

.bar-footer a.router-link-active {
    color: #009944;
}
</style>