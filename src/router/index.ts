import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '@/views/Login.vue';
import Registration from '@/views/Registration.vue';
import Main from '@/views/Main.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'Main',
    component: Main,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
