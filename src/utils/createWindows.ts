import {
	ChatWindow,
	ChatWindowConfig,
	InviteWindow,
	SettingsWindow,
} from '@/types/window';

export function getSettingsWindow(): SettingsWindow {
	return {
		hide: true,
		type: 'settings',
		windowId: 'settings',
		name: 'Настройки',
		showHelpWindow: false,
	};
}

export function getInviteWindow(): InviteWindow {
	return {
		hide: true,
		type: 'invite',
		windowId: 'invite',
		name: 'Найти контакт',
		showHelpWindow: false,
		profileId: '',
	};
}

export function getChatWindow({ chatId, isNewChat, name } : ChatWindowConfig): ChatWindow {
	return {
		hide: true,
		type: 'chat',
		name,
		// при создании присваивается временный id
		windowId: chatId,
		chatId,
		showHelpWindow: false,
		isNewChat,
	};
}
