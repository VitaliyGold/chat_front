<template>
    <div class="chat_window">
        <message-list-component
            v-if="messageList"
            :user_id="userId"
            :messageList="messageList"
        />
        <p v-else>
            ошибка
        </p>
        <message-input-component
            v-if="window.members"
            :members="window.members"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

import { ChatWindow } from '@/types/window';
import { MessageList } from '@/types/message';
import useProfile from '@/store/profile';
import useChats from '@/store/chats';
import useMessages from '@/store/messages';

import MessageInputComponent from './MessageInput.vue';
import MessageListComponent from './MessageList.vue';


export default defineComponent({
    props: {
        window: {
            required: true,
            type: Object as PropType<ChatWindow>
        }
    },
    setup({ window }) {
        const profileStore = useProfile();
        const messageStore = useMessages();

        const userId = profileStore.user_profile.user_id;

        const chatId = computed(() => window.is_new_chat ? window.window_id : window.chat_id);
        const messageList = computed(
            () => { 
                return window.is_new_chat ? 
                    messageStore.getTempMessageListForId(chatId.value) 
                : 
                    messageStore.getMessageListForId(chatId.value);
            });
        console.log(messageList)
        return {
            window,
            userId,
            messageList
        }
    },
    components: {
        'message-input-component': MessageInputComponent,
        'message-list-component': MessageListComponent
    }

})
</script>
<style lang='less' scoped>
.chat_window {
    padding: 5px;
}

</style>
