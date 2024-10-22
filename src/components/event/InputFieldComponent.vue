<script setup>
import { ref } from 'vue';

const props = defineProps({
    Type: String,
    Id: String,
    Label: String
})

const model = defineModel()
</script>

<template>
    <div>
        <label :for="Id" class="mb-2 form-label">{{ Label }}</label>
        <input :type="Type" :id="Id" class="form-control" :name="Id" v-model="model">
    </div>
</template>

<style lang="css" scoped>

</style>