<template>
    <div class='message-input'>
        <div 
            contenteditable='true'
            @input='changeMessageField'
            class='editable-wrapper'
            ref='input_field'
            @focus="() => focusOnInput(true)"
            @blur="() => focusOnInput(false)"
            v-focus
        >
            <p 
                class="placeholder" 
                v-if="!display_placeholder"
            >
                Введите сообщение...
            </p>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed } from 'vue';


export default defineComponent({
    name: 'MessageInput',
    directives: {
        focus: {
            mounted(el) {
                el.focus()
            }
        }
    },
    setup() {
        const input_value = ref('');

        const input_focus = ref(true);

        const input_ref = ref<HTMLElement | null>(null);

        const changeMessageField =  (e: Event) => {
            let target = e.target as HTMLInputElement;
            if (target && input_ref.value) {
                input_ref.value.innerHTML = target.innerHTML;
            }
        }

        const display_placeholder = computed(() => {
            return input_focus.value || input_value.value;
        })

        const focusOnInput = (focus : boolean) => {
            input_focus.value = focus;
        }

        return {
            input_ref,
            input_value,
            input_focus,
            display_placeholder,
            changeMessageField,
            focusOnInput
        }
    }

})

</script>

<style scoped lang="less">


.message-input {
    .editable-wrapper {
        height: 80px;
        width: 100%;
        overflow-y: auto;
        border: 1px solid black;
        padding: 10px;
        position: relative;
    }
}

</style>