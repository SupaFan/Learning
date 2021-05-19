import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/index';
import Vant from 'vant';
import 'vant/lib/index.css';
import plugin from '@/libs/plugin.js';

const app = createApp(App);
app.use(router);
app.use(Vant);
app.use(plugin);
app.use(store);


app.mount('#app');
