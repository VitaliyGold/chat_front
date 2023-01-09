<template>
    <div 
        class="settings-window" 
    >
        <div class="profile_data">
            <user-item-component
                :user_info="user_profile"
                :is_profile="true"
                v-if="user_profile"
            />
            <p 
                v-else
            >
                Пользователь не загрузился
            </p>
        </div>
        <settings-list-component/>
    </div>
    
</template>

<script lang="ts">
import useProfile from '@/store/profile';
import { defineComponent } from 'vue';

import UserItem from '../ui-components/UserItem.vue';
import SettingsList from './SettingsList.vue';


export default defineComponent({
    name: 'SettingsWindow',
    components: {
        'user-item-component': UserItem,
        'settings-list-component': SettingsList
    },
    setup() {
        const profile_store = useProfile();

        return {
            user_profile: profile_store.user_profile,
        }
    }
})
</script>

<style>
    .settings-window {
        padding: 5px 10px;
    }
</style>