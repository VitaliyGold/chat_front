<template>
  <button
    class="btn"
    :class="type"
  >
    {{ btnText }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'ButtonComponent',
	props: {
		btnText: {
			type: String,
			required: false,
		},
		type: {
			type: String,
			required: false,
		},
	},
	setup(_, { emit }) {
		const clickFunction = () => {
			emit('click');
		};

		return {
			clickFunction,
		};
	},
});

</script>

<style scoped lang="less">

.btn {
    cursor: pointer;
    padding: 6px 8px;
    border: none;
    border-radius: 5px;
    &.medium {
        width: 135px;
        height: 34px;
    }
    &.action-panel-btn {
        width: 50px;
        height: 50px;
        display: flex;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
    }
    &.icon {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: inherit;
        height: 24px;
        &:hover {
            background-color: gray;
            .material-design-icon__svg {
                color: white;
            }
        }
    }
    &.single-icon {
        background: transparent;
        padding: 0;
        display: flex;
        justify-content: center;
        &:hover {
            background-color: gray;
            .material-design-icon__svg {
                color: white;
            }
        }
    }
}

</style>
