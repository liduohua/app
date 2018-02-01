<template>
	<div class="page">
		<NavHeader title="全部功能"></NavHeader>
    	<div class="content all-fun-btns">
        	<div class="my-app">我的应用</div>
        	<div class="grid-panel">
            	<ul @click="delPreFuncBtn">
               	 	<li v-for="(item,index) in preFuncBtns" :key="index" :data-id="item.id"><i class="subtract"></i><img :src="item.imgAddr" />{{item.labelText}}</li>
            	</ul>
        	</div>
        	<div class="my-app mt10">全部应用</div>
        	<div class="grid-panel">
            	<ul @click="delOrAddPreFuncBtn">
                	<li v-for="(item,index) in allFuncBtns" :key="index" :data-id="item.id"><i :class="item.iconClass"></i><img :src="item.imgAddr" />{{item.labelText}}</li>
            	</ul>
        	</div>
    	</div>
	</div>
</template>
<script>
	import NavHeader from '../components/NavHeader.vue';
	export default {
		data : () => ({
			preFunBtnIds : JSON.parse(localStorage.getItem('preFunBtnIds'))
		}),
		computed : {
			allFuncBtns(){
				return this.$store.state.allFuncBtns.map((funcBtn) => {
					funcBtn = Object.assign({},funcBtn);
					funcBtn.iconClass = 'add';
					this.preFunBtnIds.some((id) => {
						if(id === funcBtn.id){
							funcBtn.iconClass = 'subtract';
							return true;
						}
						return false;
					});
					return funcBtn;
				});
			},
			preFuncBtns(){
				var preFuncBtns = [];
				this.preFunBtnIds.forEach((id) => {
					this.allFuncBtns.some((funcBtn) => {
						if(funcBtn.id === id && funcBtn.iconClass === 'subtract'){
							preFuncBtns.push(funcBtn);
						}
					})
				})
				return preFuncBtns;
			}
		},
		components :{
			NavHeader,
		},
		methods :{
			delPreFuncBtn(e){
				var target = e.target;
                var parentNode = target.parentNode;
                var id;
                if(id = (target.getAttribute('data-id') || parentNode.getAttribute('data-id'))){
                    id = Number(id);
                    this.preFunBtnIds.splice(this.preFunBtnIds.indexOf(id),1);
                }
                localStorage.setItem('preFunBtnIds', JSON.stringify(this.preFunBtnIds));
			},
			delOrAddPreFuncBtn(e){
				var target = e.target;
                var parentNode = target.parentNode;
                var id;
                if(id = (target.getAttribute('data-id') || parentNode.getAttribute('data-id'))){
                    id = Number(id);
                    var index = this.preFunBtnIds.indexOf(id);
                    if(index > -1){
                        this.preFunBtnIds.splice(index,1);
                    }else if(this.preFunBtnIds.length > 6){
                        // to do prompt
                    }else{
                        this.preFunBtnIds.unshift(id);
                    }
                }
                localStorage.setItem('preFunBtnIds', JSON.stringify(this.preFunBtnIds));
			},
		},
		
		created(){
		
		}
	}
</script>

<style lang="scss"> 
	@import '../scss/funcBtns.scss';
</style>
