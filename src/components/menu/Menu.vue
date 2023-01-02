<template>
    <ul>
        <li>
            <button
                class="btn single-icon"
                @click="openSettingsWindow('invite')"
            >
                <invite-icon-component
                    :size="36"
                    class="icon-3x"
                />
            </button>
        </li>
        <li>
            <button
                class="btn single-icon"
                @click="openSettingsWindow('settings')"
            >
                <settings-icon-component
                    :size="36"
                    class="icon-3x"
                />
            </button>
        </li>
    </ul>
</template>

<script lang="ts">
import useWindows from '@/store/windows';
import { defineComponent } from 'vue';
import InviteIcon from 'vue-material-design-icons/AccountPlus.vue';
import SettingsIcon from 'vue-material-design-icons/Cog.vue';


export default defineComponent({
    components: {
        'invite-icon-component': InviteIcon,
        'settings-icon-component': SettingsIcon
    },
    setup() {
        const store = useWindows();

        const openSettingsWindow = (type: 'invite' | 'settings') => {
            store.addWindow(type)
            $emit('openSettingsWindow')
        }

        return {
            openSettingsWindow
        }
    }
})

</script>

<style lang="less" scoped>
    ul {
        border: 1px solid black;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: white;
        position: absolute;
        list-style-type: none;
        right: 38px;
        bottom: 70px;
    }
</style>