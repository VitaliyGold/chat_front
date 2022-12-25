<template>
    <loader-component
      v-if="loading"
    />
    <p v-else>
      Данные в наличии
    </p>
</template>

<script lang="ts">

import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { setJwtToken, setUserId } from '@/utils/jwt';
import { getChats } from '@/api/chats';

import Loader from '@/components/ui-components/Loader.vue';

export default defineComponent({
  name: 'MainPage',
  setup() {
    const router = useRouter();

    let loading = ref(true);

    onMounted(async () => {

      try {
        const chatsData = await getChats();
        console.log(chatsData);

        loading.value = false;
      } catch(e) {
        router.push('login')
      }
      

      
      //console.log(route);
      //console.log(router);
    })

    return {
      loading
    }
  },
  components: {
    'loader-component': Loader
  }

})

</script>
