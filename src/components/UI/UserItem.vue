<template>
	<li class="user">
		<div class="user-avatar">
			<person-icon-component
				:size="36"
				class="icon-3x"
			/>
		</div>
		<div class="user-info">
			{{ userInfo.name }}
		</div>
		<user-actions-component
			:user-id="userInfo.userId"
			:chat-id="chatId"
			:have-chat="haveChat"
		/>
	</li>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

import { Profile } from '@/types/profile';
import { ChatID } from '@/types/chats';

import PersonIcon from 'vue-material-design-icons/Account.vue';
import UserActions from '@/components/Invite/UserActions.vue';

export default defineComponent({
	name: 'UserItem',
	props: {
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
	},
	components: {
		'person-icon-component': PersonIcon,
		'user-actions-component': UserActions,
	},
});

</script>

<style lang="less" scoped>
.user {
    display: flex;
    align-items: center;
    padding: 5px;
    border: 1px solid black;
    border-radius: 4px;
    .user-info {
        width: 50%;
    }
}

</style>
