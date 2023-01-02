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

interface WindowsList {
    [index: string] : Window | SettingsWindow | InviteWindow
}

type WindowsTypes = 'chat' | 'settings' | 'invite'

export {
    Window,
    WindowsTypes,
    WindowsList,
    SettingsWindow,
    InviteWindow
}