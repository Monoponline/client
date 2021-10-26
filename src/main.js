import { createApp } from 'vue';
import VueToast from 'vue-toast-notification';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vue-toast-notification/dist/theme-sugar.css';
import './index.css';

createApp(App).use(store).use(router).use(VueToast).mount('#app');
