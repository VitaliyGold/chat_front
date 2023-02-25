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

import useOwnProfile from '@/store/ownProfile';
import ProfileController from '@/api/profile';
import WebSocketConnect from '@/sockets';
import { getJwtToken, getUserId } from '@/utils/jwt';
import emitter from '@/utils/emitter';
import { getProfileModel } from '@/components/Windows/Profile/helpers';

import ActionPanel from '@/components/ActionPanel/ActionPanel.vue';
import MenuBtn from '@/components/Menu/MenuBtn.vue';
import LoaderComponent from '@/components/UI/UiLoader.vue';
import ActionDisplay from '@/components/MainPage/ActionDisplay.vue';

export default defineComponent({
	components: {
		'action-display-component': ActionDisplay,
		'action-panel-component': ActionPanel,
		'menu-btn-component': MenuBtn,
		'loader-component': LoaderComponent,
	},
	setup() {
		const ownProfileStore = useOwnProfile();
		const loading = ref(true);

		const socketConnect = () => {
			const token = getJwtToken();
			if (token) {
				const socket = new WebSocketConnect(token);
				socket.connect();
			} else {
				emitter.emit('error', {
					message: 'socket_connect_error',
				});
			}
		};

		const getProfile = async () => {
			try {
				const userId = getUserId();
				if (!userId) {
					throw new Error('Ошибка в типах');
				}

				const userProfile = await ProfileController.getProfile(userId);
				ownProfileStore.fillOwnProfile(getProfileModel(userProfile, true));
				loading.value = false;
			} catch (e) {
				emitter.emit('error', {
					message: e,
				});
			}
		};

		onMounted(() => {
			getProfile();
			socketConnect();
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
