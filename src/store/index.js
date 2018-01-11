import Vue from 'vue';
import Vuex from 'vuex';

let store = {
	state :{
		cacheViews : ['index'],
		userInfo : {},
		nextRoute : null,
	},
	getters : {
		validateLogin : state => {
			if(state.userInfo.userName){
				return true;
			}else{
				return false;
			}
		},
		clientName : state =>{
			return state.userInfo.clientName || '--';
		},
	},
	mutations :{
		//添加需要缓存的视图
		addView(state,view){
			var index = state.cacheViews.indexOf(view);
			if(index > -1 || !view) return;
			state.cacheViews.push(view);
			console.log(state.cacheViews);
		},
		//删除缓存视图
		deleteView(state,view){
			var index = state.cacheViews.indexOf(view);
			if(index > -1){
				state.cacheViews.splice(index,1);
			}
			console.log(state.cacheViews);
		},
		//用户登录
		userLogin(state,userInfo){
			state.userInfo = userInfo;
		},
		exitLogin(state){
			state.userInfo = {};
		},
		saveNextRoute(state,route){
			state.nextRoute = route;
		},
		delNextRoute(state,route){
			state.nextRoute = null;
		}
		
	},
	actions : {
		
	}
}

Vue.use(Vuex);
export default new Vuex.Store(store);