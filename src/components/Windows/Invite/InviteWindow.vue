<template>
	<div class="invite-window">
		<div
			v-if="inviteWindow.windowMode === 'invite'"
			class="invite-container"
		>
			<div class="search-container">
				<ui-text-input
					:value="searchValue"
					label-text="Поиск по имени"
					variant="searchField"
					@update-value="searchFunc"
				/>
			</div>
			<user-list
				:user-list="usersList"
				:loading="loading"
			/>
		</div>
		<profile-component
			v-else
			:user-id="inviteWindow.selectedUserId"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

import { debounce } from '@/utils/helpers';
import { User } from '@/types/users';
import { InviteWindow } from '@/types/window';
import usersController from '@/api/users';
import useWindows from '@/store/windows';
import useUsers from '@/store/users';

import UiTextInput from '@/components/UI/UiTextInput.vue';
import UserList from '@/components/Invite/components/UserList.vue';
import ProfileComponent from '@/components/Profile/ProfileComponent.vue';

const windowStore = useWindows();
const usersStore = useUsers();

const inviteWindow = computed(() => windowStore.windowsList.invite as InviteWindow);

const searchValue = ref('');
const loading = ref(true);

const { usersList } = usersStore;

const getUsers = async (name = '') => {
	loading.value = true;
	usersList.splice(0, usersList.length);
	const data = await usersController.getUsersList(0, name);
	usersList.push(...data);
	loading.value = false;
};

const searchFunc = debounce((value: string) => {
	searchValue.value = value;
	getUsers(value);
}, 500);

const goToInvite = () => {
	windowStore.changeModeWindow('invite', 'invite');
};

onMounted(() => {
	getUsers();
});
</script>

<style lang="less" scoped>

.invite-window {
	position: relative;
}

.invite-container {
	padding: 10px;
	margin-top: 10px;
	.search-container {
		max-width: 550px;
		width: 100%;
	}
}

</style>
