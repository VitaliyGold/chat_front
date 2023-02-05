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
	defineComponent, computed, PropType,
	ref, onMounted,
} from 'vue';

import { ChatWindow } from '@/types/window';
import { ChatDto } from '@/types/chats';
import { MessageDto } from '@/types/message';
import useProfile from '@/store/profile';
import useMessages from '@/store/messages';
import useChats from '@/store/chats';
import useWindows from '@/store/windows';
import MessagesController from '@/api/messages';
import ChatController from '@/api/chats';

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
		const chatsStore = useChats();
		const windowStore = useWindows();

		const loadingChat = ref(false);

		const { userId } = profileStore.userProfile;

		const messageList = computed(
			() => messagesStore.getMessageListForId(props.window.chatId),
		);
		const tempMessageList = computed(
			() => messagesStore.getTempMessageListForId(props.window.windowId),
		);

		onMounted(async () => {
			const needRequest = !chatsStore.chatsList[props.window.chatId]?.endMessageList;
			console.log(props.window.isNewChat);

			if (!needRequest || props.window.isNewChat) {
				const chatName = props.window.isNewChat
					? props.window.members[0].name
					:					chatsStore.chatsList[props.window.chatId].members[0].name;

				windowStore.$patch((state) => {
					state.windowsList[props.window.windowId].name = chatName;
				});

				return;
			}

			loadingChat.value = true;

			const promiseList = [
				ChatController.getChat(props.window.chatId),
				MessagesController.getMessages(props.window.chatId),
			];
			// подумать как корректно типизировать
			const data = await Promise.all(promiseList);
			const chat = data[0] as ChatDto;

			const messages = data[1] as MessageDto[];

			messagesStore.addMessages(props.window.chatId, messages);

			const haveMessage = messages.length < 50;

			chatsStore.addChat({ ...chat, endMessageList: haveMessage });

			// поменять все на объекты
			if (windowStore.windowsList[props.window.windowId]) {
				windowStore.$patch((state) => {
					state.windowsList[props.window.windowId].name = chat.members[0].name;
				});
			}

			loadingChat.value = false;
		});

		return {
			members: props.window.members,
			windowId: props.window.windowId,
			userId,
			loadingChat,
			chatId: props.window.chatId,
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
