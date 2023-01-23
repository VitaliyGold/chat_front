type WindowsTypes = 'chat' | 'settings' | 'invite'
interface BaseWindow {
    hide: boolean,
    type: WindowsTypes,
    windowId: string,
    name: string
}

interface SettingsWindow extends BaseWindow {
    name: 'Настройки',
    type: 'settings',
    windowId: 'settings'
}

interface InviteWindow extends BaseWindow {
    name: 'Создать чат',
    type: 'invite',
    windowId: 'invite'
}

interface ChatWindow extends BaseWindow {
    isNewChat: boolean,
    chatId: string,
    members?: string[]
}

export type WindowObject = ChatWindow | SettingsWindow | InviteWindow;

type WindowsListType = Map<string, WindowObject>;

interface ChatWindowConfig {
    chatId: string,
    members?: string[],
    isNewChat: boolean
}

export {
	BaseWindow,
	WindowsTypes,
	WindowsListType,
	SettingsWindow,
	InviteWindow,
	ChatWindow,
	ChatWindowConfig,
};
