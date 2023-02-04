<template>
	<div class="chat_window">
		<message-wrapper-component
			:user-id="userId"
			:message-list="messageList"
			:temp-message-list="tempMessageList"
			:chat-id="chatId"
			:loading="loadingChat"
		/>
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

import MessageInputComponent from './MessageInput.vue';
import MessagesWrapper from './MessagesWrapper.vue';

export default defineComponent({
	props: {
		window: {
			required: true,
			type: Object as PropType<ChatWindow>,
		},
	},
	setup(props) {
		const profileStore = useProfile();
		const messagesStore = useMessages();

		const loadingChat = ref(true);

		const {
			window,
		} = toRefs(props);

		const { userId } = profileStore.userProfile;

		const messageList = computed(
			() => messagesStore.getMessageListForId(window.value.chatId),
		);
		const tempMessageList = computed(
			() => messagesStore.getTempMessageListForId(window.value.windowId),
		);

		onMounted(async () => {
			if (window.value.chatId) {
				const messages = await MessagesController.getMessages(window.value.chatId);

				messagesStore.addMessages(window.value.chatId, messages);
			}
			loadingChat.value = false;
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
		'message-wrapper-component': MessagesWrapper,
	},

});
</script>
<style lang='less' scoped>
.chat_window {
    padding: 5px;
	display: flex;
	flex-direction: column;
	height: calc(100% - 40px);
	justify-content: space-between;
}

</style>
