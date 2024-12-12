import { createRouter, createWebHashHistory } from 'vue-router';

import registerRouterHook from './routerPermission';
import Home from '@/views/home/index.vue';
import Login from '@/views/login/index.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

registerRouterHook(router);
export default router;
