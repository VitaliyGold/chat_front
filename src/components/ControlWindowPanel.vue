<template>
  <div class="header">
    <p class="window_name">
      {{ window_name }}
    </p>
    <div class="btn-container">
      <button
        class="btn icon"
        @click="hideWindow"
      >
        <arrow-collapse-icon-component />
      </button>
      <button
        class="btn icon"
        @click="closeWindow"
      >
        <close-icon-component />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CloseIcon from 'vue-material-design-icons/Close.vue';
import ArrowCollapse from 'vue-material-design-icons/ArrowCollapse.vue';
import useWindows from '@/store/windows';

export default defineComponent({
	name: 'ControlWindowPanel',
	props: {
		windowId: {
			type: String,
			required: true,
		},
		windowName: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const store = useWindows();

		const closeWindow = () => {
			store.closeWindow(props.windowId);
		};
		const hideWindow = () => {
			store.hideWindow(props.windowId);
		};
		return {
			closeWindow,
			hideWindow,
		};
	},
	components: {
		'close-icon-component': CloseIcon,
		'arrow-collapse-icon-component': ArrowCollapse,
	},

});
</script>

<style scoped lang="less">

.header {
    padding: 5px 10px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid gray;
    align-items: center;
}

.window_name {

}

</style>
