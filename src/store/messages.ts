import { defineStore } from "pinia";
import { ChatsMessageList, MessageList } from "@/types/message";

const useMessages = defineStore('messages', {
    state: () => ({
        chatsMessageList: new Map() as ChatsMessageList,
        tempChatsMessagesList: new Map() as ChatsMessageList,
    }),
    getters: {
        getMessageListForId(state) {
            return (id: string) => {
                return state.chatsMessageList.get(id);
            }
        },
        getTempMessageListForId(state) {
            return (id: string) => {
                return state.tempChatsMessagesList.get(id);
            }
        },
    },
    actions: {
        addTempChatMessageList(chatId: string) {
            this.tempChatsMessagesList.set(chatId, new Map());
        }
    }
});

export default useMessages;