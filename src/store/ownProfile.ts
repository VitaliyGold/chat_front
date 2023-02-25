import { defineStore } from 'pinia';
import { Profile } from '@/types/profile';

const useOwnProfile = defineStore('ownProfile', {
	state: () => ({
		ownProfile: {} as Profile,
	}),
	actions: {
		fillOwnProfile(data: Profile) {
			this.ownProfile = data;
		},
	},
});

export default useOwnProfile;
