<template>
	<div
		:class="{
			[pictureSize]: true
		}"
	>
		<img
			:src="pictureSrc"
		>
	</div>
</template>
<script setup lang="ts">
import { PropType, defineProps, toRefs } from 'vue';

type PictureSize = 'small_avatar';

const props = defineProps({
	pictureSize: {
		type: String as PropType<PictureSize>,
		required: false,
		default: 'small_avatar',
	},
	pictureSrc: {
		type: String,
		required: false,
		default: 'https://www.litres.ru/static/users/100/00/06/78/02/88/44/678028844_40.jpg',
	},
});

const {
	pictureSize,
	pictureSrc,
} = toRefs(props);

</script>
