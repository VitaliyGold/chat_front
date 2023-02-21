import { Profile } from '@/types/profile';

export const getProfileModel = (data: Profile | null): Profile => {
	if (!data) {
		return {
			name: '',
			userLink: '',
			avatarLink: '',
			userId: '',
			userDescription: '',
			chatId: '',
			haveChat: false,
		};
	}
	return {
		name: data.name ?? '',
		userLink: data.userLink ?? '',
		avatarLink: data.avatarLink ?? '',
		userId: data.userId ?? '',
		userDescription: data.userDescription ?? '',
		chatId: data.chatId ?? null,
		haveChat: data.haveChat ?? false,
	};
};
