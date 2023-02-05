import { defineStore } from 'pinia';
import { Chat, ChatsList } from '@/types/chats';

const useChats = defineStore('chats', {
	state: () => ({
		chatsList: {} as ChatsList,
	}),
	actions: {
		addChat(chatInfo: Chat) {
			this.chatsList[chatInfo.chatId] = chatInfo;
		},
	},
});

export default useChats;
