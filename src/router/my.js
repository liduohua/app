import My from '../views/my/My.vue';
import MySelect from '../views/my/MySelect.vue';
import AssetsInfo from '../views/my/AssetsInfo.vue';
import AccountManage from '../views/my/AccountManage.vue';
import OrderManage from '../views/my/OrderManage.vue';
let my = [
		{
            path: 'index',  
            component: My,  
            meta : {
            	viewName : 'myindex',
            	title : '个人中心'
            }
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
            path: 'orderManage',  
            component: OrderManage,   
            meta : {
            	viewName : 'orderManage',
            	title : '账户管理'
            }
        },
	];



export default my;
