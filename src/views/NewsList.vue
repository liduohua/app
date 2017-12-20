<template>
<div class="page">
    <NavHeader title="新闻列表"></NavHeader>
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
	import NavHeader from '../components/NavHeader.vue';
	export default {
		components :{
			NavHeader,
		},
		methods :{
			loadNewsList(){
				
			}
		},
	}
</script>
<style lang="scss">
	@import '../scss/news.scss';
</style>