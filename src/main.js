import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import router from './router';
import './assets/main.css';
import './theme/styles.scss';
import autoRefresh from './plugins/auto-update';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import.meta.env.VITE_APP_PATH !== '' && autoRefresh(); // 只在生产环境下自动刷新

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(createPinia());
app.use(router);

app.mount('#app');
