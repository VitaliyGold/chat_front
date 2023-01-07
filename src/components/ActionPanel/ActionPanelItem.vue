<template>
    <div class="action-panel-item"
    :title="item_name"
    >
        <button 
            class="btn action-panel-btn"
            @click="openWindow"
        >
            <invite-icon-component
                :size="36"
                class="icon-3x"
                v-if="item_type === 'invite'"
            />
            <settings-icon-component
                :size="36"
                class="icon-3x"
                v-else-if="item_type === 'settings'"
            />
            <person-icon-component
                :size="36"
                class="icon-3x"
                v-else
            />
        </button>
        <button
            class="btn single-icon"
            @click="closeWindow"
        >
            <close-icon-component
                class="icon-1x"
            />
        </button>
    </div>
    
</template>

<script lang="ts">
import useWindows from '@/store/windows';
import { defineComponent, PropType } from 'vue';
import CloseIcon from 'vue-material-design-icons/Close.vue';
import InviteIcon from 'vue-material-design-icons/AccountPlus.vue';
import PersonIcon from 'vue-material-design-icons/Account.vue';
import SettingsIcon from 'vue-material-design-icons/Cog.vue';
import { WindowsTypes } from '@/types/window';

export default defineComponent({
    name: 'ActionPanelItem',
    components: {
        'close-icon-component': CloseIcon,
        'invite-icon-component': InviteIcon,
        'settings-icon-component': SettingsIcon,
        'person-icon-component': PersonIcon
    },
    setup(props) {
        const store = useWindows();
        return {
            openWindow: () => store.openWindow(props.item_id),
            closeWindow: () => store.closeWindow(props.item_id)
        }
    },
    props: {
        item_id: {
            type: String,
            required: true
        },
        item_name: {
            type: String,
            required: true
        },
        hide: {
            type: Boolean,
            required: true
        },
        item_type: {
            type: String as PropType<WindowsTypes>
        }
    },
})
</script>

<style lang="less" scoped>
.action-panel-item {
    position: relative;
    &:hover {
        .single-icon {
            display: block;
        }
    }
}

.action-panel-item + .action-panel-item {
    margin-left: 10px;
}

.single-icon {
    position: absolute;
    right: 0;
    top: 0;
    display: none;
}
</style>