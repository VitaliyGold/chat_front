<template>
    <div 
        class='user-actions'
    >
        <button 
            class='btn'
            v-if='have_chat'
            @click='() => openChat(chat_id)'
        >
            В чат
        </button>
        <button 
            class='btn'
            @click='() => createChat(user_id)'
            v-else
        >
            Создать чат
        </button>
    </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
const { v4: uuidv4 } = require('uuid');

import useWindows from '@/store/windows';
import { Chat_ID } from '@/types/chats';

export default defineComponent({
    name: 'UserActions',
    props: {
        have_chat: {
            type: Boolean,
            required: true
        },
        chat_id: {
            type: String as PropType<Chat_ID>,
            required: false,
            default: null
        },
        user_id: {
            type: String,
            required: true
        },
    },
    setup() {

        const store = useWindows();

        const createChat = (user_id: string):void => {

            const temporal_window_id = uuidv4();

            store.addWindow('chat', { user_id, is_new_chat: true, chat_id: temporal_window_id });
        };

        const openChat = (chat_id: Chat_ID):void => {
            if (!chat_id) {
                return;
            }
            store.addWindow('chat', { chat_id, is_new_chat: false });
        }
    
        return {
            createChat,
            openChat
        }
    }
});

</script>