<template>
	<div class="brand-classify" >
		<div class="h-scroll-panel">
            <div class="wrapper one-level-classification" ref="mainClassifyScrollEl">
                <ul @click="onClassifyChange">
                    <li :class="index === mainClassifyActiveIndex ? 'active' : ''" :data-index="index"  v-for="({classifyName},index) of mainClassify" :key="index"><span>{{classifyName}}</span></li>
                </ul>
            </div>
        </div>
        <TopNews></TopNews>
        <div class="h-scroll-panel ">
            <div class="wrapper brand" ref="brandScrollEl">
                <ul @click="onBrandChange">
                    <li :class="index === brandActiveIndex ? 'active' : ''" v-for="(brand,index) of brands" :data-index="index" :key="index"><span>{{brand}}</span></li>
                </ul>
            </div>
        </div>
        <div class="list-layout-panel">
            <div class="two-level-classification" ref="subClassifyScrollEl">
                <ul @click="onSubClassifyChange">
                    <li :class="index === subClassifyActiveIndex ? 'active' : ''" v-for="(subClassifyName,index) of subClassify" :data-index="index" :key="index">{{subClassifyName}}</li>
                </ul>
            </div>
            <slot></slot>
        </div>
	</div>
</template>
<script>
	import TopNews from './TopNews.vue';
	import {httpPost} from '../api';
	let IScroll = require('../lib/iscroll-probe.js').IScroll 
	import {mapState, mapMutations} from 'vuex';
	export default {
		data : () => ({
			subClassify : [], // 子分类
			brandActiveIndex : 0, // 当前选中的品牌索引
			mainClassifyActiveIndex : 0, // 当前选中的分类索引
			subClassifyActiveIndex : 0, // 当前选中的子分类索引
			oldCondition : { // 选中的筛选条件
				brand : '',
				mainClassify : '',
				subClassify : ''
			}
		}),
		computed : {
			...mapState({
				brands : 'brands', // 品牌
				mainClassify : 'classify' // 主分类
			})
		},
		components :{
			TopNews,
		},
		methods :{
			...mapMutations([
				"updateBrands",
				"updateClassify"
			]),
			/*
			 * 发射筛选条件改变事件
			 */
			emitCdtCgeEvent (){
				let currBrand = this.brands[this.brandActiveIndex];
				let currMainClassify = this.mainClassify[this.mainClassifyActiveIndex].classifyName;
				let currSubClassify = this.subClassify[this.subClassifyActiveIndex];
				let {brand, mainClassify, subClassify} = this.oldCondition;
				if(brand !== currBrand || mainClassify !== currMainClassify || subClassify !== currSubClassify){
					this.oldCondition = {
						brand : currBrand,
						mainClassify : currMainClassify,
						subClassify : currSubClassify
					}
					this.$emit('conditionChange',Object.assign({}, this.oldCondition));
				}
			},
			/*
			 * 品牌改变
			 */
			onBrandChange (e){
				var target = e.target;
				if(target.tagName.toLowerCase() === 'li'){
					this.brandActiveIndex = +target.getAttribute('data-index');
					this.emitCdtCgeEvent();
				}
			},
			/*
			 * 分类改变
			 */
			onClassifyChange (e){
				var target = e.target;
				if(target.tagName.toLowerCase() === 'li'){
					this.mainClassifyActiveIndex = +target.getAttribute('data-index');
					this.subClassify = this.mainClassify[this.mainClassifyActiveIndex].subClassify;
					this.subClassifyActiveIndex = 0;
					this.emitCdtCgeEvent();
					setTimeout(() => {
						this.subClassifyScroll.refresh();
					})
				}
			},
			/*
			 * 子分类改变
			 */
			onSubClassifyChange (e){
				var target = e.target;
				if(target.tagName.toLowerCase() === 'li'){
					this.subClassifyActiveIndex = +target.getAttribute('data-index');
					this.emitCdtCgeEvent();
				}
			}
		},
		async created (){
			let brandsAndClassify = await httpPost('400001');
			this.updateBrands(brandsAndClassify.brands);
			this.updateClassify(brandsAndClassify.classify);
			this.subClassify = this.mainClassify[0].subClassify;
			setTimeout(() => {	
				this.brandScroll.refresh();
				this.mainClassifyScroll.refresh();
				this.subClassifyScroll.refresh();
			})
		},
		mounted (){
			this.brandScroll = new IScroll(this.$refs.brandScrollEl,{
				scrollX: true,
                bounce: false
			});
			this.mainClassifyScroll = new IScroll(this.$refs.mainClassifyScrollEl,{
				scrollX: true,
                bounce: false
			})
			this.subClassifyScroll = new IScroll(this.$refs.subClassifyScrollEl,{
				scrollY: true,
                bounce: false
			})
		}
	}
</script>
<style lang="scss">
	.brand-classify{
		.h-scroll-panel {
            background-color: #fff;
            //border-bottom: 1px solid #e9e9e9;
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
            color: #2e2f33;
            padding: 0 .225rem;
            border-bottom: 1px solid #fff;
            font-size: .25rem;
            display: inline-block;
        }

        .h-scroll-panel .wrapper ul li.active {
            border-bottom-color: #22ac38;
            color:#22ac38;
            
        }
		.h-scroll-panel .wrapper ul li.active span{
			transform: scale(1.1);
			
			display:inline-block;
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
