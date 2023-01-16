<template>
    <div class='message-input'>
        <message-text-area-component
            v-model="messageValue"
            @changeValue="changeMessageValue"
        />
        <div class="">
            <button-component
                :btn-text="'Отправить'"
                :type="'medium'"
                @click="sendMessage"
            />
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, PropType } from 'vue';
const { v4: uuidv4 } = require('uuid');

import { createChat } from '@/api/chats';
import useMessages from '@/store/messages';
import useProfile from '@/store/profile';
import useWindows from '@/store/windows';

import Button from '@/components/ui-components/Button.vue';
import MessageTextArea from './MessageTextArea.vue';
import { MessageDto } from '@/types/message';
import { ChatWindow } from '@/types/window';

export default defineComponent({
    name: 'MessageInput',
    directives: {
        focus: {
            mounted(el) {
                el.focus()
            }
        }
    },
    props: {
        members: {
            required: true,
            type: Array as PropType<string[]>
        },
        tempChatId: {
            required: true,
            type: String
        },
        chatId: {
            required: true,
            type: String
        }
    },
    setup(props) {

        const messageValue = ref('');

        const messageStore = useMessages();

        const profileStore = useProfile();

        const windowStore = useWindows();

        const changeMessageValue = (messageText: string) => {
            messageValue.value = messageText;
        }

        const sendMessage = async () => {
            console.log(messageValue.value);
            const tempId = addTempMessage();
            
            const chatData = {
                members: props.members,
                chat_type: 1,
                start_message: messageValue.value
            }

            const chat = await createChat(chatData);

            windowStore.setChatId(props.tempChatId, chat.chatId);

            messageStore.transferMessageFromTemp(tempId, chat.firstMessage.messageId, props.tempChatId, chat.chatId);

        }

        const addTempMessage = (): string => {

            const tempId = uuidv4();

            const tempMessage: MessageDto = {
                messageId: tempId,
                status: 'loading',
                chatId: props.tempChatId,
                messageText: messageValue.value,
                ownerId: profileStore.user_profile.user_id,
                createdAt: new Date().toLocaleString(),
                ownerName: profileStore.user_profile.name
            }

            if (!messageStore.tempChatsMessagesList.get(props.tempChatId)) {
                messageStore.tempChatsMessagesList.set(props.tempChatId, new Map([[ tempId, tempMessage ]]));
            } else {
                messageStore.tempChatsMessagesList.get(props.tempChatId)?.set(tempId, tempMessage)
            }

            return tempId;
        }
 
        return {
            messageValue,
            changeMessageValue,
            sendMessage
        }
    },
    components: {
        'button-component': Button,
        'message-text-area-component': MessageTextArea
    }

})

</script>

<style scoped lang="less">


.message-input {
    .editable-wrapper {
        height: 80px;
        width: 100%;
        overflow-y: auto;
        border: 1px solid black;
        padding: 10px;
        position: relative;
    }
}

</style>