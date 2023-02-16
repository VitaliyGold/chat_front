<template>
	<div class="message-input">
		<message-text-area-component
			:message-text="messageValue"
			@change-value="changeMessageValue"
			@submit="submitInput"
		/>
		<button-container>
			<ui-button
				size="medium"
				type="submit"
			>
				Отправить
			</ui-button>
		</button-container>
	</div>
</template>

<script lang='ts'>
import { defineComponent, ref, PropType } from 'vue';
import { v4 as uuidv4 } from 'uuid';

import emitter from '@/utils/emitter';
import ChatController from '@/api/chats';
import MessageController from '@/api/messages';
import useMessages from '@/store/messages';
import useProfile from '@/store/profile';
import useWindows from '@/store/windows';
import useChats from '@/store/chats';
import { CreateNewMessage, MessageDto } from '@/types/message';
import { CreateChatResponse, ChatMember } from '@/types/chats';

import UiButton from '@/components/UI/UiButton.vue';
import { ChatWindow } from '@/types/window';
import ButtonContainer from '../UI/ButtonContainer.vue';
import MessageTextArea from './MessageTextArea.vue';

export default defineComponent({
	name: 'MessageInput',
	directives: {
		focus: {
			mounted(el) {
				el.focus();
			},
		},
	},
	props: {
		members: {
			required: true,
			type: Array as PropType<ChatMember[]>,
		},
		tempChatId: {
			required: true,
			type: String,
		},
		chatId: {
			required: true,
			type: String,
		},
	},
	setup(props) {
		const messageValue = ref('');

		const messageStore = useMessages();

		const profileStore = useProfile();

		const windowStore = useWindows();

		const chatsStore = useChats();

		const changeMessageValue = (messageText: string) => {
			messageValue.value = messageText;
		};

		const addTempMessage = (): string => {
			const tempId = uuidv4();

			const tempMessage: MessageDto = {
				messageId: tempId,
				status: 'loading',
				chatId: props.tempChatId,
				messageText: messageValue.value,
				ownerId: profileStore.userProfile.userId,
				createdAt: new Date().toLocaleString(),
				name: profileStore.userProfile.name,
			};

			if (!messageStore.tempChatsMessagesList.get(props.tempChatId)) {
				messageStore.tempChatsMessagesList.set(
					props.tempChatId,
					new Map([[tempId, tempMessage]]),
				);
			} else {
				messageStore.tempChatsMessagesList.get(props.tempChatId)?.set(tempId, tempMessage);
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
				props.tempChatId,
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

			const chatMembers = [...props.members.map((member) => member.userId), profileStore.userProfile.userId];

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
			if (!props.chatId) {
				createChat();
			} else {
				sendMessage();
			}
			changeMessageValue('');
		};

		return {
			messageValue,
			changeMessageValue,
			submitInput,
		};
	},
	components: {
		'ui-button': UiButton,
		'message-text-area-component': MessageTextArea,
		'button-container': ButtonContainer,
	},

});

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
