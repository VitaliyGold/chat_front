<template>
	<form
		class="auth-form"
		@submit.prevent="loginSubmit"
	>
		<text-field-component
			label-text="Логин"
			value="login"
			:validation-rule="v$.login"
			@updateValue="(value) => changeField('login', value)"
		/>
		<text-field-component
			label-text="Пароль"
			value="password"
			:validation-rule="v$.password"
			@updateValue="(value) => changeField('password', value)"
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
			active-class="link-active"
		>
			У меня нет аккаунта
		</router-link>
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';
import { useRouter } from 'vue-router';

import { LoginFormFields } from '@/types/auth';
import AuthController from '@/api/auth';
import { setJwtToken, setUserId } from '@/utils/jwt';

import TextField from '@/components/UI/TextField.vue';

const rules = {
	login: {
		required: helpers.withMessage('Поле не может быть пустым', required),
		minLength: helpers.withMessage('Минимальная длина 3 символа', minLength(3)),
	},
	password: {
		required: helpers.withMessage('Поле не может быть пустым', required),
		minLength: helpers.withMessage('Минимальная длина 3 символов', minLength(3)),

	},
};

export default defineComponent({
	components: {
		'text-field-component': TextField,
	},
	setup() {
		const router = useRouter();

		const login = ref('kysko3');
		const password = ref('123456');

		const v$ = useVuelidate(rules, { login, password });

		const changeField = (field: LoginFormFields, value: string) => {
			switch (field) {
			case 'login':
				login.value = value;
				break;
			case 'password':
				password.value = value;
				break;
			default:
				break;
			}
		};

		return {
			login,
			password,
			v$,
			router,
			changeField,
		};
	},
	methods: {
		async loginSubmit() {
			this.v$.$touch();
			if (this.v$.$error) {
				return;
			}
			const formData = {
				login: this.login,
				password: this.password,
			};

			try {
				const { data } = await AuthController.login(formData);
				setJwtToken(data.token);
				setUserId(data.userId);
				this.router.push('/');
			} catch (e) {
				console.log(e);
			}
		},
	},

});

</script>
