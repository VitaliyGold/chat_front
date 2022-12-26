<template>
    <div class="main_display">
        <action-display-component/>
        <action-panel-component/>
    </div>
    
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import ActionDisplay from './ActionDisplay.vue';
import ActionPanel from './ActionPanel.vue';

export default defineComponent({
    components: {
        'action-display-component': ActionDisplay,
        'action-panel-component': ActionPanel
    },
    setup() {
        
    },
})
</script>

<style scoped>
    .main_display {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
