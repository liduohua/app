import loginGuard from './guardRoute';

import My from '../views/my/My.vue';
import MySelect from '../views/my/MySelect.vue';
import AssetsInfo from '../views/my/AssetsInfo.vue';
import AccountManage from '../views/my/AccountManage.vue';
import OrderManage from '../views/my/OrderManage.vue';
import SetGuesturePassword from '../views/my/SetGuesturePassword.vue';

import QueryGoodsInfo from '../views/my/QueryGoodsInfo.vue';

import DayEntrust from '../views/my/DayEntrust.vue';
import DayTraded from '../views/my/DayTraded.vue';
import HistoryEntrust from '../views/my/HistoryEntrust.vue';

import PayManage from '../views/my/PayManage.vue';
import Recharge from '../views/my/Recharge.vue';
import WithdrawCash from '../views/my/WithdrawCash.vue';
import FundWater from '../views/my/FundWater.vue';

import QueryBill from '../views/my/QueryBill.vue';

let my = [
		{
            path: 'index',  
            component: My,  
            meta : {
            	viewName : 'myindex',
            	title : '个人中心'
            },
            beforeEnter : loginGuard,
        },
        {
            path: 'mySelect',  
            component: MySelect,   
            meta : {
            	viewName : 'my-select',
            	title : '我的自选'
            }
        },
        {
            path: 'payManage',  
            component: PayManage,   
            meta : {
            	viewName : 'pay-manage',
            	title : '我的自选'
            },
            beforeEnter : loginGuard,
        },
        {
            path: 'recharge',  
            component: Recharge,   
            meta : {
            	viewName : '',
            	title : '我的自选'
            }
        },
        {
            path: 'withdrawCash',  
            component: WithdrawCash,   
            meta : {
            	viewName : '',
            	title : '我的自选'
            }
        },
        {
            path: 'fundWater',  
            component: FundWater,   
            meta : {
            	viewName : '',
            	title : '我的自选'
            }
        },
        {
            path: 'queryGoodsInfo',  
            component: QueryGoodsInfo,   
            meta : {
            	viewName : '',
            	title : '商品信息'
            }
        },
        {
            path: 'queryBill',  
            component: QueryBill,   
            meta : {
            	viewName : '',
            	title : '商品信息'
            }
        },
        {
            path: 'dayEntrust',  
            component: DayEntrust,   
            meta : {
            	viewName : '',
            	title : '当日委托'
            }
        },
        {
            path: 'dayTraded',  
            component: DayTraded,   
            meta : {
            	viewName : '',
            	title : '当日成交'
            }
        },
        {
            path: 'historyEntrust',  
            component: HistoryEntrust,   
            meta : {
            	viewName : '',
            	title : '历史委托'
            }
        },
        {
            path: 'assetsInfo',  
            component: AssetsInfo,   
            meta : {
            	viewName : 'assets-info',
            	title : '资产信息'
            }
        },
        {
            path: 'accountManage',  
            component: AccountManage,   
            meta : {
            	viewName : 'account-manage',
            	title : '账户管理'
            }
        },
        {
            path: 'setGuesturepassword',  
            component: SetGuesturePassword,   
            meta : {
            	// viewName : 'SetGuesturePassword',
            	title : '设置手势密码'
            },
            beforeEnter : loginGuard,
        },
        {
            path: 'orderManage',  
            component: OrderManage,   
            meta : {
            	viewName : 'orderManage',
            	title : '账户管理'
            },
            beforeEnter : loginGuard,
        },
	];
export default my;
