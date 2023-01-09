<template>
    <div
        class="empty-field"
        v-if="loading || !userList.length"
    >
        <p v-if="!loading && !userList.length">
            Нет данных
        </p>
        <loader-component
            v-else="loading"
        />

    </div>
    
    
    <ul 
        class="users-list"
        v-else
    >
    <user-item
        v-for="user in userList"
        :user_info="user"
        :have_chat="user.have_chat"
        :chat_id="user.chat_id"
        :is_profile="false"
        
    />
        
    </ul>
    
</template>

<script lang='ts'>

import { defineComponent, PropType } from 'vue';

import { User } from '@/types/users';
import useProfile from '@/store/profile';

import UserItem from '@/components/ui-components/UserItem.vue';
import Loader from '@/components/ui-components/Loader.vue';

export default defineComponent({
    name: 'UserList',
    props: {
        userList: {
            required: true,
            type: Array as PropType<User[]>
        },
        loading: {
            required: true,
            type: Boolean
        }
    },
    setup() {
        const profile_store = useProfile();

        return {
            current_user_id: profile_store.user_profile?.user_id
        }
    },

    components: {
        'user-item': UserItem,
        'loader-component': Loader
    }
})
</script>


<style lang="less" scoped>

.users-list {
    padding: 5px;
    margin-top: 10px;
    display: grid;
    grid-template-columns: repeat(3, auto);
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