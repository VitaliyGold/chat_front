<template>
	<div class="registration-form">
		<ui-loader
            v-if="loading"
			:full-window="true"
        />
		<p class="page-title">
            Войти в MyChat
        </p>
		<login-step
			:login="registrationFormData.login"
			:name="registrationFormData.name"
			@updateValue="updateFormData"
			@setLoading="setLoading"
		/>
	</div>
</template>

<script lang="ts">

import { defineComponent, reactive, ref } from 'vue';

import LoginStep from '@/components/Registration/components/LoginStep.vue';
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


export default defineComponent({
	components: {
		'login-step': LoginStep,
		'ui-loader': UiLoader
	},
	setup() {
		const registrationFormData = reactive({
			login: '',
			name: '',
			password: ''
		});

		const loading = ref<boolean>(false);

		const updateFormData = ({ field, value }: UpdateFieldsData) => {
			registrationFormData[field] = value;
		};
		const setLoading = (loadingState: boolean) => {
			loading.value = loadingState;
		};

		return {
			registrationFormData,
			loading,
			updateFormData,
			setLoading
		};
		
	}
});

</script>

<style scoped lang="less">
.registration-form {
	width: 400px;
	height: auto;
	padding: 20px;
	background-color: white;
	border-radius: 8px;
	transition: height 0.7s linear;
	position: relative;
	.page-title {
		font-size: 24px;
		font-weight: 700;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

.registration-form::v-deep .input-wrapper {
		margin-bottom: 20px;
	}
</style>
