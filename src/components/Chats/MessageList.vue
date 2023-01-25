<template>
	<div class="message-list">
		<template
			v-if="loading"
		>
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
		<loader-component
			v-else
		/>
	</div>
</template>

<script lang='ts'>
import { defineComponent, PropType } from 'vue';

import { MessageList } from '@/types/message';

import Message from '@/components/Message/MessageComponent.vue';
import LoaderComponent from '../UI/LoaderComponent.vue';

export default defineComponent({
	name: 'MessageList',
	components: {
		'message-component': Message,
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
		loading: {
			type: Boolean,
			required: true,
		},
	},
});

</script>

<style scoped lang="less">

.message-list {
    height: calc(100vh - 315px);
	overflow: auto;
}

</style>
