<template>
    <div>
        <loader-component 
            :size="20"
            addClass="icon-2x"
            v-if="status === 'loading'"
        />
        <span v-else>
            Готово
        </span>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import LoaderWrapper from '@/components/ui-components/Loader.vue';

import { MessageStatus } from '@/types/message';

export default defineComponent({
    props: {
        status: {
            required: true,
            type: String as PropType<MessageStatus>
        }
    },
    components: {
        'loader-component': LoaderWrapper
    },
    setup() {
        
    },
})
</script>
