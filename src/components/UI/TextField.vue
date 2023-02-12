<template>
	<div class="input-wrapper">
		<div
			class="input-wrapper__inner"
		>
			<label>
				{{ label }}
			</label>
			<input
				:type="inputType"
				v-model="inputValue"
				:class="{ 'error': haveError }"
			>
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
	defineComponent, computed, Ref, PropType,
} from 'vue';
import type { BaseValidation } from '@vuelidate/core';

import { CustomError } from '@/types/ui';

const haveErrorMessage = (rule: BaseValidation) => Object.keys(rule).length && rule.$errors.length;

export default defineComponent({
	emits: [
		'updateValue',
	],
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
		validationRule: {
			type: Object as PropType<BaseValidation>,
			required: false,
			default: () => {},
		},
		customError: {
			type: Object as PropType<CustomError>,
			required: false,
			default: () => {
				return {
					haveError: false, 
					errorText: '' 
				}
			}
		},
		type: {
			required: false,
			type: String as PropType<'text' | 'password'>,
			default: 'text',
		},

	},
	setup(props, { emit }) {
		const inputValue = computed({
			get() {
				return props.value;
			},
			set(value) {
				emit('updateValue', value);
			},
		});

		const getErrorText = computed((): string | Ref<string> => {
			if (props.customError.errorText) {
				return props.customError.errorText;
			} else if (haveErrorMessage(props.validationRule)) {
				return props.validationRule.$errors[0].$message;
			}
			return '';
		});

		const haveError = computed(() => {
			return  props.customError.haveError || !!props.validationRule.$error
		});


		const errorMessageText = props.validationRule ? getErrorText : '';

		return {
			label: props.labelText,
			inputValue,
			errorMessageText,
			haveError,
			inputType: props.type,

		};
	},
});
</script>

<style scoped lang="less">
.input-wrapper {

    width: 100%;
    label {
        display: block;
        font-size: 12px;
        padding-bottom: 3px;
    }
    input {
        width: 100%;
        height: 34px;
        padding: 8px;
        border-radius: 4px;
        border: 1px solid gray;
        outline-color: blue;
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
