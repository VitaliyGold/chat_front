<template>
	<form @submit.prevent="submitLoginStep">
		<ui-text-input
			label-text="Логин"
			:value="login"
			:error="loginError"
			@update-value="(value: string) => changeField('login', value)"
		/>
		<ui-text-input
			label-text="Имя"
			:value="name"
			:error="nameError"
			@update-value="(value: string) => changeField('name', value)"
		/>
		<button-container
			direction="column"
		>
			<ui-button
				type="submit"
				:full-width="true"
			>
				Далее
			</ui-button>
			<ui-button
				type="button"
				variant="outlined"
				:full-width="true"
				@click="toLoginPage"
			>
				У меня уже есть id
			</ui-button>
		</button-container>
	</form>
</template>

<script lang="ts" setup>
import {
	toRefs, computed, defineEmits, defineProps, ref,
} from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, minLength, helpers } from '@vuelidate/validators';
import { useRouter } from 'vue-router';

import AuthController from '@/api/auth';

import UiTextInput from '@/components/UI/UiTextInput.vue';
import UiButton from '@/components/UI/UiButton.vue';
import ButtonContainer from '@/components/UI/ButtonContainer.vue';

type FieldsType = 'login' | 'name';

const validationRules = {
	login: {
		required: helpers.withMessage('Это обязательное поле', required),
		minLength: helpers.withMessage(({ $params }) => `Минимальная длина ${$params.min} символа`, minLength(3)),
	},
	name: {
		required: helpers.withMessage('Это обязательное поле', required),
		minLength: helpers.withMessage(({ $params }) => `Минимальная длина ${$params.min} символа`, minLength(3)),
	},
};

interface Emits {
    (e: 'updateValue', data: { field: FieldsType, value: string }): void
    (e: 'nextStep'): void,
    (e: 'setLoading', data: boolean): void;
}

const props = defineProps({
	login: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
});

const emit = defineEmits<Emits>();

const router = useRouter();

const { login, name } = toRefs(props);

const isUniqueLogin = ref<boolean>(true);

const v$ = useVuelidate(validationRules, { login, name });

const checkLogin = async () => {
	try {
		const result = AuthController.checkLogin(login.value);
		return result;
	} catch (e) {
		console.log(e);
		return false;
	}
};

const submitLoginStep = async () => {
	v$.value.$touch();
	if (v$.value.$errors.length) {
		return;
	}
	emit('setLoading', true);
	const result = await checkLogin();
	if (result) {
		emit('setLoading', false);
		emit('nextStep');
	} else {
		emit('setLoading', false);
		isUniqueLogin.value = false;
	}
};

const loginError = computed(() => {
	if (!isUniqueLogin.value) {
		return {
			haveError: true,
			errorText: 'Такой логин уже используется',
		};
	}

	return v$.value.login.$errors.length
		? {
			haveError: true,
			errorText: v$.value.login.$errors[0].$message,
		}
		:		undefined;
});

const nameError = computed(() => (v$.value.name.$errors.length
	? {
		haveError: true,
		errorText: v$.value.name.$errors[0].$message,
	}
	:	undefined));

const toLoginPage = () => {
	router.push('/login');
};

const changeField = (field: FieldsType, value: string) => {
	v$.value[field].$reset();
	isUniqueLogin.value = true;
	emit('updateValue', { field, value });
};

</script>
