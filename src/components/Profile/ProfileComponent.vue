<template>
	<div>
		<ui-loader
			v-if="loading"
			:full-window="true"
		/>
		<profile-container
			v-else
			:user-id="userId"
			:name="profile.name"
			:have-chat="profile.haveChat"
			:chat-id="profile.chatId"
			:user-description="profile.userDescription"
		/>
	</div>
</template>

<script setup lang="ts">
import {
	defineProps, ref, onMounted, toRefs, reactive, PropType,
} from 'vue';

import { Profile } from '@/types/profile';
import ProfileController from '@/api/profile';
import UiLoader from '@/components/UI/UiLoader.vue';
import { getProfileModel } from './helpers';

import ProfileContainer from './components/ProfileContainer.vue';

const props = defineProps({
	userId: {
		required: true,
		type: String || null,
	},
	isOwnProfile: {
		required: false,
		type: Boolean,
		default: false,
	},
	profileData: {
		required: false,
		type: Object as PropType<Profile> | null,
		default: null,
	},
});

const {
	userId,
	isOwnProfile,
	profileData,
} = toRefs(props);

let profile = reactive<Profile>(getProfileModel(null));

const loading = ref(true);

onMounted(async () => {
	if (isOwnProfile.value) {
		profile = getProfileModel(profileData.value);
	} else {
		const userProfile = await ProfileController.getProfile(userId.value);

		profile = getProfileModel(userProfile);
	}

	loading.value = false;
});

</script>
