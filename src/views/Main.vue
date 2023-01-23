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

export default defineComponent({
	name: 'MainPage',
	setup() {
		const router = useRouter();
		const profileStore = useProfile();

		const loading = ref(true);
		onMounted(async () => {
			try {
				const userProfile = await ProfileController.getProfile();

				console.log(userProfile);

				profileStore.fillUserProfile(userProfile);
			} catch (e) {
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
