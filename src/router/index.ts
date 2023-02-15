import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Registration from '@/views/Registration.vue';

const routes: Array<RouteRecordRaw> = [
	
	
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
