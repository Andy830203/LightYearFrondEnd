<script setup>
import { ref, watch } from 'vue';

// Define the maxPrice prop from the parent
const props = defineProps({
    maxPrice: {
        type: Number,
        default: 500 // Default maximum
    }
});

// Set the initial price to the maxPrice
const price = ref(props.maxPrice);

// Watch for changes in maxPrice and set price to max when maxPrice updates
watch(() => props.maxPrice, (newMaxPrice) => {
    price.value = newMaxPrice;
});
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
                :max="maxPrice"
                v-model="price"
            />
            <output id="amount" name="amount">{{ price }}</output>
        </div>
    </div>
</template>

<style scoped>
</style>