<template>
    <div class="loader-wrapper"
        :style="{ height: sizeLoader, width: sizeLoader }"
    >
        <loading-icon-component
            :size="size"
            :addClass="'addClass'"
        />
    </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import Loading from 'vue-material-design-icons/Loading.vue';

export default defineComponent({
    name: 'Loader',
    props: {
        size: {
            type: Number,
            required: false,
            default: 32
        },
        addClass: {
            type: String,
            required: false,
            default: 'icon-2x'
        }
    },
    components: {
        'loading-icon-component': Loading
    },
    
    setup({ size }) {
        const containerViewBox = `0 0 ${size * 2} ${size * 2}`;
        const sizeLoader = `${size}px`;
        
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
    animation-name: rotation;
    animation-duration: 2.5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    
    .loader-icon {
        display: flex;
        justify-content: center;
    }
}

@keyframes rotation {
    0% {
        transform:rotate(0deg);
    }
    100% {
        transform:rotate(360deg);
    }
    }

</style>
