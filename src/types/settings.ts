import { Component } from 'vue';

export type SettingsName =
    'Редактирование профиля'
    | 'Редактирование оповещений'
    | 'Выход';

export type SettingsType =
    'edit'
    | 'alert'
    | 'exit'

export interface SettingItem {
    settingIcon: Component,
    settingName: SettingsName,
    settingType: SettingsType
}
