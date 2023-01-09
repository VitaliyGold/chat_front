import { SettingItem } from "@/types/settings";
import AccountEdit from 'vue-material-design-icons/AccountEdit.vue';
import AccountAlert from 'vue-material-design-icons/AccountAlert.vue';
import ExitToApp from 'vue-material-design-icons/ExitToApp.vue';

export const settings_list_data: SettingItem[] = [
    {
        setting_icon: AccountEdit,
        setting_name: 'Редактирование профиля',
        setting_type: 'edit'
    },
    {
        setting_icon: AccountAlert,
        setting_name: 'Редактирование оповещений',
        setting_type: 'alert'
    },
    {
        setting_icon: ExitToApp,
        setting_name: 'Выход',
        setting_type: 'exit'
    }
]