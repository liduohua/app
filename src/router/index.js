import Home from '../views/Home.vue';
import NewsList from '../views/NewsList.vue';
import GoodsClassification from '../views/GoodsClassification.vue';
const routes = [
	{
		path : '/',
		component : Home,
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
];

export default routes;
