<template>
	<div class="user-header">
		<ui-picture
			picture-src="https://funik.ru/wp-content/uploads/2018/10/Porody-koshek-s-priplyusnutoj-mordoj-foto-2.jpg"
			picture-size="profile_background"
		/>
		<profile-name
			:user-name="name"
		/>
	</div>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';

import UiPicture from '@/components/UI/UiPicture.vue';
import ProfileName from './ProfileName.vue';

const props = defineProps({
	name: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	isSelf: {
		type: Boolean,
		required: false,
		default: false,
	},
});

const {
	name,
	userId,
} = toRefs(props);

</script>

<style scoped lang="less">

.user-header {
    position: relative;
    width: 100%;
    height: 175px;
}
</style>
