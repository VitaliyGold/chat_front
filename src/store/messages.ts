import { defineStore } from 'pinia';
import { ChatsMessageList } from '@/types/message';

const useMessages = defineStore('messages', {
	state: () => ({
		chatsMessageList: new Map() as ChatsMessageList,
		tempChatsMessagesList: new Map() as ChatsMessageList,
	}),
	getters: {
		getMessageListForId(state) {
			return (id: string) => {
				const messageList = state.chatsMessageList.get(id);
				if (messageList) {
					return messageList;
				}
				return new Map();
			};
		},
		getTempMessageListForId(state) {
			return (id: string) => {
				const messageList = state.tempChatsMessagesList.get(id);
				if (messageList) {
					return messageList;
				}
				return new Map();
			};
		},
	},
	actions: {
		addTempChatMessageList(chatId: string) {
			this.tempChatsMessagesList.set(chatId, new Map());
		},
		transferMessageFromTemp(
			tempMessageId: string,
			messageId: string,
			tempChatId: string,
			chatId: string,
		) {
			console.log(arguments);
			const messageList = this.tempChatsMessagesList.get(tempChatId);
			if (!messageList) {
				return;
			}
			const message = messageList.get(tempMessageId);
			if (!message) {
				return;
			}
			const copyMessage = { ...message };
			copyMessage.chatId = chatId;
			copyMessage.status = 'delivered';
			copyMessage.messageId = messageId;
			if (!this.chatsMessageList.get(chatId)) {
				this.chatsMessageList.set(chatId, new Map([[messageId, copyMessage]]));
			} else {
				this.chatsMessageList.get(chatId)?.set(messageId, copyMessage);
			}
			this.tempChatsMessagesList.get(tempChatId)?.delete(tempMessageId);

			console.log(this);
		},
	},
});

export default useMessages;
