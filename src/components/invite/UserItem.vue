<template>
    <li class="user">
        <div class="user-avatar">
            <person-icon-component
                :size="36"
                class="icon-3x"
            />
        </div>
        <div class="user-info">
            {{ user_name }}
        </div>
        <div class="user-actions">
            <button 
                class="btn"
                v-if="have_chat"
                @click="() => openChat(chat_id)"
            >
                В чат
            </button>
            <button 
                class="btn"
                
                @click="() => createChat(user_id)"
                v-else
            >
                Создать чат
            </button>
        </div>
    </li>
</template>

<script lang="ts">
import useWindows from '@/store/windows';
import { defineComponent, PropType } from 'vue';
import PersonIcon from 'vue-material-design-icons/Account.vue';

export default defineComponent({
    name: 'UserItem',
    props: {
        user_name: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        have_chat: {
            type: Boolean,
            required: false,
            default: false
        },
        chat_id: {
            type: [String, null] as PropType<string | null>,
            required: false,
            default: null
        }
    },
    setup() {

        const store = useWindows();

        const openChat = ( chat_id: string | null) => {
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