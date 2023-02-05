import { ChatMember } from './chats';

export type WindowsTypes = 'chat' | 'settings' | 'invite'
export interface BaseWindow {
    hide: boolean,
    type: WindowsTypes,
    windowId: string,
    name: string
}

export interface SettingsWindow extends BaseWindow {
    name: 'Настройки',
    type: 'settings',
    windowId: 'settings'
}

export interface InviteWindow extends BaseWindow {
    name: 'Создать чат',
    type: 'invite',
    windowId: 'invite'
}

export interface ChatWindow extends BaseWindow {
    isNewChat: boolean,
    chatId: string,
    members: ChatMember[]
}

export type WindowObject = ChatWindow | SettingsWindow | InviteWindow;

export type WindowsList = Record<string, WindowObject>;

export interface ChatWindowConfig {
    chatId: string,
    members: ChatMember[],
    isNewChat: boolean
}
