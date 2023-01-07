<template>
    <div class="chat_window">
        {{ window }}
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { ChatWindow } from '@/types/window';

export default defineComponent({
    props: {
        window: {
            type: Object as PropType<ChatWindow>
        }
    },
    setup() {
        
    },
})
</script>
<style lang="less" scoped>

</style>
