<template>
	<ul>
		<settings-item-component
			v-for="setting of settingsList"
			:key="setting.settingName"
			:setting-name="setting.settingName"
			@click="() => selectSettingsItem(setting.settingType)"
		>
			<component
				:is="setting.settingIcon"
				:size="36"
				class="icon-3x"
			/>
		</settings-item-component>
	</ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

import { SettingsType } from '@/types/settings';
import AuthController from '@/api/auth';
import { removeJwtToken, removeUserId } from '@/utils/jwt';
import { settingsListData } from './consts';

import SettingsItem from './SettingsItem.vue';

export default defineComponent({
	components: {
		'settings-item-component': SettingsItem,
	},
	setup() {
		const router = useRouter();

		const logOut = async () => {
			await AuthController.logout();
			removeJwtToken();
			removeUserId();
			router.push('login');
		};

		const selectSettingsItem = (type: SettingsType) => {
			switch (type) {
			case 'edit':
				console.log('Открыть редактирование профиля');
				break;
			case 'alert':
				console.log('Открыть настройки оповещений');
				break;
			case 'exit':
				logOut();
				break;
			default:
				break;
			}
		};

		return {
			settingsList: settingsListData,
			selectSettingsItem,
		};
	},

});

</script>

<style scoped lang="less">
    ul {
        border: 1px solid black;
        margin-top: 20px;
        border-radius: 4px;
    }
</style>
