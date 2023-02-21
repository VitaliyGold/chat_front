<template>
	<div
		class="shadow-container"
		:class="addClass"
	>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { defineProps, toRef } from 'vue';

const props = defineProps({
	addClass: {
		type: String,
		required: false,
		default: '',
	},
});

const addClass = toRef(props, 'addClass');

</script>

<style scoped lang="less">
    .shadow-container {
        position: relative;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        border-radius: 4px;
        padding: 12px 20px;
    }
</style>
