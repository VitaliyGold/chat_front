<template>
  <div class="main_display">
    <action-display-component />
    <action-panel-component />
    <menu-btn-component />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import ActionDisplay from '@/components/ActionDisplay.vue';
import ActionPanel from '@/components/ActionPanel/ActionPanel.vue';
import MenuBtn from '@/components/Menu/MenuBtn.vue';

export default defineComponent({
	components: {
		'action-display-component': ActionDisplay,
		'action-panel-component': ActionPanel,
		'menu-btn-component': MenuBtn,
	},
});
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
