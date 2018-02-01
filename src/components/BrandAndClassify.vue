<template>
	<div class="brand-classify">
		<div class="h-scroll-panel">
            <div class="wrapper one-level-classification">
                <ul>
                    <li class="active">鸡产品</li>
                    <li>鸭产品</li>
                    <li>猪产品</li>
                    <li>牛羊产品</li>
                    <li>海鲜产品</li>
                    <li>海鲜产品</li>
                    <li>海鲜产品</li>
                    <li>海鲜产品</li>
                    <li>海鲜产品</li>
                </ul>
            </div>
        </div>
        <TopNews></TopNews>
        <div class="h-scroll-panel ">
            <div class="wrapper brand">
                <ul>
                    <li class="active">全 部</li>
                    <li>昌 源</li>
                    <li>超 和</li>
                    <li>春 歌</li>
                    <li>春 雪</li>
                    <li>大 成</li>
                    <li>大 成</li>
                    <li>大 成</li>
                    <li>大 成</li>
                    <li>大 成</li>
                </ul>
            </div>
        </div>
        <div class="list-layout-panel">
            <div class="two-level-classification">
                <ul>
                    <li class="active">琵琶腿</li>
                    <li>琵琶腿</li>
                    <li>琵琶腿</li>
                    <li>琵琶腿</li>
                    <li>琵琶腿</li>
                    <li>琵琶腿</li>
                    <li>琵琶腿</li>
                    <li>琵琶腿</li>
                    <li>琵琶腿</li>
                    <li>琵琶腿</li>
                    <li>琵琶腿</li>
                    <li>琵琶腿</li>
                    <li>琵琶腿</li>
                    <li>琵琶腿</li>
                    <li>琵琶腿</li>
                    <li>琵琶腿</li>
                </ul>
            </div>
            <slot></slot>
        </div>
	</div>
</template>
<script>
	import TopNews from './TopNews.vue';
	export default {
		components :{
			TopNews,
		},
		methods :{
			
		},
	}
</script>
<style lang="scss">
	.brand-classify{
		.h-scroll-panel {
            background-color: #fff;
            border-bottom: 1px solid #e9e9e9;
            line-height: 0;
        }

        .h-scroll-panel .wrapper {
            overflow: hidden;
            margin: 0 .125rem;
            height: .8rem;
            overflow: hidden;
        }

        .h-scroll-panel .wrapper ul {
            line-height: 0rem;
            height: 0.8rem;
            white-space: nowrap;
            display: inline-block;
            font-size:0;
        }

        .h-scroll-panel .wrapper ul li {
            height: .8rem;
            line-height: .8rem;
            margin: 0 0.125rem;
            color: #2e2f33;
            padding: 0 .1rem;
            border-bottom: 3px solid #fff;
            font-size: .25rem;
            display: inline-block;
        }

        .h-scroll-panel .wrapper ul li.active {
            border-bottom-color: #22ac38;
        }

        .list-layout-panel {
            position: absolute;
            top: 2.2rem;
            bottom: 0;
            left: 0;
            width: 100%;
        }

        .list-layout-panel .two-level-classification {
            position: absolute;
            top: 0;
            bottom: 0;
            background-color: #f0f1f7;
            overflow: hidden;
        }

        .list-layout-panel .two-level-classification ul li {
            height: .8rem;
            color: #2e2f33;
            line-height: .8rem;
            border-bottom: 1px solid #dcdcdc;
            font-size: .25rem;
            text-align: center;
            width: 1.8rem;
        }

        .list-layout-panel .two-level-classification ul li.active {
            color: #22ac38;
            background-color: #fff;
        }
	}
</style>
