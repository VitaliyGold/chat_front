import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Registration from '@/views/Registration.vue';
import Login from '@/views/Login.vue';
import Main from '@/views/Main.vue';

const routes: Array<RouteRecordRaw> = [

	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/',
		name: 'Main',
		component: Main,
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
