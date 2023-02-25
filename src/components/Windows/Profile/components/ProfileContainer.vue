<template>
	<div class="user-profile">
		<profile-header
			:user-id="profileData.userId"
			:name="profileData.name"
			:is-self="false"
		/>
		<div class="profile-content">
			<profile-info
				:user-description="profileData.userDescription"
				:user-link="profileData.userLink"
			/>
			<actions-container
				v-if="!profileData.isOwnProfile"
				:user-id="profileData.userId"
				:user-name="profileData.name"
				:have-chat="profileData.haveChat"
				:chat-id="profileData.chatId"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, toRef, PropType } from 'vue';

import { Profile } from '@/types/profile';

import ProfileHeader from './ProfileHeader/ProfileHeader.vue';
import ProfileInfo from './ProfileInfo.vue';
import ActionsContainer from './Actions/ActionsContainer.vue';

const props = defineProps({
	profileData: {
		type: Object as PropType<Profile>,
		required: true,
	},
});

const profileData = toRef(props, 'profileData');

</script>

<style lang="less" scoped>

.profile-content {
    display: grid;
    grid-template-columns: 50% 50%;
}

</style>
