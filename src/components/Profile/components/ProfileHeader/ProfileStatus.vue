<template>
	<div class="user-status">
		<span
			:title="`Пользователь ${online ? 'онлайн' : 'оффлайн'}`"
			class="status"
			:class="online ? 'online' : 'offline'"
		/>
	</div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

// сюда попозже прикручу прослушивание события из сокета;
const online = ref(true);

</script>

<style scoped lang="less">
    .user-status {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        .status {
            width: 20px;
            border-radius: 50%;
            border: 1px solid white;
            height: 20px;
            &.online {
                background-color: #009600;
            }
            &.offline {
                background-color: #848081;
            }
        }

    }

</style>
