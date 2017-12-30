export default function(to,from,next){
	next('/login');
	//next();
}

export function beforeEach(to,from,next){
	next(vm => {
		console.log(vm);
	});
}

export function afterEach(to,store){
	to.matched.forEach(route => {
		store.commit('addView',route.meta.viewName)
	});
}
