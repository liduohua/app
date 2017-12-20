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

const routes = [
	{
		path : '/',
		component : Index,
		name : 'entry',
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
	}
];

export default routes;
