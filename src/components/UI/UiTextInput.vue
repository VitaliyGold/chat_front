<template>
	<div class="input-wrapper">
		<div
			class="input-wrapper__inner"
		>
			<input
				:type="type"
				v-model="inputValue"
				id="registration-input"
				placeholder=" "
				:class="{
					'error': haveError,
					[variant]: true
				}"
			>
			<label for="registration-input">
				{{ labelText }}
			</label>
		</div>
		<span
			class="validation-message"
			v-if="haveError && errorMessageText"
		>
			{{ errorMessageText }}
		</span>
	</div>
</template>

<script lang="ts" setup>

import {
	computed, toRefs, PropType, defineProps, defineEmits,
} from 'vue';

import { CustomError } from '@/types/ui';

type InputVariants = 'searchField' | 'inputField';

interface Emits {
    (e: 'updateValue', data: string): void
}

const emit = defineEmits<Emits>();

const props = defineProps({
	labelText: {
		type: String,
		required: false,
		default: '',
	},
	value: {
		type: String,
		required: true,
	},
	error: {
		type: Object as PropType<CustomError>,
		required: false,
		default: undefined,
	},
	variant: {
		type: String as PropType<InputVariants>,
		required: false,
		default: 'inputField',
	},
	type: {
		required: false,
		type: String as PropType<'text' | 'password'>,
		default: 'text',
	},
});

const {
	value,
	type,
	error,
	labelText,
	variant,
} = toRefs(props);

const inputValue = computed({
	get() {
		return value.value;
	},
	set(newValue) {
		emit('updateValue', newValue);
	},
});

const errorMessageText = computed(() => error?.value?.errorText ?? '');

const haveError = computed(() => error?.value?.haveError ?? false);

</script>

<style scoped lang="less">
.input-wrapper {

    width: 100%;

	.input-wrapper__inner {
		position: relative;
		label {
			position: absolute;
			top: -6px;
			left: 7px;
			background: white;
			padding: 0 3px;
			display: block;
			font-size: 12px;
			color: #9e9e9e;
		}

		input:hover + label {
			color: #99bdff;
		}
		input.searchField + label {
			color: #99bdff;
		}
		input:not(:placeholder-shown) + label {
			color: #99bdff;
		}
		input:focus + label {
			color: #005bff;
		}
		input.error + label {
			color: var(--error-color);
		}

	}
    input {
        width: 100%;
        height: 34px;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid #e7e7eb;
        outline: none;
		background-color: white !important;

		&:hover {
			border: 1px solid #99bdff;
		}
		&:not(:placeholder-shown) {
			border: 1px solid #99bdff;
		}
		&.searchField {
			border: 1px solid #99bdff;
		}
		&:focus {
			border: 1px solid #005bff;
		}
		&.error {
            border: 1px solid var(--error-color);
        }

    }
    .validation-message {
        font-size: 10px;
        display: block;
        color: var(--error-color);
    }
}
</style>
