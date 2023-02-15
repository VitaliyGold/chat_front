<template>
	<div class="input-wrapper">
		<div
			class="input-wrapper__inner"
		>
			<input
				:type="inputType"
				v-model="inputValue"
				id="registration-input"
				placeholder=" "
				:class="{ 'error': haveError }"
			>
			<label for="registration-input">
				{{ label }}
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

<script lang="ts">

import {
	defineComponent, computed, toRefs, PropType,
} from 'vue';

import { CustomError } from '@/types/ui';

export default defineComponent({
	emits: [
		'updateValue',
	],
	name: 'UiTextInput',
	props: {
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
			default: undefined
		},
		type: {
			required: false,
			type: String as PropType<'text' | 'password'>,
			default: 'text',
		},

	},
	setup(props, { emit }) {


		const {
			value,
			type,
			error,
			labelText
		} = toRefs(props);

		const inputValue = computed({
			get() {
				return value.value;
			},
			set(value) {
				emit('updateValue', value);
			},
		});
		const errorMessageText = computed(() => error.value ? error.value.errorText : '');


		const haveError = computed(() => error.value ? error.value.haveError : false);

		return {
			label: labelText,
			inputValue,
			errorMessageText,
			haveError,
			inputType: type,

		};
	},
});
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
