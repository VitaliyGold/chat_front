<template>
    <div class="window">
        <chat-main-component/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ChatMain from './chats/ChatMain.vue';

export default defineComponent({
    setup() {
        
    },
    components: {
        'chat-main-component': ChatMain
    }
})
</script>

<style scoped>
    .window {
        max-width: 1700px;
        width: 100%;
        background-color: white;
        border-radius: 7px;
    }
</style>
