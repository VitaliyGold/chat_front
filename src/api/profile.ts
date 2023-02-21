import { Profile } from '@/types/profile';
import axiosInstance from '@/utils/axios';

async function getProfile(userId: string): Promise<Profile> {
	const { data } = await axiosInstance.get('profile/getUserProfile', {
		params: {
			profileId: userId,
		},
	});
	return data;
}

export default {
	getProfile,
};
