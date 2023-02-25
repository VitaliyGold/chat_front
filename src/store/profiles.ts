import { defineStore } from 'pinia';
import { ProfilesList } from '@/types/profile';

const useProfiles = defineStore('profiles', {
	state: () => ({
		profilesList: {} as ProfilesList,
	}),
});

export default useProfiles;
