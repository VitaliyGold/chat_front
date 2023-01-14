interface BaseWindow {
    hide: boolean,
    type: WindowsTypes,
    window_id: string,
    name: string
}

interface SettingsWindow extends BaseWindow {
    name: 'Настройки',
    type: 'settings',
    window_id: 'settings'
}

interface InviteWindow extends BaseWindow {
    name: 'Создать чат',
    type: 'invite',
    window_id: 'invite'
}

interface ChatWindow extends BaseWindow {
    is_new_chat: boolean,
    chat_id: string,
    members?: string[]
}

export type WindowObject = ChatWindow | SettingsWindow | InviteWindow;

interface WindowsListType {
    [index: string] : WindowObject
}


interface ChatWindowConfig {
    chat_id: string,
    members?: string[],
    is_new_chat: boolean
}

type WindowsTypes = 'chat' | 'settings' | 'invite'

export {
    BaseWindow,
    WindowsTypes,
    WindowsListType,
    SettingsWindow,
    InviteWindow,
    ChatWindow,
    ChatWindowConfig
}