import { defineStore } from 'pinia';
import { ChatsMessageList, MessageDto, MessageList, TempMessageList } from '@/types/message';

const useMessages = defineStore('messages', {
	state: () => ({
		chatsMessageList: new Map() as ChatsMessageList<MessageList>,
		tempChatsMessagesList: new Map() as ChatsMessageList<TempMessageList>,
	}),
	getters: {
		getMessageListForId(state): (id: string) => MessageList {
			return (id: string) => {
				const messageList = state.chatsMessageList.get(id);
				if (messageList) {
					return messageList;
				}
				return [];
			};
		},
		getTempMessageListForId(state): (id: string) => TempMessageList {
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
		addMessages(chatId: string, messagesList: MessageList) {
			const oldMessageList = this.chatsMessageList.get(chatId);
			console.log(oldMessageList)
			if (oldMessageList) {
				this.chatsMessageList.set(chatId, [ ...messagesList, ... oldMessageList ]);
			} else {
				this.chatsMessageList.set(chatId, messagesList);
			}
		},
		addMessageToChat(chatId: string, messageId: string, message: MessageDto) {
			const chat = this.chatsMessageList.get(chatId);
			if (chat) {
				chat.push(message);
			}
		},
		transferMessageFromTemp(
			tempMessageId: string,
			messageId: string,
			tempChatId: string,
			chatId: string,
		) {
			const messageList = this.tempChatsMessagesList.get(tempChatId);
			if (!messageList) {
				return;
			}
			const message = messageList.get(tempMessageId);
			if (!message) {
				return;
			}
			const copyMessage = { ...message };
			copyMessage.status = 'delivered';
			copyMessage.messageId = messageId;
			if (!this.chatsMessageList.get(chatId)) {
				this.chatsMessageList.set(chatId, [copyMessage]);
			} else {
				this.chatsMessageList.get(chatId)?.push(copyMessage);
			}
			this.tempChatsMessagesList.get(tempChatId)?.delete(tempMessageId);

			console.log(this);
		},
	},
});

export default useMessages;
