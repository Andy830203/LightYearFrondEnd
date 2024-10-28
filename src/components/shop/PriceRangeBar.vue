<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    maxPrice: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['priceChanged']);

// 初始化價格選擇條值為最大值
const price = ref(props.maxPrice);

// 監聽價格選擇條值變化
watch(price, (newPrice) => {
    emit('priceChanged', newPrice); // 當價格變化時發出事件
});
</script>

<template>
    <div class="col-lg-12">
        <div class="mb-3">
            <h4 class="mb-2">Price</h4>
            <input
                type="range"
                class="form-range w-100"
                min="0"
                :max="maxPrice"
                v-model="price"
            />
            <output>{{ price }}</output>
        </div>
    </div>
</template>