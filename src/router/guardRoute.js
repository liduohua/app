import store from '../store';
/*
 * 登录校验
 */
export default function loginGuard(to,from,next){
	if(!store.getters.validateLogin){
		store.commit('saveNextRoute',to);
		next('/login');
	}else{
		next();
	}
}

//如果不是有效登录直接跳到登录页面
export function beforeEachGuard(to,from,next){
	if(store.state.nextRoute && store.getters.validateLogin){
		let nextRoute = store.state.nextRoute;
		store.commit('delNextRoute');
		next(nextRoute);	
	}else{
		next();	
	}
}

//将入栈时的视图保存起来，这样不会销毁视图，只有当出栈时才销毁视图
export function afterEachGuard(to,store){
	to.matched.forEach(route => {
		store.commit('addView',route.meta.viewName)
	});
}


