<template>
    <div class="main_display">
        <action-display-component/>
        <action-panel-component/>
        <settings-component/>
    </div>
    
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import ActionDisplay from './ActionDisplay.vue';
import ActionPanel from './ActionPanel/ActionPanel.vue';
import Settings from './menu/MenuBtn.vue';

export default defineComponent({
    components: {
        'action-display-component': ActionDisplay,
        'action-panel-component': ActionPanel,
        'settings-component': Settings
    },
    setup() {
        
    },
})
</script>

<style scoped>
    .main_display {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
