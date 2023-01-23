import { defineStore } from 'pinia';
import {
	WindowsListType, WindowsTypes, ChatWindowConfig, ChatWindow,
} from '@/types/window';
import { getChatWindow, getInviteWindow, getSettingsWindow } from '@/utils/helpers';
import useMessages from './messages';

const useWindows = defineStore('windows', {
	state: () => ({
		windowsList: new Map() as WindowsListType,
	}),
	actions: {
		addWindow(type: WindowsTypes, config: ChatWindowConfig | null = null) {
			let messageStore;
			if (this.windowsList.get(type)) {
				return;
			}
			switch (type) {
			case 'settings':
				this.windowsList.set(type, getSettingsWindow());
				break;
			case 'invite':
				this.windowsList.set(type, getInviteWindow());
				break;
			default:
				if (!config) {
					break;
				}
				messageStore = useMessages();
				this.windowsList.set(config.chatId, getChatWindow(config));
				messageStore.addTempChatMessageList(config.chatId);
				break;
			}
		},
		closeWindow(windowId: string) {
			this.windowsList.delete(windowId);
		},
		hideWindow(windowId: string) {
			const window = this.windowsList.get(windowId);
			if (window) {
				window.hide = false;
			}
		},
		openWindow(windowId: string) {
			const window = this.windowsList.get(windowId);
			if (window) {
				window.hide = true;
			}
		},
		setChatId(windowId: string, chatId: string) {
			if (this.windowsList.get(windowId) && this.windowsList.get(windowId)?.type === 'chat') {
				this.windowsList.set(windowId, {
					...this.windowsList.get(windowId),
					isNewChat: false,
					chatId,
				} as ChatWindow);
			}
		},
	},
});

export default useWindows;
