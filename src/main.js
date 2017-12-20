import Vue from 'vue';
import App from './App.vue';
import './scss/normalize.css';
import './scss/common.scss'
import routes from './router';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
Vue.config.productionTip = false;
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
	routes,
	mode : 'history'
});

new Vue({ 
	//el : '#app',
	router,
	render : h => h(App)
}).$mount('#app');
