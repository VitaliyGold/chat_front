<template>
	<Transition>
		<div
			class="windowLayout"
			:class="{
				displayHelpLayout
			}"
		>
			<div
				class="mainLayout"
				v-if="displayMainLayout"
			>
				<slot name="mainLayout" />
			</div>
			<div
				class="helpLayout"
				v-if="displayHelpLayout"
			>
				<ui-icon-button
					icon-type="arrowLeft"
					@click="hideHelpWindow"
					:btn-type="'btn-back'"
				/>
				<slot name="helpLayout" />
			</div>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { defineProps, toRef } from 'vue';

import useWindows from '@/store/windows';

import UiIconButton from '@/components/UI/UiIconButton.vue';

const props = defineProps({
	windowId: {
		type: String,
		required: true,
	},
});

const windowId = toRef(props, 'windowId');

const windowsStore = useWindows();

const currentWindow = windowsStore.windowsList[windowId.value];

const isSingleWindow = windowsStore.getCountWindows === 1;

const displayMainLayout = isSingleWindow
    && currentWindow.showHelpWindow;

const displayHelpLayout = currentWindow.showHelpWindow;

const hideHelpWindow = () => {
	currentWindow.showHelpWindow = false;
};

</script>

<style scoped lang="less">

.windowLayout {
    width: 100%;
    position: relative;
    display: flex;
    .mainLayout {

    }
    .mainLayout {

    }
}

</style>
