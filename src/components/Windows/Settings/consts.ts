import AccountEdit from 'vue-material-design-icons/AccountEdit.vue';
import AccountAlert from 'vue-material-design-icons/AccountAlert.vue';
import ExitToApp from 'vue-material-design-icons/ExitToApp.vue';

import { SettingItem } from '@/types/settings';

export const settingsListData: SettingItem[] = [
	{
		settingIcon: AccountEdit,
		settingName: 'Редактирование профиля',
		settingType: 'edit',
	},
	{
		settingIcon: AccountAlert,
		settingName: 'Редактирование оповещений',
		settingType: 'alert',
	},
	{
		settingIcon: ExitToApp,
		settingName: 'Выход',
		settingType: 'exit',
	},
];
