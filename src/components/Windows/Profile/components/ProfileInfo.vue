<template>
	<ui-shadow-container
		add-class="mt-4 ml-5 mr-5"
	>
		<p
			v-if="userDescription"
			class="info-item"
		>
			<label class="info-title">
				About me:
			</label>
			{{ userDescription }}
		</p>
		<p
			class="info-item"
		>
			<label class="info-title">
				Personal Link:
			</label>
			<ui-link
				:link="userLink"
			>
				{{ userLink }}
			</ui-link>
		</p>
	</ui-shadow-container>
</template>

<script setup lang="ts">
import { defineProps, toRefs } from 'vue';

import UiLink from '@/components/UI/UiLink.vue';
import UiShadowContainer from '@/components/UI/UiShadowContainer.vue';

const props = defineProps({
	userDescription: {
		type: String,
		required: false,
		default: 'Дефолтное описание',
	},
	userLink: {
		type: String,
		required: true,
	},
});

const {
	userDescription,
	userLink,
} = toRefs(props);

</script>

<style scoped lang="less">
    .profile-info {
        margin: 16px 20px 0 20px;
    }

    .info-item {
            font-size: 16px;
            .info-title {
                font-weight: 700
            }
        }
        .info-item + .info-item {
            margin-top: 10px;
        }
</style>
