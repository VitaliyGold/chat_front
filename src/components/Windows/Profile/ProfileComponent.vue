<template>
	<div>
		<ui-loader
			v-if="loading"
			:full-window="true"
		/>
		<profile-container
			v-else
			:profile-data="profile"
		/>
	</div>
</template>

<script setup lang="ts">
import {
	defineProps, ref, onMounted, toRefs, reactive, toRef,
} from 'vue';

import { Profile } from '@/types/profile';
import ProfileController from '@/api/profile';
import useProfiles from '@/store/profiles';
import useOwnProfile from '@/store/ownProfile';
import { getUserId } from '@/utils/jwt';

import UiLoader from '@/components/UI/UiLoader.vue';
import { getProfileModel } from './helpers';
import ProfileContainer from './components/ProfileContainer.vue';

const props = defineProps({
	profileId: {
		required: true,
		type: String,
	},
});

const profileId = toRef(props, 'profileId');

const profileStore = useProfiles();
const ownProfileStore = useOwnProfile();

let profile = reactive<Profile>(getProfileModel(null));

const isOwnProfile = getUserId() === profileId.value;

const loading = ref(true);

onMounted(async () => {
	if (isOwnProfile) {
		profile = getProfileModel(ownProfileStore.ownProfile);
	} else {
		const userProfile = profileStore.profilesList[profileId.value] ?? await ProfileController.getProfile(profileId.value);

		profile = getProfileModel(userProfile);
	}

	loading.value = false;
});

</script>
