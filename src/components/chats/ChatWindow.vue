<template>
    <div class="chat_window">
        <message-list-component
            v-if="messageList || tempMessageList"
            :user_id="userId"
            :messageList="messageList"
            :tempMessageList="tempMessageList"
        />
        <p v-else>
            ошибка
        </p>
        <message-input-component
            v-if="window.members"
            :tempChatId="windowId"
            :chatId="chatId"
            :members="window.members"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, toRefs, onMounted } from 'vue';

import { ChatWindow } from '@/types/window';
import useProfile from '@/store/profile';
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
    setup(props) {
        const profileStore = useProfile();
        const messageStore = useMessages();

        const {
            window
        } = toRefs(props);

        const userId = profileStore.user_profile.user_id;
        
        const messageList = computed(() => messageStore.getMessageListForId(window.value.chat_id));
        const tempMessageList = computed(() => messageStore.getTempMessageListForId(window.value.window_id));

        onMounted(() => {
            
        })

        return {
            window,
            windowId: window.value.window_id,
            userId,
            chatId: window.value.chat_id,
            messageList: messageList,
            tempMessageList: tempMessageList
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
