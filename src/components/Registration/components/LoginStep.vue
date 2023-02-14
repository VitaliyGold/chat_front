<template>
    <form @submit="submitLoginStep">
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
    </form>
</template>

<script lang="ts">
import { defineComponent, toRefs, PropType, computed } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

import AuthController from '@/api/auth';

import TextInputField from '@/components/UI/TextInputField.vue';

type FieldsType = 'login' | 'name';


const validationRules = {
	login: {
		required,
		minLength: minLength(3)
	},
	name: {
		required,
		minLength: minLength(3)
	}
}

export default defineComponent({
    name: 'LoginStep',
    components: {
        'text-input-field': TextInputField
    },
    props: {
        login: {
            type: String as PropType<string>,
            required: true
        },
        name: {
            type: String as PropType<string>,
            required: true
        }
    },
    setup(props, { emit }) {

        const {
            login,
            name,
        } = toRefs(props);

		const v$ = useVuelidate(validationRules, { login, name });

        const checkLogin = async () => {
            try {
                const result = AuthController.checkLogin(login.value);
                return result; 
            } catch(e) {
                console.log(e)
            };
        };

        const loginError = computed(() => {
			if (!v$.value.login.$invalid) {
				return '';
			} else if ()
			console.log(v$.value.);
		});

        const changeField = (value: string, field: FieldsType) => {
            emit('updateValue', { field, value });
        };

        return {
            login,
            name,
			v$,
            changeField
        }


    }
})

</script>