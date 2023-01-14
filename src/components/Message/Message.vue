<template>
    <div class="message">
        <p>
            {{ ownerName }}
        </p>
        <p>
            {{ messageText }}
        </p>
        <message-status-component
            :status="status"
        />
    </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

import MessageStatusComponent from './MessageStatus.vue';

import { MessageStatus } from '@/types/message';

export default defineComponent({
    name: 'Message',
    props: {
        messageText: {
            required: true,
            type: String
        },
        isOwnMessage: {
            required: true,
            type: Boolean
        },
        ownerName: {
            required: true,
            type: String
        },
        status: {
            required: true,
            type: String as PropType<MessageStatus>
        }
    },
    components: {
        'message-status-component': MessageStatusComponent
    },
    setup() {
        
    }
})

</script>

<style scoped lang="less">

</style>