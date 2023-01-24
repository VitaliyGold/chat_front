<template>
	<div class="chat_window">
		<message-list-component
			v-if="messageList || tempMessageList"
			:user-id="userId"
			:message-list="messageList"
			:temp-message-list="tempMessageList"
		/>
		<p v-else>
			ошибка
		</p>
		<message-input-component
			v-if="members"
			:temp-chat-id="windowId"
			:chat-id="chatId"
			:members="members"
		/>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, computed, PropType, toRefs,
} from 'vue';

import { ChatWindow } from '@/types/window';
import useProfile from '@/store/profile';
import useMessages from '@/store/messages';

import MessageInputComponent from './MessageInput.vue';
import MessageListComponent from './MessageList.vue';

export default defineComponent({
	props: {
		window: {
			required: true,
			type: Object as PropType<ChatWindow>,
		},
	},
	setup(props) {
		const profileStore = useProfile();
		const messageStore = useMessages();

		const {
			window,
		} = toRefs(props);

		const { userId } = profileStore.userProfile;

		const messageList = computed(
			() => messageStore.getMessageListForId(window.value.chatId),
		);
		const tempMessageList = computed(
			() => messageStore.getTempMessageListForId(window.value.windowId),
		);

		return {
			members: window.value.members,
			windowId: window.value.windowId,
			userId,
			chatId: window.value.chatId,
			messageList,
			tempMessageList,
		};
	},
	components: {
		'message-input-component': MessageInputComponent,
		'message-list-component': MessageListComponent,
	},

});
</script>
<style lang='less' scoped>
.chat_window {
    padding: 5px;
}

</style>
