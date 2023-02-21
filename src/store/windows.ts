import { defineStore } from 'pinia';
import {
	WindowsList, WindowsTypes, ChatWindow, ChatWindowConfig, InviteWindow,
} from '@/types/window';
import { getChatWindow, getInviteWindow, getSettingsWindow } from '@/utils/helpers';
import useMessages from './messages';

const useWindows = defineStore('windows', {
	state: () => ({
		windowsList: {} as WindowsList,
	}),
	actions: {
		addWindow(type: WindowsTypes, config: ChatWindowConfig | null = null) {
			let messageStore;
			if (this.windowsList[type]) {
				return;
			}
			switch (type) {
			case 'settings':
				this.windowsList[type] = getSettingsWindow();
				break;
			case 'invite':
				this.windowsList[type] = getInviteWindow();
				break;
			default:
				if (!config) {
					break;
				}
				messageStore = useMessages();
				this.windowsList[config.chatId] = getChatWindow(config);
				messageStore.addTempChatMessageList(config.chatId);
				break;
			}
		},
		closeWindow(windowId: string) {
			delete this.windowsList[windowId];
		},
		hideWindow(windowId: string) {
			const window = this.windowsList[windowId];
			if (window) {
				window.hide = false;
			}
		},
		openWindow(windowId: string) {
			const window = this.windowsList[windowId];
			if (window) {
				window.hide = true;
			}
		},
		setChatId(windowId: string, chatId: string) {
			if (this.windowsList[windowId] && this.windowsList[windowId]?.type === 'chat') {
				this.windowsList[windowId] = {
					...this.windowsList[windowId],
					isNewChat: false,
					chatId,
				} as ChatWindow;
			}
		},
		// пока такой тип, позже нужно будет подумать над чем-то более надежным, мб каким-то дженериком
		// пока используем только для invite
		changeModeWindow(windowId: string, mode: 'invite' | 'profile', selectedUserId = '') {
			if (!this.windowsList[windowId]) {
				console.log('хуета');
			}
			switch (this.windowsList[windowId].type) {
			case 'invite':
				const window = this.windowsList[windowId] as InviteWindow;
				this.windowsList[windowId] = {
					...window,
					selectedUserId,
					windowMode: mode,
				};
				break;
			default:
				console.log('опять хуета');
			}
		},
	},
});

export default useWindows;
