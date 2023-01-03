<template>
    <div class="window-header">
        <text-field/>
    </div>
    <div class="users-list">

    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';

import TextField from '../ui-components/TextField.vue';

import { debounce } from '@/utils/helpers';


export default defineComponent({
    name: 'InviteWindow',
    components: {
        'text-field': TextField
    },
    setup() {
        const searchValue = ref('');

        const searchFunc = debounce((value: string ) => {
            searchValue.value = value;
        }, 500)

        const userList = reactive([])


        return {
            searchFunc,
            searchValue
        }

    }
})
</script>

<style lang="less" scoped>
</style>