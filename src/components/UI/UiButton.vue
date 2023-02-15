<template>
	<button
		class="btn"
        :class="{
            [variant]: true,
            [color]: true,
            [size]: true,
            'full-width': fullWidth
        }"
		:type="type"
        :disabled="disabled"
		@click="clickFunction"
	>
		<slot></slot>
	</button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type BtnVariants = 'contained' | 'outlined' | 'text';

type Colors = 'blue' | 'transparent' | 'white';

type Size = 'big' | 'medium' | 'small';

export default defineComponent({
	name: 'UiButton',
	emits: ['click'],
	props: {
		type: {
			type: String as PropType<'submit' | 'button'>,
			required: false,
			default: 'button',
		},
        variant: {
            type: String as PropType<BtnVariants>,
            required: false,
            default: 'contained'
        },
        color: {
            type: String as PropType<Colors>,
            required: false,
            default: 'blue'
        },
        size: {
            type: String as PropType<Size>,
            required: false,
            default: 'medium'
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        },
        fullWidth: {
            type: Boolean,
            required: false,
            default: false
        }
	},
	setup(_, { emit }) {
		const clickFunction = () => {
			emit('click');
		};

		return {
			clickFunction,
		};
	},
});

</script>

<style scoped lang="less">

.btn {
    cursor: pointer;
    padding: 6px 8px;
    border: none;
    border-radius: 5px;
    &.medium {
        width: 135px;
        height: 34px;
    }
    &.blue {
        background-color: #005bff;
        color: #f2f5f9;
        font-weight: 700;
        &:hover {
            background-color: #0050e0;
        }
        &:disabled {
            background-color: #99bdff;
        }
    }
    &.full-width {
        width: 100%;
    }
}

</style>
