<template>
	<router-link
		:to="link"
		class="link"
		active-class="link-active"
	>
		<slot />
	</router-link>
</template>

<script setup lang="ts">

import { defineProps, toRef } from 'vue';

const props = defineProps({
	link: {
		type: String,
		required: true,
	},
});

const link = toRef(props, 'link');

</script>
<style scoped lang="less">
	.link {
		color: #005bff;
		text-decoration: none;
		&:hover {
			color: #0050e0;
		}
	}
</style>
