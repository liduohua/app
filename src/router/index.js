import Vue from 'vue';
import VueRouter from 'vue-router';
import loginGuard ,{afterEachGuard,beforeEachGuard} from './guardRoute';
import store from '../store'

import my from './my.js';

import Index from '../views/Index.vue';// 首页
import NewsList from '../views/NewsList.vue';// 新闻列表
import GoodsClassification from '../views/GoodsClassification.vue';// 商品分类
import TradeMarket from '../views/TradeMarket.vue';// 交易行情
import BestSellerRank from '../views/BestSellerRank.vue';// 畅销榜
import Search from '../views/Search.vue';// 搜索
import MyIndex from '../views/my/MyIndex.vue';// 个人中心首页视图
import NotFound from '../views/NotFound.vue';// 404页面
import NewsDetail from '../views/NewsDetail.vue';// 新闻详情
import Trade from '../views/Trade.vue';// 交易
import AllFunBtns from '../views/AllFunBtns.vue';// 全部功能页
import StockDetail from '../views/StockDetail.vue';// 股票详情
import Login from '../views/Login.vue';// 登录

import Reg from '../views/register/Reg.vue';// 注册
import PersonReg from '../views/register/PersonReg.vue';// 个人注册
import EnterpriseReg from '../views/register/EnterpriseReg.vue';// 企业注册

const routes = [
	{
		path : '/',
		name : 'entry',
		redirect : '/index'
	},
	{
		path : '/index',
		component : Index,
		meta : {
			viewName : 'index',
			title : '云冻批',
		},
	},
	{
		path : '*',
		component : NotFound,
	},
	{
		path : '/newList',
		component : NewsList,
		meta : {
			viewName : 'newsList',
			title : '新闻列表',
		},
	},
	{
		path : '/goodsClassification',
		component : GoodsClassification,
	},
	{
		path : '/tradeMarket',
		component : TradeMarket,
	},
	{
		path : '/trade',
		component : Trade,
		beforeEnter : loginGuard,
	},
	{
		path : '/bestSellerRank',
		component : BestSellerRank,
		meta : {
			viewName : 'bestSellerRank',
			title : '畅销榜',
		},
	},
	{
		path : '/allFunBtns',
		component : AllFunBtns,
		meta : {
			title : '全部功能按钮',
		},
	},
	
	{
		path : '/search',
		component : Search,
		meta : {
			viewName : 'search',
			title : '搜索',
		},
	},
	{
		path : '/stockDetail',
		component : StockDetail,
	},
	{
		path : '/my',
		component : MyIndex,
		children : my,
		meta : {
			viewName : 'my',
			title : '个人中心',
		},
	},
	{
		path : '/newsDetail/:id',
		component : NewsDetail,
		props : true,
	},
	{
		path : '/login',
		component : Login,
	},
	{
		path : '/reg',
		component : Reg,
	},
	{
		path : '/personReg',
		component : PersonReg,
	},
	{
		path : '/enterpriseReg',
		component : EnterpriseReg,
	}
]

Vue.use(VueRouter)
const router = new VueRouter({
    routes,
    mode: 'history'
})

router.afterEach((to, from) => {
    afterEachGuard(to, store, router)
})
// 入栈时将视图压入栈
router.beforeEach((to, from, next) => {
    beforeEachGuard(to, from, next, router)
})

export default router
