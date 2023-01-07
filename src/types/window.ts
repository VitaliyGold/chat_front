interface Window {
    hide: boolean,
    type: WindowsTypes,
    window_id: string,
    name: string
}

interface SettingsWindow extends Window {
    name: 'Настройки',
    type: 'settings',
    window_id: 'settings'
}

interface InviteWindow extends Window {
    name: 'Создать чат',
    type: 'invite',
    window_id: 'invite'
}

interface ChatWindow extends Window {
    is_new_chat: boolean,
    user_id: string
}

interface WindowsList {
    [index: string] : ChatWindow | SettingsWindow | InviteWindow
}


interface ChatWindowConfig {
    chat_id?: string,
    user_id?: string,
    is_new_chat: boolean
}

type WindowsTypes = 'chat' | 'settings' | 'invite'

export {
    Window,
    WindowsTypes,
    WindowsList,
    SettingsWindow,
    InviteWindow,
    ChatWindow,
    ChatWindowConfig
}