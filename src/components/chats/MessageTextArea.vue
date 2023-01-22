<template>
    <div class='message-textarea'>
        <div
            contenteditable='true'
            @input='changeMessageField'
            class='textarea'
            ref='inputRef'
            v-once
            v-html="messageValue"
            @focus="() => focusOnInput(true)"
            @blur="() => focusOnInput(false)"
            v-focus
        >

        </div>
        <p
            class="placeholder"
            v-if="displayPlaceholder"
        >
            Введите сообщение...
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

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
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['changeValue'],
  setup(props, { emit }) {
    const inputFocus = ref(true);

    const messageValue = ref(props.modelValue);

    const changeMessageField = (e: Event) => {
      const target = e.target as HTMLInputElement;
      if (target) {
        messageValue.value = target.innerHTML;
      }
      emit('changeValue', target.innerHTML);
    };

    const focusOnInput = (focus : boolean) => {
      inputFocus.value = focus;
    };

    const displayPlaceholder = computed(() => {
      if (messageValue.value) {
        return false;
      }
      return !inputFocus.value;
    });

    return {
      messageValue,
      inputFocus,
      displayPlaceholder,
      focusOnInput,
      changeMessageField,
    };
  },
});

</script>

<style scoped lang="less">

.message-textarea {
    position: relative;
    .placeholder {
        position: absolute;
        top: 8px;
        left: 8px;
    }

    .textarea {
        outline: 1px solid blue;
        padding: 8px;
        height: 80px;
        border: 1px solid gray;
    }
}

</style>
