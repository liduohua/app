<template>
	<div class="page">
    <NavHeader title="搜索"></NavHeader>
    <div class="content">
        <section class="search-code">
            <input placeholder="请输入代码" @input="onSearch"/>
        </section>
        <div class="search-list hidden">
            <ul class="code-list" @click="onClick">
                <li v-for="item in marketList" ><label>item.code&nbsp;&nbsp;item.name</label> <i  class="add-icon">+</i></li>
            </ul>
        </div>
        <div class="history-list ">
            <ul class="code-list" @click="onClick">
                <li v-for="item in historySearchList"  ><label>{{item.code}}&nbsp;&nbsp;{{item.name}}</label> <i class="add-icon">+</i></li>
            </ul>
            <button class="clr-btn" @click="clearHistory">清空历史记录</button>
        </div>
    </div>
   </div>
</template>
<script>
	//cache.push('search');
	import NavHeader from '../components/NavHeader.vue';
	export default{
		name : 'search',
		data : () =>{
			return {
				marketList : [],
				historySearchList : [{name :'ssfsadf ' ,code:212113}],
				code : ''
			};
		},
		components : {
			NavHeader,
		},
		methods :{
			onClick(){
				this.$router.push('newList');
			},
			onSearch(){
				
			},
			clearHistory(){
				
			},
		},
	
	}
</script>
<style>
	.content{
        background:#fff;
        font-size:0.3rem;
    }
    .code-list li{
        border-bottom: 1px solid #ccc;
        height: 0.9rem;
        line-height: 0.9rem;
        padding: 0 10px;
        position:relative;
        color: #999;
    }
    .code-list li:active{
        background:#e9e9e9;
    }
    .add-icon{
        color:#ff5757;
        float:right;
        font-style: normal;
        font-size: 0.6rem;
    }
    .search-code{
        border-bottom: 1px solid #ccc;
        background:url(../assets/search-black-icon.png) left no-repeat;
        background-size: 0.6rem;
        position: relative;
        z-index: 1;
    }
    .search-code input{
        border:none;
        height: 0.9rem;
        line-height: 0.9rem;
        padding-left:2em;
        background:transparent;
        width: 100%;
    }
    button.clr-btn{
        color: #ccc;
        height: 0.9rem;
        line-height: 0.9rem;
        border: none;

        display: block;
        width: 100%;
        background: #fff;
        outline: none;
    }
    .search-list , .history-list{
        position: absolute;
        left:0;
        right:0;
        top:0.9rem;
        bottom:0;
        overflow-y:auto;
    }
</style>