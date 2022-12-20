<template>
    <p>
        Это главная страница
        <router-link to="/registration">registration</router-link>
        <router-link to="/login">login</router-link>
    </p>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainPage'

})

</script>
