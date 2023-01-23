<template>
	<li class="settings-item">
		<slot />
		<p>
			{{ settingName }}
		</p>
	</li>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { SettingsName } from '@/types/settings';

export default defineComponent({
	props: {
		settingName: {
			type: String as PropType<SettingsName>,
			required: true,

		},
	},
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
