<template>
    <button 
        class="btn single-icon"
        @click="changeStateMenu"
    >
        <close-icon-component
            :size="36"
            class="icon-3x"
        />
    </button>
    <menu-component
        v-if="opened_menu"
    />
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue';
import CloseIcon from 'vue-material-design-icons/Menu.vue';
import Menu from './Menu.vue';

export default defineComponent({
    setup() {

        const opened_menu = ref(false);

        const changeStateMenu = () => {
            if (opened_menu.value) {
                opened_menu.value = false;
                return;
            };
            opened_menu.value = true;
        }


        return {
            opened_menu,
            changeStateMenu
        }
    },
    components: {
        'close-icon-component': CloseIcon,
        'menu-component': Menu
    }
})
</script>

<style lang="less" scoped>
    .btn.single-icon {
        position: absolute;
        right: 40px;
        bottom: 20px;
        width: 45px;
        height: 45px;
        .material-design-icon {
            .material-design-icon__svg {
                font-size: 3em;
            }
            
        }
    }

</style>