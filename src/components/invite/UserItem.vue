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
            >
                Создать чат
            </button>
            <button 
                class="btn"
                v-else
            >
                В чат
            </button>
        </div>
    </li>
</template>

<script lang="ts">
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
        }
    },
    setup() {

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