import Index from '../views/Index.vue';
import NewsList from '../views/NewsList.vue';
import GoodsClassification from '../views/GoodsClassification.vue';
import BestSellerRank from '../views/BestSellerRank.vue';
const routes = [
	{
		path : '/',
		component : Index,
		name : 'entry',
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
		path : '/bestSellerRank',
		component : BestSellerRank,
	},
];

export default routes;
