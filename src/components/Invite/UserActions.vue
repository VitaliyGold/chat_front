<template>
	<div
		class="user-actions"
	>
		<ui-button
			size="small"
			type="button"
			variant="outlined"
			class="btn"
			v-if="haveChat"
			@click="openChat"
		>
			В чат
		</ui-button>
		<ui-button
			class="btn"
			@click="createChat"
			size="small"
			type="button"
			variant="outlined"
			v-else
		>
			Создать чат
		</ui-button>
	</div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';
import { v4 as uuidv4 } from 'uuid';

import useWindows from '@/store/windows';
import { ChatID } from '@/types/chats';

import UiButton from '../UI/UiButton.vue';

export default defineComponent({
	name: 'UserActions',
	components: {
		'ui-button': UiButton,
	},
	props: {
		haveChat: {
			type: Boolean,
			required: true,
		},
		chatId: {
			type: String as PropType<ChatID>,
			required: false,
			default: null,
		},
		userName: {
			type: String,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const windowStore = useWindows();

		const members = [{ userId: props.userId, name: props.userName }];

		const createChat = (): void => {
			const temporalWindowId = uuidv4();

			windowStore.addWindow('chat', {
				isNewChat: true,
				chatId: temporalWindowId,
				members,
			});
		};

		const openChat = (): void => {
			if (!props.chatId) {
				return;
			}

			windowStore.addWindow('chat', {
				chatId: props.chatId,
				isNewChat: false,
				members,
			});
		};

		return {
			createChat,
			openChat,
		};
	},
});

</script>
