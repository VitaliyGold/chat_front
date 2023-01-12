import { defineStore } from "pinia";
import { WindowsList, WindowsTypes, ChatWindowConfig } from "@/types/window";
import { getChatWindow, getInviteWindow, getSettingsWindow } from "@/utils/helpers";

const useWindows = defineStore('windows', {
    state: () => ({
        windows_list: {} as WindowsList
    }),
    actions: {
        addWindow(type: WindowsTypes, config: ChatWindowConfig | null = null) {
            if (this.windows_list[type]) {
                return;
            }
            switch(type) {
                case 'settings':
                    this.windows_list[type] = getSettingsWindow();
                    break;
                case 'invite':
                    this.windows_list[type] = getInviteWindow();
                    break;
                case 'chat':
                    console.log(config);
                    if (!config ) {
                        break;
                    }

                    const chat_id = config.user_id ? config.user_id : config.chat_id;
                    if (!chat_id) {
                        break;
                    }

                    this.windows_list[chat_id] = getChatWindow(config);
                    break;
            }
        },
        closeWindow(window_id: keyof WindowsList) {
            delete this.windows_list[window_id];

        },
        hideWindow(window_id: keyof WindowsList) {
            this.windows_list[window_id].hide = false; 
        },
        openWindow(window_id: keyof WindowsList) {
            this.windows_list[window_id].hide = true; 
        }
    },
    getters: {
        getWindowsList(state) {
            return Object.values(state.windows_list);
        }
    }
})

export default useWindows;