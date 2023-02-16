<template>
	<router-link
		:to="to"
		class="link"
		:class="customClass"
		active-class="link-active"
	>
		<slot />
	</router-link>
</template>

<script lang="ts">

import { PropType, defineComponent } from 'vue';

export default defineComponent({
	name: 'UiLink',
	props: {
		link: {
			type: String as PropType<string>,
			required: true,
		},
		addClass: {
			type: String as PropType<string>,
			required: false,
			default: '',
		},
	},
	setup(props) {
		return {
			to: props.link,
			customClass: props.addClass,
		};
	},
});

</script>
