<template>
    <div>
        <p>
            {{ owner_name }}
        </p>
        <p>
            {{ message_text }}
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
        message_text: {
            required: true,
            type: String
        },
        is_own_message: {
            required: true,
            type: Boolean
        },
        owner_name: {
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