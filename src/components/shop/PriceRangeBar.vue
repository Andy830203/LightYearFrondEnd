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
const price = ref(0);

// 監聽價格選擇條值變化
watch(price, (newPrice) => {
    emit('priceChanged', newPrice); // 當價格變化時發出事件
});
</script>

<template>
    <div class="price-slider-container">
        <output class="price-output">{{ price }} 元以上的商品</output>
        <input
            type="range"
            class="price-range"
            min="0"
            :max="maxPrice"
            v-model="price"
        />
    </div>
</template>

<style scoped>
/* 容器樣式 */
.price-slider-container {
    padding: 1rem;
    background-color: #f3eae0; /* 柔和的米色背景 */
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    max-width: 300px;
}

/* 價格輸出樣式 */
.price-output {
    font-size: 1rem;
    color: #4a4a4a; /* 深灰色文字 */
    font-weight: bold;
}

/* 滑桿樣式 */
.price-range {
    -webkit-appearance: none;
    width: 100%;
    height: 8px;
    background: #6b9d8f; /* 柔和的藍綠色 */
    border-radius: 5px;
    outline: none;
    transition: background 0.3s;
    cursor: pointer;
}

.price-range:hover {
    background: #4a7d6b; /* 懸停時的深藍綠色 */
}

/* 滑桿滑塊樣式 */
.price-range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    border: 2px solid #6b9d8f;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s;
}

.price-range::-webkit-slider-thumb:hover {
    transform: scale(1.2);
}

.price-range::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background-color: #ffffff;
    border: 2px solid #6b9d8f;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.2s;
}

.price-range::-moz-range-thumb:hover {
    transform: scale(1.2);
}
</style>
