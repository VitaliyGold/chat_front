<template>
	<div class="action_display">
		<template
			v-for="window in windowsList"
			:key="window.windowId"
		>
			<window-component
				:window="window"
				v-show="window.hide"
			/>
		</template>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

import useWindows from '@/store/windows';
import WindowComponent from '@/components/Window/WindowComponent.vue';

export default defineComponent({
	name: 'ActionPanel',
	components: {
		'window-component': WindowComponent,
	},
	setup() {
		const store = useWindows();

		const { windowsList } = store;

		return {
			windowsList,
		};
	},
});
</script>

<style scoped>
    .action_display {
        height: 85vh;
        width: 95%;
        padding: 10px;
        display: flex;
    }
</style>
