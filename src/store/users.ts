import { defineStore } from 'pinia';
import { User } from '@/types/users';

const useUsers = defineStore('users', {
	state: () => ({
		usersList: [] as User[],
	}),
});

export default useUsers;
