<template>
    <li class="settings-item">
        <slot></slot>
        <p>
            {{ setting_name }}
        </p>
    </li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SettingsName } from '@/types/settings';


export default defineComponent({
    props: {
        setting_name: {
            type: String as PropType<SettingsName>
        }
    }
});

</script>

<style lang="less" scoped>
    .settings-item {
        display: flex;
        align-items: center;
        cursor: pointer;
        p {
            font-size: 16px;
        }
        &:hover {
            background-color: gray;
            p {
                color: white;
            }
            .material-design-icon > .material-design-icon__svg {
                fill: white;
            }
        }
    }

</style>