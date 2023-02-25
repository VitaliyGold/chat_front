import { ChatMember } from './chats';

export type WindowsTypes = 'chat' | 'settings' | 'invite';

export interface BaseWindow {
    hide: boolean,
    type: WindowsTypes,
    windowId: string,
    name: string,
    showHelpWindow: boolean,
    profileId?: string
}

export interface SettingsWindow extends BaseWindow {
    name: 'Настройки',
    type: 'settings',
    windowId: 'settings'
}

export interface InviteWindow extends BaseWindow {
    name: 'Найти контакт',
    type: 'invite',
    windowId: 'invite',
}

export interface ChatWindow extends BaseWindow {
    isNewChat: boolean,
    chatId: string,
}

export type WindowObject = ChatWindow | SettingsWindow | InviteWindow;

export type WindowsList = Record<string, WindowObject>;

export interface ChatWindowConfig {
    chatId: string,
    isNewChat: boolean,
    name: string
}
