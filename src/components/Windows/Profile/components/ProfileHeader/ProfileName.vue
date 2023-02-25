<template>
	<div class="user-name">
		<p>{{ userName }}</p>
		<profile-status />
	</div>
</template>

<script setup lang="ts">
import { defineProps, toRef } from 'vue';

import ProfileStatus from './ProfileStatus.vue';

const props = defineProps({
	userName: {
		type: String,
		required: true,
	},
});

const userName = toRef(props, 'userName');

</script>

<style>
    .user-name {
        padding: 5px;
        background-color: black;
        border-radius: 0 5px 0 0;
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 24px;
        color: white;
        display: flex;
    }

</style>
