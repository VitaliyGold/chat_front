import { defineStore } from 'pinia';
import { ChatsMessageList, MessageDto, MessagesEntries } from '@/types/message';

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
		addMessages(chatId: string, messagesList: MessagesEntries) {
			if (!this.chatsMessageList.get(chatId)) {
				this.chatsMessageList.set(chatId, new Map(messagesList));
			} else {
				for (let i = 0; i < messagesList.length; i++) {
					this.chatsMessageList.get(chatId)?.set(messagesList[i][0], messagesList[i][1]);
				}
			}
		},
		addMessageToChat(chatId: string, messageId: string, message: MessageDto) {
			const chat = this.chatsMessageList.get(chatId);
			if (chat) {
				chat.set(messageId, message);
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
