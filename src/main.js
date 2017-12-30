import './lib/compatible';
import Vue from 'vue';
import App from './App.vue';
import './scss/normalize.css';
import './scss/common.scss';
import router from './router';
import store from './store';
import VueResource from 'vue-resource';

Vue.config.productionTip = false;
Vue.use(VueResource);

new Vue({ 
	//el : '#app',
	router,
	store,
	render : h => h(App)
}).$mount('#app');
