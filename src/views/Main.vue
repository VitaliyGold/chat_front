<template>
    <p>
        Это главная страница
        <router-link to="/registration">registration</router-link>
        <router-link to="/login">login</router-link>
    </p>
</template>

<script lang="ts">

import { defineComponent, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'

import { setJwtToken, setUserId } from '@/utils/jwt';

export default defineComponent({
  name: 'MainPage',
  setup() {
    const route = useRoute()
    const router = useRouter()

    onMounted(() => {
      console.log(route);
      console.log(router);
    })
  }

})

</script>
