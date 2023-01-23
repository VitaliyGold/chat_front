<template>
  <div>
    <loader-component
      :size="20"
      add-class="icon-2x"
      v-if="status === 'loading'"
    />
    <span v-else>
      Готово
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MessageStatus } from '@/types/message';
import LoaderComponent from '@/components/UI/LoaderComponent.vue';

export default defineComponent({
	props: {
		status: {
			required: true,
			type: String as PropType<MessageStatus>,
		},
	},
	components: {
		'loader-component': LoaderComponent,
	},
});
</script>
