<script setup>
import { ref } from 'vue';

// 定義價格範圍的值
const price = ref(0);
</script>

<template>
    <div class="col-lg-12">
        <div class="mb-3">
            <h4 class="mb-2">Price</h4>
            <input
                type="range"
                class="form-range w-100"
                id="rangeInput"
                name="rangeInput"
                min="0"
                max="500"
                v-model="price"
            />
            <!-- :max="maxPrice"動態調整max -->
            <output id="amount" name="amount">{{ price }}</output>
        </div>
    </div>
</template>

<style scoped>
</style>