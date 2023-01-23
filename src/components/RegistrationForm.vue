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
					v-model="formData.login"
					:validation-rule="v$.formData.login"
					@update:model-value="(value) => changeField('login', value)"
				/>
				<text-field-component
					label-text="Имя"
					v-model="formData.name"
					:validation-rule="v$.formData.name"
					@update:model-value="(value) => changeField('name', value)"
				/>
			</template>
			<template v-else>
				<text-field-component
					label-text="Пароль"
					v-model="formData.password"
					:validation-rule="v$.formData.password"
					type="password"
					@update:model-value="(value) => changeField('password', value)"
				/>
				<text-field-component
					label-text="Повторите пароль"
					v-model="confirmPassword"
					:validation-rule="v$.confirmPassword"
					type="password"
					@update:model-value="(value) => changeField('confirmPassword', value)"
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
import { useVuelidate } from '@vuelidate/core';
import {
	required, minLength, helpers, sameAs,
} from '@vuelidate/validators';
import { useRouter } from 'vue-router';

import { setJwtToken, setUserId } from '@/utils/jwt';
import AuthController from '@/api/auth';
import { RegistrationFormFields } from '@/types/auth';

import TextField from './UI/TextField.vue';

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

		const rules = computed(() => {
			if (mode.value === 'inputLogin') {
				return {
					formData: {
						login: {
							required: helpers.withMessage('Поле не может быть пустым', required),
							minLength: helpers.withMessage('Минимальная длина 3 символа', minLength(3)),
						},
						password: {},
						name: {
							required: helpers.withMessage('Поле не может быть пустым', required),
						},
					},
					confirmPassword: {},
				};
			}
			return {
				formData: {
					login: {},
					name: {},
					password: {
						required: helpers.withMessage('Поле не может быть пустым', required),
						minLength: helpers.withMessage('Минимальная длина 3 символа', minLength(3)),
						sameAs: helpers.withMessage('Минимальная длина 3 символа', sameAs(confirmPassword)),
					},
				},
				confirmPassword: {
					sameAs: helpers.withMessage('Пароли не совпадают', sameAs(formData.password)),
					required: helpers.withMessage('Поле не может быть пустым', required),
				},

			};
		});

		const v$ = useVuelidate(rules, { formData, confirmPassword });
		return {
			formData,
			confirmPassword,
			mode,
			changeField,
			changeMode,
			router,
			v$,
		};
	},
	methods: {
		async submit() {
			this.v$.$touch();
			if (this.v$.$error) {
				return;
			}
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
