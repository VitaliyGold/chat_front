import {
	ChatWindow,
	InviteWindow,
	SettingsWindow,
	ChatWindowConfig,
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
		name: 'Создать чат',
	};
}

export function getChatWindow({ chatId = '', isNewChat, members } : ChatWindowConfig): ChatWindow {
	return {
		hide: true,
		type: 'chat',
		// при создании присваивается временный id
		windowId: chatId,
		chatId: isNewChat ? '' : chatId,
		isNewChat,
		members,
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
