<template>
	<div class="window">
		<window-header
			:window-id="window.windowId"
			:window-name="window.name"
		/>
		<window-body>
			<settings-window
				v-if="window.type === 'settings'"
			/>
			<invite-window
				v-else-if="window.type === 'invite'"
			/>
			<chat-window
				:window="window"
				v-else-if="window.type === 'chat'"
			/>
		</window-body>
	</div>
</template>

<script lang="ts" setup>
import { PropType, defineProps, toRef } from 'vue';
import WindowHeader from '@/components/Window/WindowHeader.vue';
import WindowBody from '@/components/Window/WindowBody.vue';
import { WindowObject } from '@/types/window';
import ChatWindow from '@/components/Chats/ChatWindow.vue';
import SettingsWindow from '@/components/Settings/SettingsWindow.vue';
import InviteWindow from '@/components/Invite/InviteWindow.vue';

const props = defineProps({
	window: {
		required: true,
		type: Object as PropType<WindowObject>,
	},
});

const window = toRef(props, 'window');

</script>

<style scoped lang="less">
    .window {
        max-width: 1700px;
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 7px;
        overflow: auto;
    }

    .window + .window {
        margin-left: 10px;
    }
</style>
