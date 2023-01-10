<template>
    <div class="message-input">
        <div 
            contenteditable="true"
            @input="changeInputValue"
        >
            {{ input_value }}
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';


export default defineComponent({
    name: 'MessageInput',
    setup() {
        const input_value = ref('');

        const changeInputValue = (e: Event) => {
            console.log(e.target)
        }

        return {
            input_value,
            changeInputValue
        }
    }

})

</script>