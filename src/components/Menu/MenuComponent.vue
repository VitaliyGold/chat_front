<template>
  <ul>
    <li>
      <button
        class="btn single-icon"
        @click="openWindow('invite')"
      >
        <invite-icon-component
          :size="36"
          class="icon-3x"
        />
      </button>
    </li>
    <li>
      <button
        class="btn single-icon"
        @click="openWindow('settings')"
      >
        <settings-icon-component
          :size="36"
          class="icon-3x"
        />
      </button>
    </li>
  </ul>
</template>

<script lang='ts'>
import useWindows from '@/store/windows';
import { defineComponent } from 'vue';
import InviteIcon from 'vue-material-design-icons/AccountPlus.vue';
import SettingsIcon from 'vue-material-design-icons/Cog.vue';

export default defineComponent({
	name: 'MenuComponent',
	components: {
		'invite-icon-component': InviteIcon,
		'settings-icon-component': SettingsIcon,
	},
	setup(_, { emit }) {
		const windowsStore = useWindows();

		const openWindow = (type: 'invite' | 'settings') => {
			windowsStore.addWindow(type);
			emit('openWindow');
		};

		return {
			openWindow,
		};
	},
});

</script>

<style lang="less" scoped>
    ul {
        border: 1px solid black;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        background-color: white;
        position: absolute;
        list-style-type: none;
        right: 38px;
        bottom: 70px;
    }
</style>
