<template>
	<div>
		<ui-button
			size="small"
			type="button"
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

import UiButton from '@/components/UI/UiButton.vue';

export default defineComponent({
	name: 'UserActions',
	components: {
		'ui-button': UiButton,
	},
	props: {
		isProfile: {
			type: Boolean,
			required: false,
			default: false,
		},
		haveChat: {
			type: Boolean,
			required: true,
		},
		chatId: {
			type: null as unknown as PropType<string | null>,
			required: true,
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

		const memberNames = [{ userId: props.userId, name: props.userName }];

		const createChat = (): void => {
			const temporalWindowId = uuidv4();

			windowStore.addWindow('chat', {
				isNewChat: true,
				chatId: temporalWindowId,
				memberNames,
			});
		};

		const openChat = (): void => {
			if (!props.chatId) {
				return;
			}

			windowStore.addWindow('chat', {
				chatId: props.chatId,
				isNewChat: false,
				memberNames,
			});
		};

		return {
			createChat,
			openChat,
		};
	},
});

</script>

<style scoped lang="less">

.user-actions {
	position: absolute;
	right: 8px;
}

</style>
