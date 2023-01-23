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
    v-if="openedMenu"
    @openWindow="changeStateMenu"
  />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CloseIcon from 'vue-material-design-icons/Menu.vue';
import MenuComponent from '@/components/Menu/MenuComponent.vue';

export default defineComponent({
	name: 'MenuBtn',
	setup() {
		const openedMenu = ref(false);

		const changeStateMenu = () => {
			if (openedMenu.value) {
				openedMenu.value = false;
				return;
			}
			openedMenu.value = true;
		};

		return {
			openedMenu,
			changeStateMenu,
		};
	},
	components: {
		'close-icon-component': CloseIcon,
		'menu-component': MenuComponent,
	},
});
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
