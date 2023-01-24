<template>
	<div class="chat_window">
		<message-list-component
			v-if="messageList || tempMessageList"
			:user-id="userId"
			:message-list="messageList"
			:temp-message-list="tempMessageList"
			:loading="loadingChat"
		/>
		<p v-else>
			ошибка
		</p>
		<message-input-component
			v-if="members"
			:temp-chat-id="windowId"
			:chat-id="chatId"
			:members="members"
		/>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, computed, PropType, toRefs,
	ref, onMounted,
} from 'vue';

import { ChatWindow } from '@/types/window';
import useProfile from '@/store/profile';
import useMessages from '@/store/messages';
import MessagesController from '@/api/messages';
import { MessagesEntries } from '@/types/message';

import MessageInputComponent from './MessageInput.vue';
import MessageListComponent from './MessageList.vue';

export default defineComponent({
	props: {
		window: {
			required: true,
			type: Object as PropType<ChatWindow>,
		},
	},
	setup(props) {
		const profileStore = useProfile();
		const messageStore = useMessages();

		const loadingChat = ref(true);

		const {
			window,
		} = toRefs(props);

		const { userId } = profileStore.userProfile;

		const messageList = computed(
			() => messageStore.getMessageListForId(window.value.chatId),
		);
		const tempMessageList = computed(
			() => messageStore.getTempMessageListForId(window.value.windowId),
		);

		onMounted(async () => {
			if (window.value.chatId) {
				const messages = await MessagesController.getMessages(window.value.chatId);

				const messagesEntries: MessagesEntries = messages.map(
					(message) => [message.messageId, message],
				);

				messageStore.addMessages(window.value.chatId, messagesEntries);
			} else {
				loadingChat.value = false;
			}
		});

		return {
			members: window.value.members,
			windowId: window.value.windowId,
			userId,
			loadingChat,
			chatId: window.value.chatId,
			messageList,
			tempMessageList,
		};
	},
	components: {
		'message-input-component': MessageInputComponent,
		'message-list-component': MessageListComponent,
	},

});
</script>
<style lang='less' scoped>
.chat_window {
    padding: 5px;
}

</style>
