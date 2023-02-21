<template>
	<div
		:class="{
			[pictureSize]: true
		}"
	>
		<img
			class="picture"
			:src="pictureSrc"
		>
	</div>
</template>
<script setup lang="ts">
import { PropType, defineProps, toRefs } from 'vue';

type PictureSize = 'small_avatar' | 'profile_background';

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

<style scoped lang="less">
	.picture {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.small_avatar {
		width: 50px;
    	height: 50px;
	}
	.profile_background {
		width: 100%;
		height: 100%;
	}

</style>
