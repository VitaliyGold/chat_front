<template>
<svg :class="iconClass" xmlns="http://www.w3.org/2000/svg">
    <title v-if="title">{{ title }}</title>
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink"/>
</svg>
</template>
  
<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
    name: 'svg-icon',
    props: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            default: null,
            required: false
        }
    },
    setup(props, _) {
        const iconPath = computed(() => {
            let icon = require(`@/assets/svg/loader.svg`);
            console.log(icon)
            if (Object.prototype.hasOwnProperty.call(icon, 'default')) {
                icon = icon.default;
            }
            return icon.url;
        })

        const iconClass = computed(() => 'svg-icon svg-icon--' + props.name);
        return {
            iconPath,
            iconClass
        }
    }
});
  </script>
  
  <style>
    .svg-icon {
      fill: currentColor;
      height: 64px;
      width: 64px;
    }
  </style>