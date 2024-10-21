<script setup>
import ColumnInputFieldComponent from '@/components/event/ColumnInputFieldComponent.vue';
import InputFieldComponent from '@/components/event/InputFieldComponent.vue';
import { ref } from 'vue';


let eData = {
    'id': 0,
    'eventName': 'title',
    'fee': '300',
    'eventPeriods': [
        { 'name': '第一梯次', 'time': '20240801-00:00:00' },
        { 'name': '第二梯次', 'time': '20240802-00:00:00' },
        { 'name': '第三梯次', 'time': '20240803-00:00:00' },
    ],
    'description': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id dapibus elit. Morbi quis felis quis neque sagittis luctus vel nec lacus. Suspendisse quis ipsum gravida, ultricies ante vitae, dictum sem. Integer laoreet felis et sollicitudin congue. Nunc et lectus venenatis, mollis massa a, imperdiet ipsum. Curabitur sit amet sem a velit accumsan vehicula. In sed tempus arcu. Cras finibus ac nunc at dapibus. Sed ex augue, condimentum sed finibus eget, fermentum nec tellus.'
};

const eventData = ref(eData);

</script>

<template>
    <div class="mt-3 container">
        <form>
            <div class="d-flex">
                <div class="w-25">
                    <div class="d-flex justify-content-around">
                        <h2>{{ eventData.eventName }}</h2>
                        <select :name="eventData.eventName" :id="eventData.id">
                            <option v-for="period in eventData.eventPeriods" :value="period.time">
                                {{ period.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="w-75">
                    <div class="d-flex justify-content-center">
                        <img src="/images/non-found.jpg" alt="">
                    </div>
                </div>
            </div>

            <div class="row g-3">
                <div class="col-12">
                    <input class="ms-3" type="checkbox" name="test" id=""> 同會員資料
                </div>
                <div class="col-6">
                    <ColumnInputFieldComponent Type="text" Id="" Label="身分證字號" LabelCol="3" InputCol="8">
                    </ColumnInputFieldComponent>
                </div>
                <div class="col-6">
                    <ColumnInputFieldComponent Type="text" Id="" Label="電話" LabelCol="2" InputCol="8">
                    </ColumnInputFieldComponent>
                </div>
                <div class="col-12">
                    <ColumnInputFieldComponent Type="text" Id="" Label="地址" LabelCol="1" InputCol="10">
                    </ColumnInputFieldComponent>
                </div>
                <hr>
                <h4> 活動描述 </h4>
                <div class="text-start mx-3">
                    {{ eventData.description }}
                </div>
                <!-- 活動地點 -->
                <div class="col-12">
                    <h4>活動地點</h4>
                    <!-- 活動地點列表 -->
                </div>
                <!-- 報名費 -->
                <div class="col-12">
                    <h4>報名費</h4>
                    <p class="mx-3 float-end fs-5">
                        {{ eventData.fee }} 元
                    </p>
                </div>
                <!-- submit -->
                <div class="col-12 my-3 d-flex justify-content-end">
                    <button class="btn btn-primary col-2 me-3">送出</button>
                    <button class="btn btn-secondary col-2">取消</button>
                </div>
            </div>
        </form>
    </div>
</template>

<style lang="css" scoped>
.box {
    border: 1px solid salmon;
    height: 100px;
}

.no-resize {
    resize: none;
}
</style>