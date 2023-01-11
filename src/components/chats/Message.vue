<template>
    <div>
        <p>
            {{ message_text }}
        </p>
        <span>
            
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Message } from '@/types/message';


export default defineComponent({
    name: 'Message',
    props: {
        message: {
            type: Object as PropType<Message>
        }
    },
    setup({ message }) {
        return {
            message_text: message?.message_text
        }
    }
})

</script>