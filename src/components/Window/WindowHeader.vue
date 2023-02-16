<template>
	<div class="window-header">
		<p class="window-name">
			{{ windowName }}
		</p>
		<ui-button-container
			:styles="{ gap: '8px' }"
		>
			<ui-icon-button
				icon-type="arrowCollapse"
				@click="hideWindow"
			/>
			<ui-icon-button
				icon-type="close"
				@click="closeWindow"
			/>
		</ui-button-container>
	</div>
</template>

<script lang="ts" setup>
import { defineProps, toRefs } from 'vue';

import useWindows from '@/store/windows';

import UiButtonContainer from '@/components/UI/ButtonContainer.vue';
import UiIconButton from '@/components/UI/UiIconButton.vue';

const props = defineProps({
	windowId: {
		type: String,
		required: true,
	},
	windowName: {
		type: String,
		required: true,
	},
});

const {
	windowId,
	windowName,
} = toRefs(props);

const store = useWindows();

const closeWindow = () => {
	store.closeWindow(windowId.value);
};
const hideWindow = () => {
	store.hideWindow(windowId.value);
};

</script>

<style scoped lang="less">

.window-header {
    padding: 5px 10px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gray;
    align-items: center;
}

.window-name {
	font-size: 16px;
	font-weight: 600;
}

</style>
