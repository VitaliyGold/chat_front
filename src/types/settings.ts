export type SettingsName =
    'Редактирование профиля'
    | 'Редактирование оповещений'
    | 'Выход';

export type SettingsType =
    'edit'
    | 'alert'
    | 'exit'

export interface SettingItem {
    settingIcon: any,
    settingName: SettingsName,
    settingType: SettingsType
}
