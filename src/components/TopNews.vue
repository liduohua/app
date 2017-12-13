<template>
	<div class="top-news">
        <strong>今日头条：</strong>
            <div class='swipe'>
                <div class='swipe-wrap'>
                    <div class="swipe-wrap-item">鸡大胸200以上A2六合10（AB10001）<span>10%</span></div>
                </div>
            </div>
        <span class="right-arrow-icon">更多</span>
    </div>
</template>
<style lang="scss">
	/*今日头条*/
    .top-news {
        height: 0.5rem;
        font-size: 0.2rem;
        line-height: 0.5rem;
        color: #6f7597;
        background: #fff;
        padding-left: 0.35rem;
        border-bottom: 1px solid #e0e4ef;
        position: relative;
        padding-right: 0.2rem;
    }
    .top-news strong {
        color: #ff0000;
    }

    .top-news span {
        color: #ff0000;
    }

    .top-news .right-arrow-icon {
        color: #4f7df5;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0.2rem;
    }

    .top-news .swipe {
        height: 0.5rem;
        left: 1.6rem;
        line-height: 0.5rem;
        position: absolute;
        right: 0.8rem;
        top: 0;
        pointer-events: none;
    }

    .top-news .swipe:active {
        background: #eee;
    }
</style>