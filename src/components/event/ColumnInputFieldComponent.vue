<script setup>
import { ref } from 'vue';

const props = defineProps({
    Type: String,
    Id: String,
    Label: String,
    Indent: Boolean,
    LabelCol: Number,
    InputCol: Number,
    SpaceCol:Number
});

const model = defineModel();

// if Indent === true, AllCol === 11, else AllCol === 12
const LCol = ref(`col-${props.LabelCol}`);
const ICol = ref(`col-${props.InputCol}`);

if (props.SpaceCol === 0) {
    const SCol = ref(``);
} else {
    const SCol = ref(`col-${props.SpaceCol}`);
}

if (props.Indent === true) {
    const Offset = ref('offset-1');
}

</script>

<template>
    <div class="container">
        <div class="row">
            <div :class="LCol,Offset">
                <label for="eveFee" class="col-form-label">{{ Label }}</label>
            </div>
            <div :class="ICol">
                <input :type="Type" class="form-control" :id="Id" v-model="model">
            </div>
            <div :class="SCol"></div>
        </div>
        
    </div>
</template>

<style lang="css" scoped>

</style>