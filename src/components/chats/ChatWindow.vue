<template>
    <div class="chat_window">
        <message-list-component/>
        <message-input-component/>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { ChatWindow } from '@/types/window';
import useProfile from '@/store/profile';

import MessageInput from './MessageInput.vue';
import MessageList from './MessageList.vue';

export default defineComponent({
    props: {
        window: {
            type: Object as PropType<ChatWindow>,
            required: true
        }
    },
    components: {
        'message-input-component': MessageInput,
        'message-list-component': MessageList
    }

})
</script>
<style lang='less' scoped>
.chat_window {
    padding: 5px;
}

</style>
