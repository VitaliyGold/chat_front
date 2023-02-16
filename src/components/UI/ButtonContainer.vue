<template>
	<div
		class="btn-container"
		:class="{
			[direction]: true
		}"
	>
		<slot />
	</div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, toRefs } from 'vue';

type Direction = 'row' | 'column';

const props = defineProps({
	direction: {
		type: String as PropType<Direction>,
		required: false,
		default: 'row',
	},
});

const {
	direction,
} = toRefs(props);

</script>

<style scoped lang="less">
    .btn-container {
        margin-top: 12px;
        display: flex;
        gap: 20px;
        &.column {
            flex-direction: column;
            gap: 12px
        }
    }
</style>
