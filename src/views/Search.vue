<template>
	<div class="page">
    <NavHeader title="搜索"></NavHeader>
    <div class="content search">
        <section class="search-code">
            <input placeholder="请输入代码" v-model="code" @input="onInput"/>
        </section>
        <div class="search-list" v-show="isShow">
            <ul class="code-list" @click="onClick">
                <li v-for="({code ,name},index) in currSearchList" :key="index" :data-code="code" :data-name="name"><label>{{code}}&nbsp;&nbsp;{{name}}</label> <i  class="add-icon">+</i></li>
            </ul>
        </div>
        <div class="history-list " v-show="!isShow">
            <ul class="code-list" @click="onClick">
                <li v-for="({code ,name},index) in historySearchStocks" :key="index" :data-code="code" :data-name="name"><label>{{code}}&nbsp;&nbsp;{{name}}</label> <i class="add-icon">+</i></li>
            </ul>
            <button class="clr-btn" @click="clearHistory">清空历史记录</button>
        </div>
    </div>
   </div>
</template>
<script>
	// cache.push('search');
	import {httpGet} from '../api';
	import NavHeader from '../components/NavHeader.vue';
	export default{
		name : 'search',
		data : () => {
			return {
				currSearchList : [],
				marketList: [
					
				],
				historySearchStocks : JSON.parse(localStorage.getItem('historySearchStocks')) || [],
				code : '',
				isShow : true,
			};
		},
		components : {
			NavHeader,
		},
		methods :{
			onClick (e){
				let target = e.target;
				let code;
				while(!(code = target.getAttribute('data-code')) && target !== e.currentTarget){
					target = target.parentNode;
				}
					
				if(code){
					let name = target.getAttribute('data-name');
					var isAdd = true;
					this.historySearchStocks.some((historyItem) => {
						if(code === historyItem.code){
							isAdd = false;
							return true;
						}
					})
					if(isAdd){
						this.historySearchStocks.unshift({
							name,
							code
						});
						localStorage.setItem('historySearchStocks',JSON.stringify(this.historySearchStocks));
					}
					this.$router.push('stockDetail');
					this.isShow = false;
				}
			},
			async onInput (){
				if(this.code.length === 0) {
					this.isShow = false;
					return;
				}
				
				let siftedList = await httpGet('siftMarketList' ,{
					code : this.code
				});
				if(siftedList.length > 0){
					this.isShow = true;
				}else{
					this.isShow = false;
				}
				this.currSearchList = siftedList;
			},
			clearHistory (){
				this.historySearchStocks = [];
				localStorage.setItem('historySearchStocks',JSON.stringify(this.historySearchStocks));
			},
		},
	
	}
</script>
<style lang="scss" src="../scss/search.scss">

</style>
