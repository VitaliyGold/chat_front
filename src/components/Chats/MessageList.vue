<template>
	<div
		class="messages-list"
		@scroll="scrollListHandler"
		ref="messagesListRef"
	>
		<p v-if="!messageList.size && !tempMessageList.size">
			Пока нет сообщений(
		</p>
		<template v-else>
			<message-component
				v-for="[messageId, message] of messageList"
				:message-text="message.messageText"
				:is-own-message="message.ownerId === userId"
				:owner-name="message.name"
				:message-id="messageId"
				:key="messageId"
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

import { MessageList } from '@/types/message';
import { ScrollEvent } from '@/types/events';
import emitter from '@/utils/emitter';

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
			type: Map as PropType<MessageList>,
			required: true,
		},
		tempMessageList: {
			type: Map as PropType<MessageList>,
			required: true,
		},
		userId: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const messagesListRef = ref<null | HTMLDivElement>(null);

		const scrollListHandler = (e: UIEvent) => {
			console.log(e);
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
