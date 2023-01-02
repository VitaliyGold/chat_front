import { defineStore } from "pinia";
import { Window, WindowsList, WindowsTypes } from "@/types/window";
import { getChatWindow, getInviteWindow, getSettingsWindow } from "@/utils/helpers";

const useWindows = defineStore('windows', {
    state: () => ({
        windows_list: {} as WindowsList
    }),
    actions: {
        addWindow(type: WindowsTypes, chat_id: string | null = null) {
            console.log(type)
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
                    if (!chat_id) {
                        break;
                    }
                    this.windows_list[chat_id] = getChatWindow(chat_id);
                    break;
            }
            console.log(this.windows_list);
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