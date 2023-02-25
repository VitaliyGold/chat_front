<template>
	<div class="message-input">
		<message-text-area
			:message-text="messageValue"
			@change-value="changeMessageValue"
			@submit="submitInput"
		/>
		<button-container>
			<ui-button
				size="medium"
				type="submit"
				add-class="mt-1"
				@click="submitInput"
			>
				Отправить
			</ui-button>
		</button-container>
	</div>
</template>

<script setup lang='ts'>
import { defineProps, ref, toRefs } from 'vue';
import { v4 as uuidv4 } from 'uuid';

import emitter from '@/utils/emitter';
import { getUserId } from '@/utils/jwt';
import ChatController from '@/api/chats';
import MessageController from '@/api/messages';
import useMessages from '@/store/messages';
import useOwnProfile from '@/store/ownProfile';
import useWindows from '@/store/windows';
import useChats from '@/store/chats';
import { CreateNewMessage, MessageDto } from '@/types/message';
import { CreateChatResponse } from '@/types/chats';

import UiButton from '@/components/UI/UiButton.vue';
import { ChatWindow } from '@/types/window';
import ButtonContainer from '@/components/UI/ButtonContainer.vue';
import MessageTextArea from './MessageTextArea.vue';

const props = defineProps({
	chatId: {
		required: true,
		type: String,
	},
	isNewChat: {
		required: true,
		type: Boolean,
	},
});

const {
	chatId,
	isNewChat,
} = toRefs(props);

const userId = getUserId() ?? '';

const messageValue = ref('');

const messageStore = useMessages();

const ownProfileStore = useOwnProfile();

const windowStore = useWindows();

const chatsStore = useChats();

const currentChat = chatsStore.chatsList[chatId.value];

const changeMessageValue = (messageText: string) => {
	messageValue.value = messageText;
};

const addTempMessage = (): string => {
	const tempId = uuidv4();

	const tempMessage: MessageDto = {
		messageId: tempId,
		status: 'loading',
		chatId: chatId.value,
		messageText: messageValue.value,
		ownerId: userId,
		createdAt: new Date().toLocaleString(),
		name: ownProfileStore.ownProfile.name,
	};

	if (!messageStore.tempChatsMessagesList.get(chatId.value)) {
		messageStore.tempChatsMessagesList.set(
			chatId.value,
			new Map([[tempId, tempMessage]]),
		);
	} else {
		messageStore.tempChatsMessagesList.get(chatId.value)?.set(tempId, tempMessage);
	}

	return tempId;
};

const sendMessage = async () => {
	const tempId = addTempMessage();

	const message: CreateNewMessage = {
		messageType: 1,
		messageText: messageValue.value,
		chatId: props.chatId,
	};

	emitter.emit('sendMessage');

	const createdMessages = await MessageController.sendMessage(message);

	messageStore.transferMessageFromTemp(
		tempId,
		createdMessages.messageId,
		chatId.value,
		createdMessages.chatId,
	);
};

const setWindowInfo = (windowId: string, chatId: string, chatName: string) => {
	const oldWindow = windowStore.windowsList[windowId] as ChatWindow;

	windowStore.$patch((state) => {
		state.windowsList[windowId] = {
			...oldWindow,
			isNewChat: false,
			chatId,
			name: chatName,
		};
	});
};

const setChat = (chatInfo: CreateChatResponse) => {
	chatsStore.chatsList[chatInfo.chatId] = {
		chatId: chatInfo.chatId,
		ownerId: chatInfo.ownerId,
		ownerName: chatInfo.ownerName,
		chatType: chatInfo.chatType,
		members: chatInfo.members,
		endMessageList: true,
	};
};

const createChat = async () => {
	const tempId = addTempMessage();

	const chatMembers = [
		...props.members.map((member) => member.userId),
		ownProfileStore.ownProfile.userId,
	];

	const chatData = {
		members: chatMembers,
		chatType: 1,
		startMessage: messageValue.value,
	};

	const chat = await ChatController.createChat(chatData);

	setWindowInfo(props.tempChatId, chat.chatId, chat.members[0].name);
	setChat(chat);

	windowStore.setChatId(props.tempChatId, chat.chatId);

	messageStore.transferMessageFromTemp(
		tempId,
		chat.firstMessage.messageId,
		props.tempChatId,
		chat.chatId,
	);
};

const submitInput = () => {
	if (!isNewChat) {
		createChat();
	} else {
		sendMessage();
	}
	changeMessageValue('');
};

</script>

<style scoped lang="less">

.message-input {
    .editable-wrapper {
        height: 80px;
        width: 100%;
        overflow-y: auto;
        border: 1px solid black;
        padding: 10px;
        position: relative;
    }
}

</style>
