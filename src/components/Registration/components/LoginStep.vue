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
import { defineComponent, toRefs, PropType } from 'vue';

import AuthController from '@/api/auth';

import TextInputField from '@/components/UI/TextInputField.vue';

type FieldsType = 'login' | 'name';


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

        const checkLogin = async () => {
            try {
                const result = AuthController.checkLogin(login);
                return result; 
            } catch(e) {
                console.log(e)
            };
        };

        const validationData = () => {
            
        };

        const submitLoginStep = async () => {



        };

        const changeField = (value: string, field: FieldsType) => {
            emit('updateValue', { field, value });
        };

        return {
            login,
            name,
            changeField
        }


    }
})

</script>