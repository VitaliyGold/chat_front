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
        <div 
            class="user-actions"
            v-if="!is_profile"
        >
            <button 
                class="btn"
                v-if="have_chat"
                @click="() => openChat(chat_id)"
            >
                В чат
            </button>
            <button 
                class="btn"
                
                @click="() => createChat(user_info.user_id)"
                v-else
            >
                Создать чат
            </button>
        </div>
    </li>
    
</template>

<script lang="ts">
import useWindows from '@/store/windows';
import { Profile } from '@/types/profile';
import { defineComponent, PropType } from 'vue';
import PersonIcon from 'vue-material-design-icons/Account.vue';

type Chat_ID = string | null;

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
    setup() {

        const store = useWindows();

        const openChat = ( chat_id: Chat_ID) => {
            if (!chat_id) {
                return;
            }
            store.addWindow('chat', { chat_id, is_new_chat: false });
        };

        const createChat = ( user_id: string ) => {
            store.addWindow('chat', { user_id, is_new_chat: true });
        }

        return {
            openChat,
            createChat
        }
    },
    components: {
        'person-icon-component': PersonIcon
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