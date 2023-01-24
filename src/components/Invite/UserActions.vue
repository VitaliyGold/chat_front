<template>
	<div
		class="user-actions"
	>
		<button
			class="btn"
			v-if="haveChat"
			@click="openChat"
		>
			В чат
		</button>
		<button
			class="btn"
			@click="createChat"
			v-else
		>
			Создать чат
		</button>
	</div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';

import useWindows from '@/store/windows';
import useProfile from '@/store/profile';
import { ChatID } from '@/types/chats';

import { v4 as uuidv4 } from 'uuid';

export default defineComponent({
	name: 'UserActions',
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
		userId: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const windowStore = useWindows();

		const profileStore = useProfile();

		const currentUserId = profileStore.userProfile.userId;

		const members = [props.userId, currentUserId];

		const createChat = (): void => {
			const temporalWindowId = uuidv4();

			windowStore.addWindow('chat', { isNewChat: true, chatId: temporalWindowId, members });
		};

		const openChat = (): void => {
			if (!props.chatId) {
				return;
			}

			windowStore.addWindow('chat', { chatId: props.chatId, isNewChat: false, members });
		};

		return {
			createChat,
			openChat,
		};
	},
});

</script>
