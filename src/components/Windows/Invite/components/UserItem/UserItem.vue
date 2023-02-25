<template>
	<li
		class="user"
		@click="goToProfile"
	>
		<div class="user-avatar">
			<ui-picture
				picture-size="small_avatar"
			/>
		</div>
		<user-info
			:name="userInfo.name"
			:description="userInfo.userDescription"
		/>
		<user-actions
			:user-id="userInfo.userId"
			:user-name="userInfo.name"
			:chat-id="chatId"
			:have-chat="haveChat"
		/>
	</li>
</template>

<script setup lang="ts">

import { PropType, defineProps, toRefs } from 'vue';

import useWindows from '@/store/windows';
import { Profile } from '@/types/profile';
import { ChatID } from '@/types/chats';

import UiPicture from '@/components/UI/UiPicture.vue';
import UserActions from '@/components/SmartUI/UserActions.vue';
import UserInfo from './UserInfo.vue';

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
});

const {
	userInfo,
	haveChat,
	chatId,
} = toRefs(props);

const windowStore = useWindows();

const goToProfile = () => {
	windowStore.changeModeWindow('invite', 'profile', userInfo.value.userId);
};

</script>

<style lang="less" scoped>
.user {
	display: grid;
    grid-template-columns: 2fr 7fr 3fr;
    align-items: center;
	position: relative;
    padding: 5px;
    border-radius: 4px;
	height: 70px;
	cursor: pointer;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	&:hover {
		box-shadow: rgba(100, 100, 111, 0.4) 0px 7px 29px 0px;;
	}
}

</style>
