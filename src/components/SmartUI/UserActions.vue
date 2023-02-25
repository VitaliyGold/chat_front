<template>
	<div>
		<ui-button
			size="small"
			type="button"
			class="btn"
			v-if="haveChat"
			@click="openChat"
		>
			В чат
		</ui-button>
		<ui-button
			class="btn"
			@click="createChat"
			size="small"
			type="button"
			variant="outlined"
			v-else
		>
			Создать чат
		</ui-button>
	</div>
</template>

<script setup lang='ts'>
import { PropType, defineProps, toRefs } from 'vue';
import { v4 as uuidv4 } from 'uuid';

import useWindows from '@/store/windows';
import useChats from '@/store/chats';
import useOwnProfile from '@/store/ownProfile';
import { getChatModel } from '@/utils/createChat';
import { getUserId } from '@/utils/jwt';

import UiButton from '@/components/UI/UiButton.vue';

const props = defineProps({
	isProfile: {
		type: Boolean,
		required: false,
		default: false,
	},
	haveChat: {
		type: Boolean,
		required: true,
	},
	chatId: {
		type: null as unknown as PropType<string | null>,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
});

const {
	isProfile,
	haveChat,
	chatId,
	userName,
	userId,
} = toRefs(props);

const windowStore = useWindows();
const chatStore = useChats();
const ownProfileStore = useOwnProfile();

const members = [{ userId: props.userId, name: props.userName }];

const createChat = (): void => {
	const temporalWindowId = uuidv4();

	const ownerId = getUserId() ?? '';
	const ownerName = ownProfileStore.ownProfile.name;

	const tempChat = getChatModel({
		members,
		ownerId,
		ownerName,
		chatType: 1,
		chatId: temporalWindowId,
	});

	chatStore.addChat(tempChat);

	windowStore.addWindow('chat', {
		isNewChat: true,
		chatId: temporalWindowId,
		name: userName.value,
	});
};

const openChat = (): void => {
	if (!props.chatId) {
		return;
	}

	windowStore.addWindow('chat', {
		chatId: props.chatId,
		isNewChat: false,
		name: userName.value,
	});
};

</script>

<style scoped lang="less">

.user-actions {
	position: absolute;
	right: 8px;
}

</style>
