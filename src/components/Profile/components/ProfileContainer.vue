<template>
	<div class="user-profile">
		<profile-header
			:user-id="userId"
			:name="name"
			:is-self="false"
		/>
		<div class="profile-content">
			<profile-info
				:user-description="userDescription"
				:user-link="userLink"
			/>
			<actions-container
				v-if="!isOwnProfile"
				:user-id="userId"
				:user-name="name"
				:have-chat="haveChat"
				:chat-id="chatId"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';

import ProfileHeader from './ProfileHeader/ProfileHeader.vue';
import ProfileInfo from './ProfileInfo.vue';
import ActionsContainer from './Actions/ActionsContainer.vue';

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	userDescription: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	userLink: {
		type: String,
		required: false,
		default: '#PavelDurov',
	},
	haveChat: {
		type: Boolean,
		required: false,
		default: false,
	},
	chatId: {
		type: null as PropType<string | null>,
		required: true,
	},
	isOwnProfile: {
		type: Boolean,
		required: false,
		default: false,
	},
});

const {
	userId,
	userDescription,
	name,
	userLink,
	haveChat,
	isOwnProfile,
	chatId,
} = toRefs(props);

</script>

<style lang="less" scoped>

.profile-content {
    display: grid;
    grid-template-columns: 50% 50%;
}

</style>
