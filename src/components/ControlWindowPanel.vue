<template>
    <div class="header">
        <p class="window_name">
            Чатик с Виталием
        </p>
        <div class="btn-container">
            <button class="btn icon">
                <arrow-collapse-icon-component/>
            </button>
            <button class="btn icon">
                <close-icon-component/>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CloseIcon from 'vue-material-design-icons/Close.vue';
import ArrowCollapse from 'vue-material-design-icons/ArrowCollapse.vue';

export default defineComponent({
    name: 'ControlWindowPanel',
    components: {
        'close-icon-component': CloseIcon,
        'arrow-collapse-icon-component': ArrowCollapse
    }

})
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