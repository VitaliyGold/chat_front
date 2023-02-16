<template>
	<div class="auth-form">
		<ui-loader
			v-if="loading"
			:full-window="true"
		/>
		<p class="page-title">
			Войти в MyChat
		</p>
		<form
			@submit.prevent="loginSubmit"
		>
			<ui-text-input
				label-text="Логин"
				:value="loginFormData.login"
				:error="loginError"
				@update-value="(value: string) => changeField('login', value)"
			/>
			<ui-text-input
				label-text="Пароль"
				:value="loginFormData.password"
				:error="passwordError"
				@update-value="(value: string) => changeField('password', value)"
			/>
			<button-container
				direction="column"
			>
				<ui-button
					type="submit"
					:full-width="true"
				>
					Войти
				</ui-button>
				<ui-button
					type="button"
					variant="outlined"
					:full-width="true"
					@click="toRegistrationPage"
				>
					У меня еще нет MyChat ID
				</ui-button>
			</button-container>
		</form>
	</div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';
import { useRouter } from 'vue-router';

import AuthController from '@/api/auth';
import { setJwtToken, setUserId } from '@/utils/jwt';

import UiLoader from '@/components/UI/UiLoader.vue';
import UiTextInput from '@/components/UI/UiTextInput.vue';
import UiButton from '@/components/UI/UiButton.vue';
import ButtonContainer from '@/components/UI/ButtonContainer.vue';

const validationRules = {
	loginFormData: {
		login: {
			required: helpers.withMessage('Поле не может быть пустым', required),
			minLength: helpers.withMessage('Минимальная длина 3 символа', minLength(3)),
		},
		password: {
			required: helpers.withMessage('Поле не может быть пустым', required),
			minLength: helpers.withMessage('Минимальная длина 5 символов', minLength(5)),

		},
	},
};

const router = useRouter();

const incorrectAuthData = ref<boolean>(false);

const loading = ref<boolean>(false);

const loginFormData = reactive({
	login: '',
	password: '',
});

const v$ = useVuelidate(validationRules, { loginFormData });

const loginError = computed(() => {
	if (incorrectAuthData.value) {
		return {
			haveError: true,
			errorText: 'Некорректная связка логин/пароль',
		};
	}

	return v$.value.loginFormData.login.$errors.length
		? {
			haveError: true,
			errorText: v$.value.loginFormData.login.$errors[0].$message,
		}
		: undefined;
});

const passwordError = computed(() => {
	if (incorrectAuthData.value) {
		return {
			haveError: true,
			errorText: 'Некорректная связка логин/пароль',
		};
	}

	return v$.value.loginFormData.password.$errors.length
		? {
			haveError: true,
			errorText: v$.value.loginFormData.password.$errors[0].$message,
		}
		: undefined;
});

const changeField = (field: 'login' | 'password', value: string) => {
	incorrectAuthData.value = false;
	if (field === 'login') {
		loginFormData.login = value;
	} else {
		loginFormData.password = value;
	}
};

const loginSubmit = async () => {
	v$.value.$touch();
	if (v$.value.$errors.length) {
		return;
	}
	loading.value = true;
	try {
		const { data } = await AuthController.login(loginFormData);
		setJwtToken(data.token);
		setUserId(data.userId);
		router.push('/');
	} catch (e) {
		incorrectAuthData.value = true;
		loading.value = false;
		console.log(e);
	}
};

const toRegistrationPage = () => {
	router.push('/registration');
};

</script>

<style lang="less" scoped>
.auth-form {
	width: 400px;
	height: auto;
	padding: 20px;
	background-color: white;
	border-radius: 8px;
	transition: height 0.7s linear;
	position: relative;

	:deep(.input-wrapper) {
		margin-bottom: 20px;
	}

	.page-title {
		font-size: 24px;
		font-weight: 700;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

</style>
