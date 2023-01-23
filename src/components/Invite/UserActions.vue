<template>
  <div
    class="user-actions"
  >
    <button
      class="btn"
      v-if="have_chat"
      @click="() => openChat(chat_id)"
    >
      В чат
    </button>
    <button
      class="btn"
      @click="() => createChat(user_id)"
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
	setup() {
		const windowStore = useWindows();

		const profileStore = useProfile();

		const createChat = (userId: string): void => {
			const temporalWindowId = uuidv4();

			const currentUserId = profileStore.userProfile.userId;

			const members = [userId, currentUserId];

			windowStore.addWindow('chat', { isNewChat: true, chatId: temporalWindowId, members });
		};

		const openChat = (chatId):void => {
			if (!chatId) {
				return;
			}
			windowStore.addWindow('chat', { chatId, isNewChat: false });
		};

		return {
			createChat,
			openChat,
		};
	},
});

</script>
