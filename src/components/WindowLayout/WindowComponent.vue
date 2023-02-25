<template>
	<div class="window">
		<window-header
			:window-id="window.windowId"
			:window-name="window.name"
		/>
		<window-change-layout
			:window-id="window.windowId"
		>
			<template #mainLayout>
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
			</template>
			<template
				v-if="profileId"
				#helpLayout
			>
				<profile-component
					:profile-id="profileId"
				/>
			</template>
		</window-change-layout>
	</div>
</template>

<script lang="ts" setup>
import { PropType, defineProps, toRef } from 'vue';

import { WindowObject } from '@/types/window';

import ChatWindow from '@/components/Windows/Chats/ChatComponent.vue';
import SettingsWindow from '@/components/Windows/Settings/SettingsWindow.vue';
import InviteWindow from '@/components/Windows/Invite/InviteWindow.vue';
import ProfileComponent from '@/components/Windows/Profile/ProfileComponent.vue';
import WindowChangeLayout from './WindowChangeLayout.vue';
import WindowHeader from './WindowHeader.vue';

const props = defineProps({
	window: {
		required: true,
		type: Object as PropType<WindowObject>,
	},
});

const window = toRef(props, 'window');

const profileId = window.value.profileId ?? null;

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
