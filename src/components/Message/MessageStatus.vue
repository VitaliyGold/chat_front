<template>
    <div>
        <loader-component 
            :size="20"
            v-if="status === 'loading'"
        />
        <span v-else>
            Готово
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Loader from '../ui-components/Loader.vue';

import { MessageStatus } from '@/types/message';

export default defineComponent({
    props: {
        status: {
            required: true,
            type: String as PropType<MessageStatus>
        }
    },
    components: {
        'loader-component': Loader
    },
    setup() {
        
    },
})
</script>
