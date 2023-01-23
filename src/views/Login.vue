<template>
  <div class="login_page">
    <login-form-component />
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import LoginForm from '@/components/LoginForm.vue';

export default defineComponent({
	name: 'LoginPage',
	components: {
		'login-form-component': LoginForm,
	},

});

</script>

<style lang="less" scoped>

.login_page {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

</style>
