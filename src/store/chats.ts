import { ChatDto, ChatsList } from "@/types/chats";
import { defineStore } from "pinia";

const useChats = defineStore('profile', {
    state: () => ({
        chatsList: new Map() as ChatsList
    }),
    actions: {
        addChat(chatInfo: ChatDto) {
            this.chatsList.set(chatInfo.chat_id, chatInfo)
        },
    },
    getters: {
        
    }
});

export default useChats;