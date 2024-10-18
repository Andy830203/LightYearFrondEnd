<script setup>
import { ref } from 'vue';


let eData = {
    'id': 0,
    'eventName': 'title',
    'fee': '300',
    'eventPeriods': [
        { 'name': '第一梯次', 'time': '20240801-00:00:00' },
        { 'name': '第二梯次', 'time': '20240802-00:00:00' },
        { 'name': '第三梯次', 'time': '20240803-00:00:00' },
    ]
};

const eventData = ref(eData);

</script>

<template>
    <div class="mt-3 container">
        <form>
            <div class="d-flex justify-content-around w-25">
                <h2>{{ eventData.eventName }}</h2>
                <select :name="eventData.eventName" :id="eventData.id">
                    <option v-for="period in eventData.eventPeriods" :value="period.time">
                        {{ period.name }}
                    </option>
                </select>
            </div>
            <div class="col-6 offset-3">
                <div class="box"></div>
            </div>

        </form>
    </div>
</template>

<style lang="css" scoped>
.box {
    border: 1px solid salmon;
    height: 100px;
}
</style>