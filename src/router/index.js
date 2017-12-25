import guardRoute from './guardRoute.js';
import my from './my.js';

import Index from '../views/Index.vue';
import NewsList from '../views/NewsList.vue';
import GoodsClassification from '../views/GoodsClassification.vue';
import TradeMarket from '../views/TradeMarket.vue';
import BestSellerRank from '../views/BestSellerRank.vue';
import Search from '../views/Search.vue';
import MyIndex from '../views/my/MyIndex.vue';
import NotFound from '../views/NotFound.vue';
import NewsContent  from '../views/NewsContent.vue';
import Trade from '../views/Trade.vue';
import StockDetail from '../views/StockDetail.vue';
import Login from '../views/Login.vue';

import Reg from '../views/register/Reg.vue';
import PersonReg from '../views/register/PersonReg.vue';
import EnterpriseReg from '../views/register/EnterpriseReg.vue';


const routes = [
	{
		path : '/',
		name : 'entry',
		redirect : '/index'
	},
	{
		path : '/index',
		component : Index,
	},
	{
		path : '*',
		component : NotFound,
	},
	{
		path : '/newList',
		component : NewsList,
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
		beforeEnter : guardRoute,
	},
	{
		path : '/bestSellerRank',
		component : BestSellerRank,
	},
	{
		path : '/search',
		component : Search,
	},
	{
		path : '/stockDetail',
		component : StockDetail,
	},
	{
		path : '/my',
		component : MyIndex,
		children : my
	},
	{
		path : '/newsDetails/:id',
		component : NewsContent,
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
];

export default routes;
