import Vue from 'vue';
import App from './App.vue';
import './scss/normalize.scss';
import './scss/common.scss'
import router from './router';

Vue.config.productionTip = false;

new Vue({ 
	el : '#app',
	router,
	render : h => h(App)
});
