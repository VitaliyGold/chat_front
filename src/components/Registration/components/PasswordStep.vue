<template>
    <form 
        @submit.prevent="submitPasswordStep"
        @reset.prevent="resetPasswordStep"
    >
        <ui-text-input
            label-text="Пароль"
            :value="password"
            :error="passwordError"
            @updateValue="changeField"
        />
        <ui-text-input
            label-text="Повторите пароль"
            :value="repeatPassword"
            :error="passwordRepeatError"
            @updateValue="changeRepeatPassword"
        />
        <button-container>
            <ui-button
                type="reset"
                :full-width="true"
                :variant="'outlined'"
            >
                Назад
            </ui-button>
            <ui-button
                type="submit"
                :full-width="true"
            >
                Далее
            </ui-button>
        </button-container>
    </form>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, ref } from 'vue';

import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers, sameAs } from '@vuelidate/validators';

import UiTextInput from '@/components/UI/UiTextInput.vue';
import ButtonContainer from '@/components/UI/ButtonContainer.vue';
import UiButton from '@/components/UI/UiButton.vue';

interface Emits {
    ( e: 'updateValue', data: { field: 'password', value: string } ): void
    ( e: 'nextStep' ): void,
    ( e: 'prevStep' ): void,
};

const emit = defineEmits<Emits>();

const props = defineProps({
    password: {
        type: String,
        required: true
    }
});


const password = computed(() => {
    return props.password
})

const repeatPassword = ref<string>('');

const validationRules = {
    password: {
        required: helpers.withMessage('Это обязательное поле', required),
        minLength: helpers.withMessage(({ $params }) => `Минимальная длина ${$params.min} символов`, minLength(5)),
        sameAs: helpers.withMessage('Пароли не совпадают', (value: string) => {
            return value === repeatPassword.value;
        })
    },
    repeatPassword: {
        required: helpers.withMessage('Это обязательное поле', required),
        minLength: helpers.withMessage(({ $params }) => `Минимальная длина ${$params.min} символов`, minLength(5)),
        sameAs: helpers.withMessage('Пароли не совпадают', (value: string) => {            
            return value === password.value;
        })
    },
};
	

const v$ = useVuelidate(validationRules, { password, repeatPassword });

const passwordError = computed(() => {
    return v$.value.password.$errors.length ? 
    {
        haveError: true,
        errorText: v$.value.password.$errors[0].$message
    }
    : 
    undefined;
});


const passwordRepeatError = computed(() => {

    return v$.value.repeatPassword.$errors.length ? 
    {
        haveError: true,
        errorText: v$.value.repeatPassword.$errors[0].$message
    }
    : 
    undefined;
});

const submitPasswordStep = () => {
    v$.value.$touch();
    if (v$.value.$errors.length) {
        return;
    }
    emit('nextStep');
};

const resetPasswordStep = () => {
    repeatPassword.value = '';
    changeField('');
    emit('prevStep');
};

const changeRepeatPassword = (value: string) => {
    v$.value.repeatPassword.$reset();
    repeatPassword.value = value;
}

const changeField = (value: string) => {
    console.log('изменили поле')
    v$.value.password.$reset();
    emit('updateValue', { field: 'password', value });
};

</script>