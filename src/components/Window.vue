<template>
    <div class="window">
        <control-window-panel
            :window_id="window.window_id"
            :window_name="window.name"
        />
        <settings-window-component
            v-if="window.type === 'settings'"

        />
        <invite-window-component
            v-else-if="window.type === 'invite'"
        />
        <chat-window-component
            :window="window"
            v-else-if="window.type === 'chat'"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import ControlWindowPanel from '@/components/ControlWindowPanel.vue';
import { WindowObject } from '@/types/window';
import SettingsWindow from '@/components/settings/SettingsWindow.vue';
import ChatWindow from './chats/ChatWindow.vue';
import InviteWindow from './invite/InviteWindow.vue';

export default defineComponent({
  props: {
    window: {
      required: true,
      type: Object as PropType<WindowObject>,
    },
  },
  components: {
    'chat-window-component': ChatWindow,
    'settings-window-component': SettingsWindow,
    'control-window-panel': ControlWindowPanel,
    'invite-window-component': InviteWindow,
  },
});
</script>

<style scoped>
    .window {
        max-width: 1700px;
        width: 100%;
        height: 100%;
        background-color: white;
        border-radius: 7px;
        overflow: auto;
    }

    .window + .window {
        margin-left: 10px;
    }
</style>
