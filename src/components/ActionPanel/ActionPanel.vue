<template>
    <div class="action_panel">
        <action-panel-item-components
            v-for="window of getWindowsList"
            :item_id="window.window_id"
            :item_name="window.name"
            :hide="window.hide"
            :item_type="window.type"
        />
    </div>
</template>
<script lang="ts">
import useWindows from '@/store/windows';
import { defineComponent, computed } from 'vue';
import ActionPanelItem from './ActionPanelItem.vue';

export default defineComponent({
    name: 'ActionPanel',
    components: {
        'action-panel-item-components': ActionPanelItem
    },
    setup() {
        const store = useWindows();

        const getWindowsList = computed(() => store.getWindowsList)

        return {
            getWindowsList
        }
    },
})
</script>

<style scoped>
    .action_panel {
        height: 60px;
        max-width: 600px;
        margin-top: 20px;
        width: 100%;
        background-color: green;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>