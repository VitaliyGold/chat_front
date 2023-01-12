<template>
    <div class="loader-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink" 
            :viewBox="containerViewBox" 
            preserveAspectRatio="xMidYMid"
            class="loader-icon"
            :style="{ height: sizeLoader, width: sizeLoader }"
        >
            <path d="M20 50A30 30 0 0 0 80 50A30 31 0 0 1 20 50" fill="#1b077b" stroke="none">
                <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50.5;360 50 50.5"></animateTransform>
            </path>
        </svg>
    </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue'

interface SizeProps {
    size: number,
}

export default defineComponent({
    name: 'Loader',
    
    setup({ size } : SizeProps) {
        const containerViewBox = `0 0 ${size * 2} ${size * 2}`;
        const sizeLoader = `${size} px`;
        
        return {
            containerViewBox,
            sizeLoader
        }

    }
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
    }
}

</style>
