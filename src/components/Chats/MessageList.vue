<template>
	<div class="message-list">
		<message-component
			v-for="[messageId, message] of messageList"
			:message-text="message.messageText"
			:is-own-message="message.ownerId === userId"
			:owner-name="message.ownerName"
			:message-id="messageId"
			:key="messageId"
			:status="message.status"
		/>
		<message-component
			v-for="[messageId, message] of tempMessageList"
			:message-text="message.messageText"
			:is-own-message="message.ownerId === userId"
			:owner-name="message.ownerName"
			:message-id="messageId"
			:key="messageId"
			:status="message.status"
		/>
	</div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';

import { MessageList } from '@/types/message';

import Message from '@/components/Message/MessageComponent.vue';

export default defineComponent({
	name: 'MessageList',
	components: {
		'message-component': Message,
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
});

</script>

<style scoped lang="less">

.message-list {
    height: calc(100vh - 300px);
}

</style>
