<template>
    <div class='message-input'>
        <div 
            contenteditable='true'
            @input='changeMessageField'
            class='editable-wrapper'
            ref='inputField'
            @focus="() => focusOnInput(true)"
            @blur="() => focusOnInput(false)"
            v-focus
        >
            <p 
                class="placeholder" 
                v-if="!displayPlaceholder"
            >
                Введите сообщение...
            </p>
        </div>
        <div class="">
            <button-component
                :btn-text="'Отправить'"
                :type="'medium'"
                @click="sendMessage"
            />
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref, computed, PropType } from 'vue';

import { createChat } from '@/api/chats';

import Button from '@/components/ui-components/Button.vue';
import { numberLiteralTypeAnnotation } from '@babel/types';

export default defineComponent({
    name: 'MessageInput',
    directives: {
        focus: {
            mounted(el) {
                el.focus()
            }
        }
    },
    props: {
        members: {
            required: true,
            type: Array as PropType<string[]>
        }
    },
    setup(props) {
        const inputValue = ref('');

        const inputFocus = ref(true);

        const inputRef = ref<HTMLElement | null>(null);

        const changeMessageField =  (e: Event) => {
            let target = e.target as HTMLInputElement;
            if (target && inputRef.value) {
                inputRef.value.innerHTML = target.innerHTML;
            }
        }

        const displayPlaceholder = computed(() => {
            return inputFocus.value || inputValue.value;
        })

        const focusOnInput = (focus : boolean) => {
            inputFocus.value = focus;
        }

        const sendMessage = async () => {

            const chatData = {
                members: props.members,
                chat_type: 1,
                start_message: inputValue.value
            }

            const chat = await createChat(chatData);

            console.log(chat);
            //console.log(`Отправить сообщение ${inputValue.value}`)
        }

        return {
            inputRef,
            inputValue,
            inputFocus,
            displayPlaceholder,
            changeMessageField,
            focusOnInput,
            sendMessage
        }
    },
    components: {
        'button-component': Button
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