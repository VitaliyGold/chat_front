<template>
    <loader-component/>
</template>

<script lang="ts">

import { defineComponent, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'

import { setJwtToken, setUserId } from '@/utils/jwt';

import Loader from '@/components/ui-components/Loader.vue';

export default defineComponent({
  name: 'MainPage',
  setup() {
    const route = useRoute()
    const router = useRouter()

    onMounted(() => {
      console.log(route);
      console.log(router);
    })
  },
  components: {
    'loader-component': Loader
  }

})

</script>
