<template>
	<div class="message-input">
		<message-text-area-component
			v-model="messageValue"
			@change-value="changeMessageValue"
		/>
		<div>
			<button-component
				:btn-text="'Отправить'"
				:type="'medium'"
				@click="sendMessage"
			/>
		</div>
	</div>
</template>

<script lang='ts'>
import { defineComponent, ref, PropType } from 'vue';

import chatController from '@/api/chats';
import useMessages from '@/store/messages';
import useProfile from '@/store/profile';
import useWindows from '@/store/windows';

import { MessageDto } from '@/types/message';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/UI/ButtonComponent.vue';
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
			type: Array as PropType<string[]>,
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

			const chatData = {
				members: props.members,
				chatType: 1,
				startMessage: messageValue.value,
			};

			const chat = await chatController.createChat(chatData);

			windowStore.setChatId(props.tempChatId, chat.chatId);

			messageStore.transferMessageFromTemp(
				tempId,
				chat.firstMessage.messageId,
				props.tempChatId,
				chat.chatId,
			);
		};

		return {
			messageValue,
			changeMessageValue,
			sendMessage,
		};
	},
	components: {
		'button-component': Button,
		'message-text-area-component': MessageTextArea,
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
