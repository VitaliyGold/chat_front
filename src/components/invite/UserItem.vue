<template>
    <div class="user">
        <div class="user-avatar">

        </div>
        <div class="user-info">

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
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';


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
        }
    }
})

</script>

<style lang="less" scoped>


</style>