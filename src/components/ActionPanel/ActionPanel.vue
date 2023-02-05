<template>
	<div class="action_panel">
		<action-panel-item-component
			v-for="window of windowsList"
			:key="window.windowId"
			:item-id="window.windowId"
			:item-name="window.name"
			:hide="window.hide"
			:item-type="window.type"
		/>
	</div>
</template>
<script lang="ts">
import useWindows from '@/store/windows';
import { defineComponent } from 'vue';
import ActionPanelItem from './ActionPanelItem.vue';

export default defineComponent({
	name: 'ActionPanel',
	components: {
		'action-panel-item-component': ActionPanelItem,
	},
	setup() {
		const windowsStore = useWindows();

		const { windowsList } = windowsStore;

		return {
			windowsList,
		};
	},
});
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
