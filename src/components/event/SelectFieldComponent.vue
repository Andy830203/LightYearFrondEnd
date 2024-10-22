<script setup>
import { ref } from 'vue';

const props = defineProps({
    Id: String,
    Label: String,
    LabelCol: Number,
    InputCol: Number,
    SpaceCol: Number
});

const items = defineModel();
</script>

<template>
    <div>
        <div class="col-3 offset-1">
            <label :for="Id" class="col-form-label">{{ Label }}</label>
        </div>
        <div class="col-5">
            <!-- <input type="number" class="form-control" id="eveType"> -->
            <select class="form-select" name="" :id="Id">
                <option v-for="item in items" :value="item">{{ item }}</option>
            </select>
        </div>
        <div class="col-3"></div>
    </div>
</template>

<style lang="css" scoped></style>