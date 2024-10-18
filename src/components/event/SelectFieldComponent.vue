<script setup>
import { ref } from 'vue';

const props = defineProps({
    Type: String,
    Id: String,
    Label: String,
    LabelCol: Number,
    InputCol: Number,
    SpaceCol: Number
});

const model = defineModel();
</script>

<template>
    <div>
        <div class="col-3 offset-1">
            <label for="eveType" class="col-form-label">活動類別</label>
        </div>
        <div class="col-5">
            <!-- <input type="number" class="form-control" id="eveType"> -->
            <select class="form-select" name="" id="eveType">
                <option value="">type 1</option>
                <option value="">type 2</option>
                <option value="">type 3</option>
            </select>
        </div>
        <div class="col-3"></div>
    </div>
</template>

<style lang="css" scoped></style>