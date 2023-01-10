<template>
    <div class="chat_window">
        <message-input-component/>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { ChatWindow } from '@/types/window';
import useProfile from '@/store/profile';

import MessageInput from './MessageInput.vue';

export default defineComponent({
    props: {
        window: {
            type: Object as PropType<ChatWindow>,
            required: true
        }
    },
    components: {
        'message-input-component': MessageInput
    }

})
</script>
<style lang='less' scoped>

</style>
