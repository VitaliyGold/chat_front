<template>
    <li class="user">
        <div class="user-avatar">
            <person-icon-component
                :size="36"
                class="icon-3x"
            />
        </div>
        <div class="user-info">
            {{ user_info.name }}
        </div>
        <user-actions-component
            :user_id="user_info.user_id"
            :chat_id="chat_id"
            :have_chat="have_chat"
        />
    </li>
    
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';

import { Profile } from '@/types/profile';
import { Chat_ID } from '@/types/chats';

import PersonIcon from 'vue-material-design-icons/Account.vue';
import UserActions from '../invite/UserActions.vue';

export default defineComponent({
    name: 'UserItem',
    props: {
        user_info: {
            type: Object as PropType<Profile>,
            required: true
        },
        have_chat: {
            type: Boolean,
            required: false,
            default: false
        },
        chat_id: {
            type: String as PropType<Chat_ID>,
            required: false,
            default: null
        },
        is_profile: {
            type: Boolean,
            required: false,
            default: false

        }
    },
    components: {
        'person-icon-component': PersonIcon,
        'user-actions-component': UserActions
    }
})

</script>

<style lang="less" scoped>
.user {
    display: flex;
    align-items: center;
    padding: 5px;
    border: 1px solid black;
    border-radius: 4px;
    .user-info {
        width: 50%;
    }
}

</style>