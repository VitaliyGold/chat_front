<template>
  <div class="registration_page">
    <registration-form-component />
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import RegistrationForm from '@/components/RegistrationForm.vue';

export default defineComponent({
  name: 'RegistrationPage',
  components: {
    'registration-form-component': RegistrationForm
  }

})

</script>

<style lang="less" scoped>

.registration_page {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

</style>
