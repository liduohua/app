<template>
	<div class="page">
    <NavHeader title="搜索"></NavHeader>
    <div class="content search">
        <section class="search-code">
            <input placeholder="请输入代码" v-model="inputCode" @input="onInput"/>
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
	import NavHeader from '../components/NavHeader.vue';
	export default{
		name : 'search',
		data : () => {
			return {
				currSearchList : [],
				marketList: [
					{code:"AB0005",name:"鸡大胸160以上A2圣农10"},
					{code:"AB0021",name:"鸡大胸不分级A2新盛9.8"},
					{code:"AB0023",name:"鸡大胸180以上A2和盛9.8"},
					{code:"AB0025",name:"鸡大胸200以上A2一品农佳9.9"},
					{code:"AC0007",name:"鸡胗不分级A2中慧10"},
					{code:"AC0010",name:"鸡胗不分级A2华颐10"},
					{code:"AD0018",name:"琵琶腿130-150/A2中慧10"},
					{code:"AD0026",name:"琵琶腿150以上A2中慧10"},
					{code:"AD0033",name:"琵琶腿80-100/A2圣农10"},
					{code:"AE0001",name:"凤爪30以上A2圣农10"},
					{code:"AP0018",name:"鸡爪40-50/A2冠卓10"},
					{code:"AP0019",name:"鸡爪40-50/A2圣农8"},
					{code:"AR0012",name:"三黄土鸡0.73/13只A2亨利9.5"},
					{code:"AR0013",name:"三黄土鸡0.79/12只A2亨利9.5"},
					{code:"AR0015",name:"三黄土鸡1.36/7只A2亨利9.5"},
					{code:"AR0016",name:"三黄土鸡1.58/6只A2亨利9.5"},
					{code:"AR0018",name:"三黄土鸡1.06/9只A2亨利9.5"},
					{code:"AS0013",name:"乇乇正肉不分级A2和盛12"},
					{code:"AS0014",name:"乇乇正肉不分级A2和盛11.4"},
					{code:"AT0008",name:"掌中宝带肉率20%A3中慧10.8"},
					{code:"AW0001",name:"鸡油不分级A2中慧12"},
					{code:"AW0002",name:"鸡油不分级A2冠卓11.4"},
					{code:"AY0008",name:"西装鸡14只A2创润9.8"},
					{code:"AY0012",name:"西装鸡20只A2创润9.8"},
					{code:"BA0005",name:"半片鸭9-10片A2和顺9.5"},
					{code:"BA0006",name:"半片鸭9-10片A2和顺9.0"},
					{code:"BB0007",name:"带皮鸭胸180-200/A2兴达10"},
					{code:"BB0008",name:"带皮鸭胸200-220/A2兴达10"},
					{code:"BB0011",name:"带皮鸭胸220-240/A2六和10"},
					{code:"BB0012",name:"带皮鸭胸180-200/A2六和10"},
					{code:"BC0004",name:"去皮鸭胸不分级A2兴达10"},
					{code:"BD0004",name:"鸭边腿300以上A2兴达9.5"},
					{code:"BD0007",name:"鸭边腿300以上A2六和9.5"},
					{code:"BE0001",name:"鸭脖5根A2兴达12"},
					{code:"BE0005",name:"鸭脖6根A2兴达12"},
					{code:"BE0006",name:"鸭脖6根A2和顺12"},
					{code:"BE0009",name:"鸭脖5根A2六和12"},
					{code:"BE0010",name:"鸭脖6根A2六和12"},
					{code:"BE0011",name:"鸭脖7根A2六和12"},
					{code:"BE0012",name:"鸭脖7根A2兴达12"},
					{code:"BG0004",name:"鸭翅根不分级A2兴达10"},
					{code:"BG0007",name:"鸭翅根不分级A2六和10"},
					{code:"BH0001",name:"鸭二节翅L/A2兴达10"},
					{code:"BH0004",name:"鸭二节翅L/A2呱呱鸭10"},
					{code:"BJ0005",name:"鸭头9头A2兴达12"},
					{code:"BJ0010",name:"鸭头9头A2六和12"},
					{code:"BK0004",name:"鸭腿240/A2六和10"},
					{code:"BM0005",name:"鸭掌L/A2兴达12"},
					{code:"BN0005",name:"鸭肫M/A2兴达12"},
					{code:"BN0012",name:"鸭肫S/A2呱呱鸭12"},
					{code:"BN0013",name:"鸭肫L/A2六和12"},
					{code:"BN0014",name:"鸭肫M/A2六和12"},
					{code:"BO0004",name:"白条鸭1.15/10只A2神润11.5"},
					{code:"BO0006",name:"白条鸭1.25/10只A2神润12.5"},
					{code:"BO0008",name:"白条鸭1.2/10只A2神润12"},
					{code:"BO0012",name:"白条鸭1.3/10只A2神润13"},
					{code:"BO0014",name:"白条鸭2.0/6只A2兴达12.3"},
					{code:"BO0015",name:"白条鸭2.1/6只A2兴达12.9"},
					{code:"BO0016",name:"白条鸭2.2/6只A2兴达13.5"},
					{code:"BO0017",name:"白条鸭2.3/6只A2兴达14.1"},
					{code:"BO0018",name:"白条鸭2.4/6只A2兴达14.7"},
					{code:"BQ0001",name:"鸭三节翅6根A2兴达12"},
					{code:"BQ0002",name:"鸭三节翅不分级A2六和10"},
					{code:"BS0001",name:"西装鸭1.7/8只A2兴达14"},
					{code:"BS0002",name:"西装鸭1.8/8只A2兴达14.8"},
					{code:"BS0003",name:"西装鸭1.9/8只A2兴达15.6"},
					{code:"BS0004",name:"西装鸭2.0/6只A2兴达12.3"},
					{code:"BT0001",name:"鸭胸肉卷不分级A2兴达25"}
				],
				historySearchStocks : JSON.parse(localStorage.getItem('historySearchStocks')) || [],
				inputCode : '',
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
			onInput (){
				if(this.inputCode.length === 0) {
					this.isShow = false;
					return;
				}
				let currSearchList = []
				for(const {code,name} of this.marketList){
					if(code.indexOf(this.inputCode) >= 0){
						currSearchList.push({
							code,
							name
						}); 
					}
				}
				if(currSearchList.length > 0){
					this.isShow = true;
				}else{
					this.isShow = false;
				}
				this.currSearchList = currSearchList;
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
