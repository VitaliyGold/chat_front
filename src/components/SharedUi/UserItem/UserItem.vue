<template>
	<li class="user">
		<div class="user-avatar">
			<ui-picture
				picture-size="small_avatar"
			/>
		</div>
		<user-info
			:name="userInfo.name"
		/>
		<user-actions
			v-if="!isProfile"
			:user-id="userInfo.userId"
			:user-name="userInfo.name"
			:chat-id="chatId"
			:have-chat="haveChat"
		/>
	</li>
</template>

<script setup lang="ts">

import { PropType, defineProps, toRefs } from 'vue';

import { Profile } from '@/types/profile';
import { ChatID } from '@/types/chats';

import UiPicture from '@/components/UI/UiPicture.vue';
import UserActions from '@/components/SharedUi/UserItem/UserActions.vue';
import UserInfo from '@/components/SharedUi/UserItem/UserInfo.vue';

const props = defineProps({
	userInfo: {
		type: Object as PropType<Profile>,
		required: true,
	},
	haveChat: {
		type: Boolean,
		required: false,
		default: false,
	},
	chatId: {
		type: String as PropType<ChatID>,
		required: false,
		default: null,
	},
	isProfile: {
		type: Boolean,
		required: false,
		default: false,

	},
});

const {
	userInfo,
	haveChat,
	chatId,
	isProfile,
} = toRefs(props);

</script>

<style lang="less" scoped>
.user {
    display: flex;
    align-items: center;
	position: relative;
    padding: 5px;
    border-radius: 4px;
	cursor: pointer;
	&:hover {
		box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;;
	}
}

</style>
