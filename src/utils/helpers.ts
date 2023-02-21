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
	};
}

export function getInviteWindow(): InviteWindow {
	return {
		hide: true,
		type: 'invite',
		windowId: 'invite',
		name: 'Найти контакт',
		windowMode: 'invite',
		selectedUserId: '',
	};
}

export function getChatWindow({ chatId = '', isNewChat, memberNames } : ChatWindowConfig): ChatWindow {
	return {
		hide: true,
		type: 'chat',
		// при создании присваивается временный id
		windowId: chatId,
		chatId: isNewChat ? '' : chatId,
		isNewChat,
		memberNames,
		name: 'Чат',
	};
}

export function debounce(fn: any, delay: number) {
	let timeoutID: ReturnType<typeof setTimeout>;
	return (...args: any) => {
		if (timeoutID) { clearTimeout(timeoutID); }
		timeoutID = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}
