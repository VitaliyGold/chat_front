<template>
	<div
		class="loader-wrapper"
		:style="{ 
			height: sizeLoader, 
			width: sizeLoader
		}"
		:class="{
			'full': fullWindow
		}"
	>
		<loading-icon-component
			:size="size"
			:add-class="addClass"
		/>
	</div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import LoadingIcon from 'vue-material-design-icons/Loading.vue';

export default defineComponent({
	name: 'LoaderComponent',
	props: {
		size: {
			type: Number,
			required: false,
			default: 32,
		},
		addClass: {
			type: String,
			required: false,
			default: 'icon-2x',
		},
		fullWindow: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	components: {
		'loading-icon-component': LoadingIcon,
	},

	setup(props) {
		const containerViewBox = `0 0 ${props.size * 2} ${props.size * 2}`;
		const sizeLoader = props.fullWindow ? '100%' : `${props.size}px`;

		return {
			containerViewBox,
			sizeLoader,
		};
	},
});
</script>

<style lang="less">
.loader-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

	&.full {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 5;
		border-radius: 8px;
		background-color: rgba(255, 255, 255, 0.7);
	}

    .loading-icon {
        display: flex;
        justify-content: center;
		animation-name: rotation;
		animation-duration: 2.5s;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
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
