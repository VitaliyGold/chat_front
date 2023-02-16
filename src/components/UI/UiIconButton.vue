<template>
	<button
		class="icon-button"
		@click="clickFunction"
	>
		<component :is="componentIcon" />
	</button>
</template>

<script setup lang="ts">
import {
	ref, defineProps, PropType, markRaw, defineEmits,
} from 'vue';

import CloseIcon from 'vue-material-design-icons/Close.vue';
import ArrowCollapse from 'vue-material-design-icons/ArrowCollapse.vue';

interface Emits {
    (e: 'click'): void
}

const Icons = {
	close: CloseIcon,
	arrowCollapse: ArrowCollapse,
};

const emit = defineEmits<Emits>();

const props = defineProps({
	iconType: {
		type: String as PropType<keyof typeof Icons>,
		required: true,
	},
});

const componentIcon = ref<null | object>(null);

componentIcon.value = markRaw(Icons[props.iconType] ?? CloseIcon);

const clickFunction = () => {
	emit('click');
};

</script>

<style scoped lang="less">
    .icon-button {
        background-color: transparent;
        width: 32px;
        height: 32px;
        border: none;
        display: flex;
        justify-content: center;
        cursor: pointer;
        border-radius: 4px;
        &:hover {
            background-color: #e7e7eb;
        }
        :deep(.material-design-icon) {
            width: 32px;
            height: 32px;
            font-size: 20px;
        }
    }
</style>
