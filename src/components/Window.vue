<template>
    <div class="window">
        <control-window-panel/>
        <chat-main-component/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChatMain from './chats/ChatMain.vue';
import ControlWindowPanel from '@/components/ControlWindowPanel.vue';

export default defineComponent({
    setup() {
        
    },
    components: {
        'chat-main-component': ChatMain,
        'control-window-panel': ControlWindowPanel
    }
})
</script>

<style scoped>
    .window {
        max-width: 1700px;
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 7px;
    }
</style>
