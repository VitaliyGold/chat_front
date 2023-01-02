import { Window, InviteWindow, SettingsWindow } from "@/types/window"

export function getSettingsWindow(): SettingsWindow {
    return {
        hide: true,
        type: 'settings',
        window_id: 'settings',
        name: 'Настройки'
    }
}

export function getInviteWindow(): InviteWindow {
    return {
        hide: true,
        type: 'invite',
        window_id: 'invite',
        name: 'Создать чат'
    }
}

export function getChatWindow(chat_id: string): Window {
    return {
        hide: true,
        type: 'chat',
        window_id: chat_id,
        name: 'Чат'
    }
}