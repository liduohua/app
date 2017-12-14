<template>
<div class="page">
    <div class="bar bar-nav">
        <a class="fl back"><img src="../assets/head-ico4.png" alt="" class="nav-ico back"></a>
        <h1>新闻列表</h1>
    </div>
    <div class="content" @infinite="loadNewsList">
        <div class="news-item">
            <p class="news-title">！抓住股票大涨了，赶紧购买吧！抓住机会，大赚一笔机会，大赚一笔！</p>
            <p class="release-time">12-05 12:43</p>
        </div>
        <div class="news-item">
            <p class="news-title">！抓住股票大涨了，赶紧购买吧！抓住机会，大赚一笔机会，大赚一笔！</p>
            <p class="release-time">12-05 12:43</p>
        </div>
        <div class="news-item">
            <p class="news-title">！抓住股票大涨了，赶紧购买吧！抓住机会，大赚一笔机会，大赚一笔！</p>
            <p class="release-time">12-05 12:43</p>
        </div>
    </div>
</div>
</template>
<script>
	export default {
		methods :{
			loadNewsList(){
				
			}
		}
	}
</script>
<style>
	.news-title{
  font-size:0.3rem;
  text-indent:2em;
}
 .content{
  background:#fff;
}
.news-content{
  font-size:0.25rem;
}
.news-item{
  border-bottom:1px solid #eee;
  padding:5px;
}
.release-time{
  text-align: right;
  font-size: 0.2rem;
  color: #999;
}
.news-item .news-title , .news-item .release-time{
  margin:5px;
}
</style>