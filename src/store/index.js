import Vue from 'vue';
import Vuex from 'vuex';

let store = {
	state :{
		cacheViews : ['index'],
		userInfo : {},
		nextRoute : null,
		allFuncBtns : [
			{ imgAddr: 'dist/assets/icon/index-ico10.png', labelText: '财经要闻', id: 1, linkUrl: 'home/newsList' },
            { imgAddr: 'dist/assets/icon/best-sell-icon.png', labelText: '畅销榜单', id: 2, linkUrl: 'home/bestSellerRank' },
            { imgAddr: 'dist/assets/icon/pay-manage-icon.png', labelText: '付款管理', id: 3, linkUrl: 'myspace/payManage' },
            { imgAddr: 'dist/assets/icon/my-select-icon.png', labelText: '自选产品', id: 4, linkUrl: 'myspace/mySelectManage' },
            { imgAddr: 'dist/assets/icon/my-order-icon.png', labelText: '我的订单', id: 5, linkUrl: 'myspace/orderManage' },   
            { imgAddr: 'dist/assets/icon/index-ico11.png', labelText: '交易行情', id: 6, linkUrl: 'index/market' },
            { imgAddr: 'dist/assets/icon/index-ico13.png', labelText: '资金流水', id: 7, linkUrl: 'myspace/transferWater' },
            // { imgName: 'index-ico12.png', descText: '热点推荐', id: 10 },
            { imgAddr: 'dist/assets/icon/latest-browse-icon.png', labelText: '最近浏览', id: 8 },
            // { imgName: 'my-order-icon.png', descText: '常用清单', id: 7 },
            { imgAddr: 'dist/assets/icon/activity-center-icon.png', labelText: '活动中心', id: 9 },
            { imgAddr: 'dist/assets/icon/notice-icon.png', labelText: '公告', id: 10 },
		],
		marketList : [],
		brands : [12],
		classify: [],
		toastMsgs : [],
		showToast : false
	},
	getters : {
		validateLogin : state => {
			if(state.userInfo.userName){
				return true;
			}else{
				return false;
			}
		},
		clientName : state => {
			return state.userInfo.clientName || '--';
		},
		subClassify : state => {
			
		}
	},
	mutations :{
		showToast (state, msg=""){
			state.showToast = true;
			let toastMsg = {};
			if(typeof msg === 'string'){
				toastMsg = {
					msg,
					delay : 3000,
					aniTime : '500ms'
				};
			}else{
				toastMsg = msg;
			}
			state.toastMsgs.push(toastMsg);
		},
		hiddenToast (state){
			state.showToast = false;
		},
		addToastMsg (state,toastMsg){
			
		},
		deleteToastMsg (state, newToastMsgs){
			
		},
		// 添加需要缓存的视图
		addView (state,view){
			var index = state.cacheViews.indexOf(view);
			if(index > -1 || !view) return;
			state.cacheViews.push(view);
			console.log(state.cacheViews);
		},
		// 删除缓存视图
		deleteView (state,view){
			var index = state.cacheViews.indexOf(view);
			if(index > -1){
				state.cacheViews.splice(index,1);
			}
			console.log(state.cacheViews);
		},
		// 用户登录
		userLogin (state,userInfo){
			state.userInfo = userInfo;
		},
		exitLogin (state){
			state.userInfo = {};
		},
		saveNextRoute (state, route){
			state.nextRoute = route;
		},
		delNextRoute (state, route){
			state.nextRoute = null;
		},
		updateBrands (state, newBrands){
			state.brands = newBrands;
		},
		updateClassify (state, newClassify){
			state.classify = newClassify;
		}
	},
	actions : {
		
	}
}

Vue.use(Vuex);
export default new Vuex.Store(store);
