<template>
    <form class="auth-form" @submit.prevent="loginSubmit">
        <text-field-component
            labelText="Логин"
            v-model="login"
            :validationRule="v$.login"
            @update:modelValue="(value) => changeField('login', value)"
            
        />
        <text-field-component
            labelText="Пароль"
            v-model="password"
            :validationRule="v$.password"
            @update:modelValue="(value) => changeField('password', value)"
            
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
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';

import { LoginFormFields } from '@/types/auth';
import { login } from '@/api/auth';

import TextField from './ui-components/TextField.vue';

const rules = {
    login: {
        required: helpers.withMessage('Поле не может быть пустым', required),
        minLength: helpers.withMessage('Минимальная длина 3 символа', minLength(3)),
    },
    password: {
        required: helpers.withMessage('Поле не может быть пустым', required),
        minLength: helpers.withMessage('Минимальная длина 3 символов', minLength(3)),

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

        const changeField = (field: LoginFormFields, value: string) => {
            switch(field) {
                case 'login':
                    login.value = value;
                    break;
                case 'password':
                    password.value = value;
                    break;
            }
        };

        return {
            login,
            password,
            v$,
            changeField
        }

        
    },
    methods: {
        async loginSubmit() {
            this.v$.$touch();
            if (this.v$.$error) {
                return;
            }
            const data = await login({ login: this.login, password: this.password })
            console.log(data)
            
        }
    }
    
})

</script>
