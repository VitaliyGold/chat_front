import { ChatsList } from "@/types/chats";
import { defineStore } from "pinia";

const useProfile = defineStore('profile', {
    state: () => ({
        chats_list: {} as ChatsList
    }),
    actions: {
        addChat() {
            
        },
    },
    getters: {
        getChatsList(state) {
            return Object.entries(state.chats_list)
        },
    }
});

export default useProfile;