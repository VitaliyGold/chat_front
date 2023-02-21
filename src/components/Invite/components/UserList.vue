<template>
	<div
		class="empty-field"
		v-if="loading || !userList.length"
	>
		<p v-if="!loading && !userList.length">
			Нет данных
		</p>
		<loader-component
			v-else
		/>
	</div>

	<ul
		class="users-list"
		v-else
	>
		<user-item
			v-for="user in userList"
			:key="user.userId"
			:user-info="user"
			:have-chat="user.haveChat"
			:chat-id="user.chatId"
		/>
	</ul>
</template>

<script lang='ts'>

import { defineComponent, PropType } from 'vue';

import { User } from '@/types/users';
import useProfile from '@/store/profile';

import LoaderComponent from '@/components/UI/UiLoader.vue';
import UserItem from './UserItem/UserItem.vue';

export default defineComponent({
	name: 'UserList',
	props: {
		userList: {
			required: true,
			type: Array as PropType<User[]>,
		},
		loading: {
			required: true,
			type: Boolean,
		},
	},
	setup() {
		const profileStore = useProfile();

		return {
			currentUserId: profileStore.userProfile?.userId,
		};
	},

	components: {
		'user-item': UserItem,
		'loader-component': LoaderComponent,
	},
});
</script>

<style lang="less" scoped>

.users-list {
    padding: 5px;
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(2, auto);
    row-gap: 10px;
    column-gap: 20px;
}

.empty-field {
    display: flex;
    align-items: center;
    height: calc(100% - 101px);
    width: 100%;
    justify-content: center;
}
</style>
