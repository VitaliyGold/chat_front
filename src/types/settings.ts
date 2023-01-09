export type SettingsName = 
    'Редактирование профиля' 
    | 'Редактирование оповещений' 
    | 'Выход';

export type SettingsType =
    'edit'
    | 'alert'
    | 'exit'

export interface SettingItem {
    setting_icon: any,
    setting_name: SettingsName,
    setting_type: SettingsType
}