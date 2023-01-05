<template>
    <div class="window-header">
        <text-field
            v-model="searchValue"
            labelText="Поиск по имени"
            @update:modelValue="searchFunc"
        />
    </div>
    <user-list
        :userList="userList"
        :loading="loading"
    />
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import TextField from '@/components/ui-components/TextField.vue';
import UserList from '@/components/invite/UserList.vue';

import { debounce } from '@/utils/helpers';
import { User } from '@/types/users';
import { getUsersList } from '@/api/users';


export default defineComponent({
    name: 'InviteWindow',
    components: {
        'text-field': TextField,
        'user-list': UserList
    },
    setup() {
        const searchValue = ref('');
        const loading = ref(true);

        const searchFunc = debounce((value: string ) => {
            searchValue.value = value;
            getUsers(value);
        }, 500)

        const userList = ref<User[]>([]);

        const getUsers = async (name = '') => {
            console.log(name);
            try {
                loading.value = true;
                userList.value = [];
                const data = await getUsersList(0, name);
                userList.value = data;
            } catch(e) {
                console.log(e);
            } finally {
                loading.value = false;
            }
        }

        onMounted(async () => {
            getUsers();
        })

        return {
            searchFunc,
            searchValue,
            userList,
            loading
        }

    }
})
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