<template>
    <div class="action_display">
        <window-component/>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import Window from './Window.vue';

export default defineComponent({
    name: 'ActionPanel',
    components: {
        'window-component': Window
    },
    setup() {
        
    },
})
</script>

<style scoped>
    .action_display {
        background-color: red;
        height: 85vh;
        width: 95%;
    }
</style>
