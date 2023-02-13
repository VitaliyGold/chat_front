<template>
	<form
		class="auth-form"
		@submit.prevent="submit"
	>
		<div class="registration-inner-form">
			<button
				class="btn"
				v-if="mode === 'inputPassword'"
				@click="() => changeMode('inputLogin')"
			>
				Назад
			</button>
			<template v-if="mode === 'inputLogin'">
				<text-field-component
					label-text="Логин"
					value="formData.login"
					@updateValue="(value) => changeField('login', value)"
				/>
				<text-field-component
					label-text="Имя"
					value="formData.name"
					@updateValue="(value) => changeField('name', value)"
				/>
			</template>
			<template v-else>
				<text-field-component
					label-text="Пароль"
					value="formData.password"
					type="password"
					@updateValue="(value) => changeField('password', value)"
				/>
				<text-field-component
					label-text="Повторите пароль"
					value="confirmPassword"
					type="password"
					@updateValue="(value) => changeField('confirmPassword', value)"
				/>
			</template>

			<button
				type="submit"
				class="btn submit"
			>
				Регистрация
			</button>
		</div>
		<router-link
			to="/login"
			class="link auth"
			active-class="link-active"
		>
			У меня есть аккаунт
		</router-link>
	</form>
</template>

<script lang="ts">

import {
	defineComponent, ref, reactive, computed,
} from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';

import { setJwtToken, setUserId } from '@/utils/jwt';
import AuthController from '@/api/auth';
import { RegistrationFormFields } from '@/types/auth';

import TextField from '../UI/TextInputField.vue';

type FormMode = 'inputLogin' | 'inputPassword';

export default defineComponent({
	components: {
		'text-field-component': TextField,
	},
	setup() {
		const router = useRouter();
		const formData = reactive({
			login: '',
			name: '',
			password: '',
		});

		const formError = reactive({
			login: '',
			name: '',
			password: ''
		})

		const confirmPassword = ref('');

		const mode: Ref<FormMode> = ref('inputLogin');

		const changeField = (field: RegistrationFormFields, value: string) => {
			switch (field) {
			case 'login':
				formData.login = value;
				break;
			case 'name':
				formData.name = value;
				break;
			case 'password':
				formData.password = value;
				break;
			case 'confirmPassword':
				confirmPassword.value = value;
				break;
			default:
				break;
			}
		};

		const changeMode = (newMode: FormMode) => {
			mode.value = newMode;
		};
		return {
			formData,
			formError,
			confirmPassword,
			mode,
			changeField,
			changeMode,
			router
		};
	},
	methods: {
		async submit() {
			
			if (this.mode === 'inputLogin') {
				this.changeMode('inputPassword');
				return;
			}

			try {
				const { data } = await AuthController.registration(this.formData);
				setJwtToken(data.token);
				setUserId(data.userId);
			} catch (e) {
				console.log(e);
			}

			this.router.push('/');
		},
	},
});

</script>
