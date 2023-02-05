<template>
	<div
		class="message"
		:class="isOwnMessage ? 'own-message' : ''"
	>
		<div class="header">
			<p>
				{{ ownerName }}
			</p>
			<message-status-component
				:status="status"
			/>
		</div>

		<p>
			{{ messageText }}
		</p>
	</div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

import { MessageStatus } from '@/types/message';
import MessageStatusComponent from './MessageStatus.vue';

export default defineComponent({
	name: 'MessageComponent',
	props: {
		messageText: {
			required: true,
			type: String,
		},
		isOwnMessage: {
			required: true,
			type: Boolean,
		},
		ownerName: {
			required: true,
			type: String,
		},
		status: {
			required: true,
			type: String as PropType<MessageStatus>,
		},
	},
	components: {
		'message-status-component': MessageStatusComponent,
	},
});

</script>

<style scoped lang="less">
.message {
	margin: 10px 40px 10px 0;
	border-radius: 5px;
	padding: 3px 8px 8px 8px;
	border: 1px solid #7c80d2;
	&.own-message {
	background-color: #7c80d2;
	margin: 10px 5px 10px 40px;
	color: white;
		.header {
			border-color: white;
		}
	}
	.header {
		display: flex;
		margin-bottom: 5px;
		padding-bottom: 3px;
		justify-content: space-between;
		border-bottom: 1px solid black;
	}
}
</style>
