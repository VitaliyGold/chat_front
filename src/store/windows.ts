import { defineStore } from "pinia";

import useMessages from "./messages";

import { WindowsListType, WindowsTypes, ChatWindowConfig, ChatWindow } from "@/types/window";
import { getChatWindow, getInviteWindow, getSettingsWindow } from "@/utils/helpers";


const useWindows = defineStore('windows', {
    state: () => ({
        windowsList: new Map() as WindowsListType
    }),
    actions: {
        addWindow(type: WindowsTypes, config: ChatWindowConfig | null = null) {
            if (this.windowsList.get(type)) {
                return;
            }
            switch(type) {
                case 'settings':
                    this.windowsList.set(type, getSettingsWindow());
                    break;
                case 'invite':
                    this.windowsList.set(type,  getInviteWindow());
                    break;
                case 'chat':
                    if (!config ) {
                        break;
                    }
                    const messageStore = useMessages();
                    this.windowsList.set(config.chat_id, getChatWindow(config));
                    messageStore.addTempChatMessageList(config.chat_id);

                    break;
            }
        },
        closeWindow(window_id: string) {
            this.windowsList.delete(window_id);

        },
        hideWindow(window_id: string) {
            const window = this.windowsList.get(window_id);
            if (window) {
                window.hide = false; 
            }
        },
        openWindow(window_id: string) {
            const window = this.windowsList.get(window_id);
            if (window) {
                window.hide = true; 
            }
        },
        setChatId(window_id: string, chatId: string) {
            if (this.windowsList.get(window_id) && this.windowsList.get(window_id)?.type === 'chat') {
                this.windowsList.set(window_id, {
                    ...this.windowsList.get(window_id), 
                    is_new_chat: false,
                    chat_id: chatId
                } as ChatWindow
                );
            }   
        },
    }
})

export default useWindows;