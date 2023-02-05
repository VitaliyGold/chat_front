<template>
	<div class="messages-wrapper">
		<loader-component
			v-if="loading"
		/>
		<messages-list-component
			v-else
			:user-id="userId"
			:message-list="messageList"
			:temp-message-list="tempMessageList"
			:chat-id="chatId"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { MessageList, TempMessageList } from '@/types/message';

import LoaderComponent from '@/components/UI/LoaderComponent.vue';
import MessagesList from '@/components/Chats/MessageList.vue';

export default defineComponent({
	name: 'MessagesListContainer',
	components: {
		'loader-component': LoaderComponent,
		'messages-list-component': MessagesList,
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
		loading: {
			type: Boolean,
			required: true,
		},
		chatId: {
			type: String,
			required: true,
		},
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
</style>
