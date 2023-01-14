import { defineStore } from "pinia";

import useMessages from "./messages";

import { WindowsListType, WindowsTypes, ChatWindowConfig } from "@/types/window";
import { getChatWindow, getInviteWindow, getSettingsWindow } from "@/utils/helpers";


const useWindows = defineStore('windows', {
    state: () => ({
        windowsList: {} as WindowsListType
    }),
    actions: {
        addWindow(type: WindowsTypes, config: ChatWindowConfig | null = null) {
            if (this.windowsList[type]) {
                return;
            }
            switch(type) {
                case 'settings':
                    this.windowsList[type] = getSettingsWindow();
                    break;
                case 'invite':
                    this.windowsList[type] = getInviteWindow();
                    break;
                case 'chat':
                    if (!config ) {
                        break;
                    }
                    const messageStore = useMessages();
                    this.windowsList[config.chat_id] = getChatWindow(config);
                    messageStore.addTempChatMessageList(config.chat_id);

                    break;
            }
        },
        closeWindow(window_id: keyof WindowsListType) {
            delete this.windowsList[window_id];

        },
        hideWindow(window_id: keyof WindowsListType) {
            this.windowsList[window_id].hide = false; 
        },
        openWindow(window_id: keyof WindowsListType) {
            this.windowsList[window_id].hide = true; 
        }
    },
})

export default useWindows;