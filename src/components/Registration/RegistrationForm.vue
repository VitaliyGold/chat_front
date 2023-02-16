<template>
	<div class="auth-form">
		<ui-loader
			v-if="loading"
			:full-window="true"
		/>
		<p class="page-title">
			Создать ID в MyChat
		</p>
		<login-step
			v-if="currentStep === 'login'"
			:login="registrationFormData.login"
			:name="registrationFormData.name"
			@update-value="updateFormData"
			@set-loading="setLoading"
			@next-step="() => changeStep('password')"
		/>
		<password-step
			v-else
			:password="registrationFormData.password"
			@update-value="updateFormData"
			@next-step="registration"
			@prev-step="() => changeStep('login')"
		/>
	</div>
</template>

<script lang="ts">

import { defineComponent, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

import { setJwtToken, setUserId } from '@/utils/jwt';
import AuthController from '@/api/auth';

import LoginStep from '@/components/Registration/components/LoginStep.vue';
import PasswordStep from '@/components/Registration/components/PasswordStep.vue';
import UiLoader from '@/components/UI/UiLoader.vue';

interface RegistrationFormData {
	login: string,
	name: string,
	password: string
}

interface UpdateFieldsData {
	field: keyof RegistrationFormData,
	value: string
}

type Step = 'login' | 'password';

export default defineComponent({
	components: {
		'login-step': LoginStep,
		'password-step': PasswordStep,
		'ui-loader': UiLoader,
	},
	setup() {
		const router = useRouter();

		const registrationFormData = reactive({
			login: '',
			name: '',
			password: '',
		});

		const currentStep = ref<Step>('login');

		const loading = ref<boolean>(false);

		const updateFormData = ({ field, value }: UpdateFieldsData) => {
			registrationFormData[field] = value;
		};
		const setLoading = (loadingState: boolean) => {
			loading.value = loadingState;
		};

		const changeStep = (step: Step) => {
			currentStep.value = step;
		};

		const registration = async () => {
			try {
				setLoading(true);
				const data = await AuthController.registration(registrationFormData);
				console.log(data);
				setJwtToken(data.token);
				setUserId(data.userId);
				router.push('/');
			} catch (e) {
				console.log(e);
			}
		};

		return {
			registrationFormData,
			loading,
			currentStep,
			updateFormData,
			changeStep,
			registration,
			setLoading,
		};
	},
});

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
