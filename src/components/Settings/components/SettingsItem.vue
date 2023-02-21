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
        height: 50px;
        padding: 0 10px;
        p {
            font-size: 16px;
        }
        &:hover {
		    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	    }
    }

</style>
