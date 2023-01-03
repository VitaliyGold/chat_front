<template>
    <div class="input_wrapper">
        <div 
            class="input_wrapper__inner"
        >
            <label>
                {{ labelText }}
            </label>
            <input 
                :type="type" 
                v-model="inputValue"
                :class="{ 'error': haveError }"
            >
        </div>
        <span 
            class="validation_message" 
            v-if="haveError && errorMessageText"
        >
            {{ errorMessageText }}
        </span>
    </div>
</template>

<script lang="ts">

import { defineComponent, computed } from 'vue';
import type { BaseValidation } from '@vuelidate/core';

const haveErrorMessage = (rule: BaseValidation) => {
    return Object.keys(rule).length && rule.$errors.length
}

export default defineComponent({
    emits: [
        'update:modelValue'
    ],

    props: {
        labelText: {
            type: String,
            required: false
        },
        modelValue: {
            type: String,
            required: true
        },
        validationRule: {
            type: Object,
            required: false,
            default: {}
        },
        type: {
            required: false,
            default: 'text'
        }

    },
    setup(props, { emit }) {

        const inputValue = computed({
            get() {
                return props.modelValue;
            },
            set(value) {
                emit('update:modelValue', value);
            }
        })

        const haveError = computed((): boolean => {
            
            return !!props.validationRule.$error;
        })

        const errorMessageText = computed(() => {
            // костыль
            // TODO посмотреть что за проблема с типами
            if (haveErrorMessage(props.validationRule as BaseValidation)) {
                return props.validationRule.$errors[0].$message;
            }
            
            return ''
        })


        
        return {
            labelText: props.labelText,
            inputValue,
            errorMessageText,
            haveError,
            type: props.type
            
        }
    }
})
</script>

<style scoped lang="less">
.input_wrapper {
   
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
    .validation_message {
        font-size: 10px;
        display: block;
        color: var(--error-color);
    }
}
</style>