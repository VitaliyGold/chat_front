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
	defineComponent, computed, toRefs, PropType,
} from 'vue';
import type { BaseValidation } from '@vuelidate/core';

const haveErrorMessage = (rule: BaseValidation) => Object.keys(rule).length && rule.$errors.length;

export default defineComponent({
	emits: [
		'update:modelValue',
	],
	props: {
		labelText: {
			type: String,
			required: false,
			default: '',
		},
		modelValue: {
			type: String,
			required: true,
		},
		validationRule: {
			type: Object as PropType<BaseValidation>,
			required: false,
			default: () => {},
		},
		type: {
			required: false,
			type: String as PropType<'text' | 'password'>,
			default: 'text',
		},

	},
	setup(props, { emit }) {
		const {
			modelValue,
			type,
			validationRule,
			labelText,
		} = toRefs(props);

		const inputValue = computed({
			get() {
				return modelValue.value;
			},
			set(value) {
				emit('update:modelValue', value);
			},
		});

		const haveError = validationRule.value
			? computed((): boolean => !!validationRule.value.$error)
			:			false;

		const errorMessageText = validationRule.value
			? computed(() => {
				// костыль
				// TODO посмотреть что за проблема с типами
				if (haveErrorMessage(validationRule.value)) {
					return validationRule.value.$errors[0].$message;
				}
				return '';
			})
			:			'';

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
