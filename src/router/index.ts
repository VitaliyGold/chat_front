import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Registration from '@/views/Registration.vue';
import Login from '@/views/Login.vue';

const routes: Array<RouteRecordRaw> = [
	
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
