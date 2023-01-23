<template>
	<ul>
		<settings-item-component
			v-for="setting of settings_list"
			:key="setting.name"
			:setting_name="setting.setting_name"
			@click="() => selectSettingsItem(setting.setting_type)"
		>
			<component
				:is="setting.setting_icon"
				:size="36"
				class="icon-3x"
			/>
		</settings-item-component>
	</ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { SettingsType } from '@/types/settings';
import { settingsListData } from './consts';
import SettingsItem from './SettingsItem.vue';

export default defineComponent({
	components: {
		'settings-item-component': SettingsItem,
	},
	setup() {
		const selectSettingsItem = (type: SettingsType) => {
			switch (type) {
			case 'edit':
				console.log('Открыть редактирование профиля');
				break;
			case 'alert':
				console.log('Открыть настройки оповещений');
				break;
			case 'exit':
				console.log('Логаут');
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
