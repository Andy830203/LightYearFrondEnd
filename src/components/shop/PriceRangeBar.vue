<script setup>
import { ref, watch} from 'vue';

const props = defineProps({
    maxPrice: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['priceChanged']);

// 初始化價格選擇條值為最大值
const price = ref(0);

// 監聽價格選擇條值變化
watch(price, (newPrice) => {
    emit('priceChanged', newPrice); // 當價格變化時發出事件
});
</script>

<template>
    <div class="col-lg-12">
        <div class="mb-3">
            <output>{{ price }}</output>
            <h6 class="mb-2">元以上的商品</h6>
            <input
                type="range"
                class="form-range w-100"
                min="0"
                :max="maxPrice"
                v-model="price"
            />
            
        </div>
    </div>
</template>