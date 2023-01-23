import { User } from '@/types/users';
import axiosInstance from '@/utils/axios';

async function getUsersList(page = 0, name = ''): Promise<User[]> {
	const { data } = await axiosInstance.get('users/getList', {
		params: {
			page,
			name,
		},
	});
	return data;
}

export default {
	getUsersList,
};
