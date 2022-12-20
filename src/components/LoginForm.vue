<template>
    <form class="auth-form" @submit.prevent="loginSubmit">
        <text-field-component
            labelText="Логин"
            v-model="login"
            :validationRule="v$.login"
            @update:modelValue="login = $event"
            
        />
        <text-field-component
            labelText="Пароль"
            v-model="password"
            :validationRule="v$.password"
            @update:modelValue="password = $event"
            
        />
        
        <button 
            type="submit"
            class="btn submit"
        >
            Авторизация
        </button>

        <router-link
            to="/registration"
            class="link auth"
            activeClass="link-active"
        >
            У меня нет аккаунта
        </router-link>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TextField from './ui-components/TextField.vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';
import type { Ref } from 'vue'

const rules = {
    login: {
        required: helpers.withMessage('Поле не может быть пустым', required),
        minLength: helpers.withMessage('Минимальная длина 3 символа', minLength(3)),
    },
    password: {
        required: helpers.withMessage('Поле не может быть пустым', required),
        minLength: helpers.withMessage('Минимальная длина 5 символов', minLength(5)),

    }
};

export default defineComponent({
    components: {
        'text-field-component': TextField
    },
    setup(_, context) {
        const login = ref('');
        const password = ref('');

        const v$ = useVuelidate(rules, { login, password });
        return {
            login,
            password,
            v$
        }
    },
    computed: {
        getLoginError(): string | Ref<string> {
            if (this.v$.login.$errors.length) {
                return this.v$.login.$errors[0].$message
            }
            return ''
        },
        getPasswordError(): string | Ref<string> {
            if (this.v$.password.$errors.length) {
                return this.v$.password.$errors[0].$message
            }
            return ''
        },
    },
    methods: {
        loginSubmit() {
            this.v$.$touch();
            if (this.v$.$error) {
                console.log('есть ошибки')
                return
            }
            console.log('ошибок нет')
        }
    }
    
})

</script>
