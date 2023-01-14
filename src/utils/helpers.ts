import { 
    ChatWindow, 
    InviteWindow, 
    SettingsWindow, 
    ChatWindowConfig 
} from "@/types/window"

export function getSettingsWindow(): SettingsWindow {
    return {
        hide: true,
        type: 'settings',
        window_id: 'settings',
        name: 'Настройки'
    }
}

export function getInviteWindow(): InviteWindow {
    return {
        hide: true,
        type: 'invite',
        window_id: 'invite',
        name: 'Создать чат'
    }
}

export function getChatWindow({ chat_id = '', is_new_chat, members } : ChatWindowConfig): ChatWindow {
    return {
        hide: true,
        type: 'chat',
        // при создании присваивается временный id
        window_id: chat_id,
        chat_id: is_new_chat ? '' : chat_id,
        is_new_chat,
        members,
        name: 'Чат'
    }
}

export function debounce(fn: any, delay: number) {
    let timeoutID: ReturnType<typeof setTimeout>;
    return function(...args: any) {
        if(timeoutID)
          clearTimeout(timeoutID);
        timeoutID = setTimeout(() => {
          fn(...args)
        }, delay);
    }
 }