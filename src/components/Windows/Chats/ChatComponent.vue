<template>
	<div class="chat_window">
		<message-wrapper
			:user-id="userId"
			:message-list="messageList"
			:temp-message-list="tempMessageList"
			:chat-id="window.chatId"
			:loading="loadingChat"
		/>
		<message-input
			:chat-id="window.chatId"
			:is-new-chat="window.isNewChat"
		/>
	</div>
</template>

<script setup lang="ts">
import {
	computed, PropType, defineComponent,
	ref, onMounted, reactive,
} from 'vue';

import { ChatWindow } from '@/types/window';
import { ChatDto } from '@/types/chats';
import { MessageDto } from '@/types/message';
import useMessages from '@/store/messages';
import useChats from '@/store/chats';
import MessagesController from '@/api/messages';
import ChatController from '@/api/chats';
import { getUserId } from '@/utils/jwt';

import MessageInput from './components/MessageInput.vue';
import MessagesWrapper from './components/MessagesWrapper.vue';

const props = defineComponent({
	window: {
		required: true,
		type: Object as PropType<ChatWindow>,
	},
});

const window = reactive(props.window);

const messagesStore = useMessages();
const chatsStore = useChats();

const loadingChat = ref(false);

const userId = getUserId() ?? '';

const messageList = computed(
	() => messagesStore.getMessageListForId(window.chatId),
);
const tempMessageList = computed(
	() => messagesStore.getTempMessageListForId(window.chatId),
);

onMounted(async () => {
	const needRequest = !chatsStore.chatsList[window.chatId]?.endMessageList;

	if (!needRequest || window.isNewChat) {
		return;
	}

	loadingChat.value = true;

	const promiseList = [
		ChatController.getChat(window.chatId),
		MessagesController.getMessages(window.chatId),
	];
	// подумать как корректно типизировать
	const data = await Promise.all(promiseList);
	const chat = data[0] as ChatDto;

	const messages = data[1] as MessageDto[];

	messagesStore.addMessages(window.chatId, messages);

	const haveMessage = messages.length < 50;

	chatsStore.addChat({ ...chat, endMessageList: haveMessage });

	loadingChat.value = false;
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
