import { Profile } from '@/types/profile';
import { defineStore } from 'pinia';

const useProfile = defineStore('profile', {
	state: () => ({
		userProfile: {} as Profile,
	}),
	actions: {
		fillUserProfile(userData) {
			this.userProfile = userData;
		},
	},
});

export default useProfile;
