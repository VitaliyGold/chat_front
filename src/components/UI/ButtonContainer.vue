<template>
	<div
		class="btn-container"
		:class="{
			[direction]: true
		}"
		:style="styles"
	>
		<slot />
	</div>
</template>

<script lang="ts" setup>
import {
	defineProps, PropType, StyleValue, toRefs,
} from 'vue';

type Direction = 'row' | 'column';

const props = defineProps({
	direction: {
		type: String as PropType<Direction>,
		required: false,
		default: 'row',
	},
	styles: {
		type: Object as PropType<StyleValue>,
		required: false,
		default: () => {},
	},
});

const {
	direction,
} = toRefs(props);

</script>

<style scoped lang="less">
    .btn-container {
        display: flex;
        gap: 20px;
        &.column {
            flex-direction: column;
            gap: 12px
        }
    }
</style>
