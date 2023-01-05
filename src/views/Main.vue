<template>
    <loader-component
      v-if="loading"
    />
    <main-display-component
      v-else
    />
</template>

<script lang="ts">

import { defineComponent, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { setJwtToken, setUserId } from '@/utils/jwt';
import { getChats } from '@/api/chats';

import Loader from '@/components/ui-components/Loader.vue';
import MainDisplay from '@/components/MainDisplay.vue';

export default defineComponent({
  name: 'MainPage',
  setup() {
    const router = useRouter();

    let loading = ref(true);
    onMounted(async () => {
      try {
        const chatsData = await getChats();
        console.log(chatsData);
      } catch(e) {
        router.push('login')
      } finally {
        loading.value = false;
      }
    })

    return {
      loading
    }
  },
  components: {
    'loader-component': Loader,
    'main-display-component': MainDisplay
  }

})

</script>
