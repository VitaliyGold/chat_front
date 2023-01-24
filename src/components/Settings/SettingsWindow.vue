<template>
	<div
		class="settings-window"
	>
		<div class="profile_data">
			<user-item-component
				:user-info="userProfile"
				:is-profile="true"
				v-if="userProfile"
			/>
			<p
				v-else
			>
				Пользователь не загрузился
			</p>
		</div>
		<settings-list-component />
	</div>
</template>

<script lang="ts">
import useProfile from '@/store/profile';
import { defineComponent } from 'vue';

import UserItem from '@/components/UI/UserItem.vue';
import SettingsList from './SettingsList.vue';

export default defineComponent({
	name: 'SettingsWindow',
	components: {
		'user-item-component': UserItem,
		'settings-list-component': SettingsList,
	},
	setup() {
		const profileStore = useProfile();

		return {
			userProfile: profileStore.userProfile,
		};
	},
});
</script>

<style>
    .settings-window {
        padding: 5px 10px;
    }
</style>
