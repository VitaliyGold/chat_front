<template>
	<button
		class="btn"
		:class="{
			[variant]: true,
			[color]: true,
			[size]: true,
			'full-width': fullWidth,
			addClass
		}"
		:type="type"
		:disabled="disabled"
		@click="clickFunction"
	>
		<slot />
	</button>
</template>

<script setup lang="ts">
import {
	defineProps, PropType, defineEmits, toRefs,
} from 'vue';

type BtnVariants = 'contained' | 'outlined' | 'text';

type Colors = 'blue' | 'transparent' | 'white';

type Size = 'big' | 'medium' | 'small';

interface Emits {
    (e: 'click'): void
}

const props = defineProps({
	type: {
		type: String as PropType<'submit' | 'button' | 'reset'>,
		required: false,
		default: 'button',
	},
	variant: {
		type: String as PropType<BtnVariants>,
		required: false,
		default: 'contained',
	},
	color: {
		type: String as PropType<Colors>,
		required: false,
		default: 'blue',
	},
	size: {
		type: String as PropType<Size>,
		required: false,
		default: 'medium',
	},
	disabled: {
		type: Boolean,
		required: false,
		default: false,
	},
	fullWidth: {
		type: Boolean,
		required: false,
		default: false,
	},
	addClass: {
		type: String,
		required: false,
		default: '',
	},
});

const {
	type,
	variant,
	color,
	size,
	disabled,
	fullWidth,
	addClass,
} = toRefs(props);

const emit = defineEmits<Emits>();

const clickFunction = () => {
	emit('click');
};

</script>

<style scoped lang="less">

@blue-color: #005bff;
@blue-dark-color: darken(@blue-color, 20%);
@blue-light-color: lighten(@blue-color, 20%);

.btn {
    cursor: pointer;
    padding: 6px 8px;
    border: none;
    border-radius: 5px;
    &.medium {
        width: 135px;
        height: 34px;
    }
    &.small {
        width: 100px;
        height: auto;
    }
    &.blue {
        background-color: @blue-color;
        color: #f2f5f9;
        font-weight: 700;
        &:hover {
            background-color: @blue-dark-color;
        }
        &:disabled {
            background-color: @blue-light-color;
        }
    }
    &.outlined {
        border: 1px solid @blue-color;
        color: @blue-color;
        background-color: transparent;
        &:hover {
            border-color: @blue-light-color;
            color: @blue-light-color;
            background-color: transparent;
        }
        &:disabled {
            border-color: #99bdff;
            color: #99bdff;
            background-color: transparent;
        }
    }

    &.full-width {
        width: 100%;
    }
}

</style>
