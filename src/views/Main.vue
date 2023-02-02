<template>
	<loader-component
		v-if="loading"
	/>
	<main-display-component
		v-else
	/>
</template>

<script lang="ts">

import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import MainDisplay from '@/components/MainDisplay.vue';
import ProfileController from '@/api/profile';
import useProfile from '@/store/profile';
import Loader from '@/components/UI/LoaderComponent.vue';

import WebSocketConnect from '@/sockets';
import { getJwtToken } from '@/utils/jwt';

export default defineComponent({
	name: 'MainPage',
	setup() {
		const router = useRouter();
		const profileStore = useProfile();

		const loading = ref(true);
		onMounted(async () => {
			try {
				const userProfile = await ProfileController.getProfile();
				profileStore.fillUserProfile(userProfile);
				const token = getJwtToken();
				if (token) {
					const socket = new WebSocketConnect(token);
					socket.connect();
					console.log(socket);
				}
			} catch (e) {
				console.log(e);
				// вот тут дописать обработку ошибок
				router.push('login');
			} finally {
				loading.value = false;
			}
		});

		return {
			loading,
		};
	},
	components: {
		'loader-component': Loader,
		'main-display-component': MainDisplay,
	},

});

</script>
