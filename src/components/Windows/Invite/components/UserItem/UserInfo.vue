<template>
	<div class="user-info">
		<p class="name">
			{{ name }}
		</p>
		<p class="description">
			{{ description }}
		</p>
	</div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: false,
		default: 'Дефолтное описание',
	},
});

const {
	name,
	description,
} = toRefs(props);

</script>

<style scoped lang="less">
    .user-info {
        padding: 0 8px;
        .name {
            font-weight: 600;
        }
        .description {
			margin-top: 4px;
            font-size: 12px;
            color: gray;
        }
    }

</style>
