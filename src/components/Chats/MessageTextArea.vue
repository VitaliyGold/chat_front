<template>
	<div
		class="message-textarea"
		@click="() => focusOnInput(true)"
	>
		<div
			contenteditable="true"
			@input="changeMessageField"
			class="textarea"
			ref="inputRef"
			v-once
			v-html="inputValue"
			@focus="() => focusOnInput(true)"
			@blur="() => focusOnInput(false)"
			@keydown.enter.prevent="submitMessage"
			v-focus
		/>
	</div>
</template>

<script lang="ts">
import {
	defineComponent, computed, ref, watch,
} from 'vue';

export default defineComponent({
	name: 'MessageTextArea',
	directives: {
		focus: {
			mounted(el) {
				el.focus();
			},
		},
	},
	props: {
		messageText: {
			type: String,
			required: true,
		},
	},
	emits: ['change-value', 'submit'],
	setup(props, { emit }) {
		const inputRef = ref<null | HTMLElement>(null);

		watch(() => props.messageText, (newValue) => {
			if (newValue === '' && inputRef.value) {
				inputRef.value!.innerHTML = '';
			}
		});

		const inputFocus = ref(true);

		const changeMessageField = (e: Event) => {
			const target = e.target as HTMLInputElement;
			emit('change-value', target.innerHTML);
		};

		const focusOnInput = (focus : boolean) => {
			inputFocus.value = focus;
		};

		const submitMessage = () => {
			emit('submit');
		};

		const displayPlaceholder = computed(() => {
			if (props.messageText) {
				return false;
			}
			return !inputFocus.value;
		});

		return {
			inputValue: props.messageText,
			inputFocus,
			inputRef,
			displayPlaceholder,
			focusOnInput,
			submitMessage,
			changeMessageField,
		};
	},
});

</script>

<style scoped lang="less">

.message-textarea {

    .textarea {
        outline: 1px solid blue;
        padding: 8px;
        height: 80px;
        border: 1px solid gray;
		position: relative;
		&:empty:not(:focus)::before {
			content: 'Введите сообщение...';
			color: gray;
			position: absolute;
			left: 8px;
			right: 8px;
		}
    }
}

</style>
