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

import Loader from '@/components/ui-components/Loader.vue';
import MainDisplay from '@/components/MainDisplay.vue';
import { getProfile } from '@/api/profile';
import useProfile from '@/store/profile';


export default defineComponent({
  name: 'MainPage',
  setup() {
    const router = useRouter();
    const profile_store = useProfile();


    let loading = ref(true);
    onMounted(async () => {
      try {

        const user_profile = await getProfile();

        console.log(user_profile);

        profile_store.fillUserProfile(user_profile);

        
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
