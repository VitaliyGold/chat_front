<template>
	<ui-shadow-container
		add-class="mt-4 ml-5 mr-5"
	>
		<user-actions
			:user-name="userName"
			:user-id="userId"
			:have-chat="haveChat"
			:chat-id="chatId"
		/>
	</ui-shadow-container>
</template>

<script setup lang="ts">
import { defineProps, toRefs, PropType } from 'vue';

import UserActions from '@/components/SmartUI/UserActions.vue';
import UiShadowContainer from '@/components/UI/UiShadowContainer.vue';

const props = defineProps({
	userName: {
		type: String,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
	haveChat: {
		type: Boolean,
		required: true,
	},
	chatId: {
		type: null as unknown as PropType<string | null>,
		required: true,
	},
});

const {
	userName,
	userId,
	haveChat,
	chatId,
} = toRefs(props);

</script>

<style scoped lang="less">

</style>
