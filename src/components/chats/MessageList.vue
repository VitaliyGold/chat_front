<template>
    <div class="message-list">
        <message-component
            v-for="[message_id, message] of messageList"
            :messageText="message.messageText"
            :isOwnMessage="message.ownerId === user_id"
            :ownerName="message.ownerName"
            :status="message.status"
        />
    </div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';

import { MessageList } from '@/types/message';

import Message from '../Message/Message.vue';

export default defineComponent({
    name: 'MessageList',
    components: {
        'message-component': Message
    },
    props: {
        messageList: {
            type: Map as PropType<MessageList>,
            required: true
        },
        user_id: {
            type: String,
            required: true
        }
    }
})

</script>

<style scoped lang="less">

.message-list {
    height: calc(100vh - 300px);
}

</style>