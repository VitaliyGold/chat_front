<template>
	<profile-component
		:user-id="userProfile.userId"
		:is-own-profile="true"
		:profile-data="userProfile"
	/>
	<settings-list />
</template>

<script lang="ts" setup>
import useProfile from '@/store/profile';

import ProfileComponent from '@/components/Profile/ProfileComponent.vue';
import SettingsList from './components/SettingsList.vue';

const profileStore = useProfile();

const { userProfile } = profileStore;

</script>

<style scoped lang="less">

</style>
