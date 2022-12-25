<template>
    <div class="loader-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="xMidYMid"
            class="loader-icon"
        >
            <path d="M20 50A30 30 0 0 0 80 50A30 31 0 0 1 20 50" fill="#1b077b" stroke="none">
                <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50.5;360 50 50.5"></animateTransform>
            </path>
        </svg>
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Loader',
    setup() {
        
    },
})
</script>

<style lang="less">
.loader-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .loader-icon {
        display: flex;
        justify-content: center;
        width: 64px;
        height: 64px;
    }
}

</style>
