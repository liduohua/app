<template>
	<div class="bar bar-footer">
        <router-link to="/" class="active"><img src="../assets/home-active-icon.png" />首页</router-link>
        <router-link to="goodsClassification" replace><img src="../assets/all-icon.png" />商品分类</router-link>
        <router-link to="/market"><img src="../assets/hq-icon.png" />交易行情</router-link>
        <router-link to="/trade"><img src="../assets/jj-icon.png" />登录竞价</router-link>
        <router-link to="mySpace"><img src="../assets/myspace-icon.png" />个人中心</router-link>
     </div>
</template>
<style scoped lang='scss'>

.router-link-active{
	color:red;
}
</style>