<template>
	<div
		class="messages-list"
		@scroll="scrollListHandler"
		ref="messagesListRef"
	>
		<p v-if="!messageList.length && !tempMessageList.size">
			Пока нет сообщений(
		</p>
		<template v-else>
			<message-component
				v-for="message of messageList"
				:message-text="message.messageText"
				:is-own-message="message.ownerId === userId"
				:owner-name="message.name"
				:message-id="message.messageId"
				:key="message.messageId"
				:status="message.status"
			/>
			<message-component
				v-for="[messageId, message] of tempMessageList"
				:message-text="message.messageText"
				:is-own-message="message.ownerId === userId"
				:owner-name="message.name"
				:message-id="messageId"
				:key="messageId"
				:status="message.status"
			/>
		</template>
	</div>
</template>

<script lang='ts'>
import {
	defineComponent, PropType, ref, onMounted, nextTick,
} from 'vue';

import { MessageList, TempMessageList } from '@/types/message';
import { ScrollEvent } from '@/types/events';
import emitter from '@/utils/emitter';
import MessagesController from '@/api/messages';
import useMessages from '@/store/messages';

import MessageComponent from '@/components/Message/MessageComponent.vue';
import LoaderComponent from '../UI/LoaderComponent.vue';

export default defineComponent({
	name: 'MessageList',
	components: {
		'message-component': MessageComponent,
		'loader-component': LoaderComponent,
	},
	props: {
		messageList: {
			type: Array as PropType<MessageList>,
			required: true,
		},
		tempMessageList: {
			type: Map as PropType<TempMessageList>,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
		chatId: {
			type: String,
			required: true
		}
	},
	setup(props) {
		const messagesListRef = ref<null | HTMLDivElement>(null);

		const messagesStore = useMessages();

		let page = 0;
		let messagesListEnd = false;
		let loadingMessages = false;

		const getDataWithScroll = async (event: ScrollEvent) => {
			//console.log(event.target.scrollHeight);
			
			const needRequest = event.target.scrollTop <= 500 && !loadingMessages && !messagesListEnd;

			if (needRequest) {
				console.log('запрос');
				page += 1;
				loadingMessages = true;
				const messages = await MessagesController.getMessages(props.chatId, page);
				if (!messages.length) {
					messagesListEnd = true;
					return;
				}

				messagesStore.addMessages(props.chatId, messages);
			}
		}

		const scrollListHandler = (e: UIEvent) => {
			const event = e as ScrollEvent;
			getDataWithScroll(event);
			
			
		};

		const scrollToBottom = () => {
			nextTick(() => {
				if (!messagesListRef.value) {
					return;
				}
				const containerHeight = messagesListRef.value.scrollHeight;
				messagesListRef.value.scrollBy({ top: containerHeight });
			});
		};

		emitter.on('sendMessage', () => {
			scrollToBottom();
		});

		emitter.on('getMessage', () => {
			scrollToBottom();
		});

		onMounted(() => {
			console.log(1)
			if (!messagesListRef.value) {
				return;
			}

			scrollToBottom();
		});

		return {
			messagesListRef,
			scrollListHandler,
		};
	},
});

</script>

<style scoped lang="less">
.messages-wrapper {
	height: calc(100vh - 315px);
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	width: 100%;
}
.messages-list {
	width: 100%;
	height: 100%;
	overflow-y: auto;
	overflow-x: hidden;
}

</style>
