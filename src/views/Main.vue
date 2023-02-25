<template>
	<error-boundary-component>
		<main-display-component />
	</error-boundary-component>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

import MainDisplay from '@/components/MainLayout/MainDisplay.vue';
import ErrorBoundary from '@/components/MainLayout/ErrorBoundary.vue';

export default defineComponent({
	name: 'MainPage',
	components: {
		'main-display-component': MainDisplay,
		'error-boundary-component': ErrorBoundary,
	},

});

</script>
