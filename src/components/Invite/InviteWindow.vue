<template>
	<div class="window-header">
		<text-field
			v-model="searchValue"
			label-text="Поиск по имени"
			@update:model-value="searchFunc"
		/>
	</div>
	<user-list
		:user-list="userList"
		:loading="loading"
	/>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import UserList from '@/components/Invite/UserList.vue';

import { debounce } from '@/utils/helpers';
import { User } from '@/types/users';
import usersController from '@/api/users';
import TextField from '@/components/UI/TextInputField.vue';

export default defineComponent({
	name: 'InviteWindow',
	components: {
		'text-field': TextField,
		'user-list': UserList,
	},
	setup() {
		const searchValue = ref('');
		const loading = ref(true);
		const userList = ref<User[]>([]);

		const getUsers = async (name = '') => {
			loading.value = true;
			userList.value = [];
			const data = await usersController.getUsersList(0, name);
			userList.value = data;
			loading.value = false;
		};

		const searchFunc = debounce((value: string) => {
			searchValue.value = value;
			getUsers(value);
		}, 500);

		onMounted(() => {
			getUsers();
		});

		return {
			searchFunc,
			searchValue,
			userList,
			loading,
		};
	},
});
</script>

<style lang="less" scoped>

.window-header {
    padding: 0 5px;
    margin-top: 10px;
    .input-wrapper {
        max-width: 500px;
    }
}

</style>
