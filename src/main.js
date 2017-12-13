import Vue from 'vue';
import App from './App.vue';
import './scss/normalize.scss';
import './scss/common.scss'
import routes from './router';
import VueRouter from 'vue-router';
Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
	routes,
});

new Vue({ 
	//el : '#app',
	router,
	render : h => h(App)
}).$mount('#app');
