<template>
	<loader-component
		v-if="loading"
	/>
	<div
		class="main_display"
		v-else
	>
		<action-display-component />
		<action-panel-component />
		<menu-btn-component />
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

import useProfile from '@/store/profile';
import ProfileController from '@/api/profile';
import WebSocketConnect from '@/sockets';
import { getJwtToken } from '@/utils/jwt';
import emitter from '@/utils/emitter';

import ActionDisplay from '@/components/MainPage/ActionDisplay.vue';
import ActionPanel from '@/components/ActionPanel/ActionPanel.vue';
import MenuBtn from '@/components/Menu/MenuBtn.vue';
import LoaderComponent from '@/components/UI/UiLoader.vue';

export default defineComponent({
	components: {
		'action-display-component': ActionDisplay,
		'action-panel-component': ActionPanel,
		'menu-btn-component': MenuBtn,
		'loader-component': LoaderComponent,
	},
	setup() {
		const profileStore = useProfile();
		const loading = ref(true);

		const socketConnect = (token: string) => {
			const socket = new WebSocketConnect(token);
			socket.connect();
		};

		const getProfile = async () => {
			try {
				const userProfile = await ProfileController.getProfile();
				profileStore.fillUserProfile(userProfile);
				const token = getJwtToken();
				if (token) {
					socketConnect(token);
				} else {
					emitter.emit('error', {
						message: 'socket_connect_error',
					});
					return;
				}
				loading.value = false;
			} catch (e) {
				emitter.emit('error', {
					message: e,
				});
			}
		};

		onMounted(() => {
			getProfile();
		});

		return {
			loading,
		};
	},
});
</script>

<style scoped>
    .main_display {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
