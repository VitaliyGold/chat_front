<template>
    <div class="action_panel">
        <button class="btn chat_btn">
            Chat
        </button>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ActionPanel',
    setup() {
        
    },
})
</script>

<style scoped>
    .action_panel {
        height: 60px;
        max-width: 600px;
        margin-top: 20px;
        width: 100%;
        background-color: green;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>