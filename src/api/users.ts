import { User } from '@/types/users';
import axiosInstance from '@/utils/axios';

export async function getUsersList(page = 0, name = ''): Promise<User[]> {
    const { data } = await axiosInstance.get('users/getList', {
        params: {
            page: page,
            name: name
        }
    })
    return data;
} 