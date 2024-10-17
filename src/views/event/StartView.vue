<script setup>
import ColumnInputFieldComponent from '@/components/event/ColumnInputFieldComponent.vue';
import InputFieldComponent from '@/components/event/InputFieldComponent.vue';
import { ref } from 'vue';

const startDate = ref('');

const submit = () => {
    alert(startDate.value);
}
    
</script>

<template>
    <div>
        <form class="flexBox">
            <div class="w-50 mt-3 me-3 container">
                <div class="row g-3 align-items-center">
                    <!-- 發起人 -->
                    <h2 class="text-left">發起人: <span id="startPerson">123</span></h2>
                    <!-- 活動名稱 -->
                    <div class="col-3 offset-1">
                        <label for="eveTitle" class="col-form-label">活動名稱</label>
                    </div>
                    <div class="col-5">
                        <input type="text" class="form-control" id="eveTitle">
                    </div>
                    <div class="col-3"></div>
                    <!-- 報名費 -->
                    <div class="col-3 offset-1">
                        <label for="eveFee" class="col-form-label">報名費</label>
                    </div>
                    <div class="col-5">
                        <input type="number" class="form-control" id="eveFee">
                    </div>
                    <div class="col-3"></div>
                    <!-- 活動類別 -->
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
                    <!-- 活動優先級 -->
                    <div class="col-3 offset-1">
                    <label for="evePrior" class="col-form-label">活動優先級</label>
                    </div>
                    <div class="col-5">
                        <!-- <input type="number" class="form-control" id="eveType"> -->
                        <select class="form-select" name="" id="evePrior">
                            <option value="">prior 1</option>
                            <option value="">prior 2</option>
                            <option value="">prior 3</option>
                        </select>
                    </div>
                    <div class="col-3"></div>

                    <!-- 活動地點 -->
                    <label for="eveLoc" class="mb-2 form-label">活動地點</label>
                    <!-- table of locations -->
                    <div class="mt-0 holdplace"></div>

                    <!-- 活動描述 -->
                    <label for="eveDesc" class="mb-2 form-label">活動描述</label>
                    <textarea class="form-control mt-0 mb-5" name="description" id="eveDesc" cols="30" rows="10"></textarea>
                </div>
            </div>
            <div class="w-50 ms-3 mt-3 container">
                <div class="row g-3 align-items-center">
                    <!-- 活動照片 -->
                    <label for="evePhoto" class="mb-2 form-label">活動照片</label>
                    <!-- 實作輪播 -->
                    <div class="holdplace">實作輪播</div>
                    <input type="file" name="Photo" id="evePhoto" class="form-control">

                    <!-- 活動時間 -->
                    <!-- <label for="eveStartDay" class="mb-2 form-label">活動開始日期</label>
                    <input type="date" name="" id="eveStartDay" class="form-control">
                    <label for="eveStartTime" class="mb-2 form-label">活動開始時間</label>
                    <input type="time" name="" id="eveStartTime" class="form-control"> -->
                    <InputFieldComponent Type="date" Id="eveStartDay" Label="活動開始日期"></InputFieldComponent>
                    <InputFieldComponent Type="time" Id="eveStartTime" Label="活動開始時間" v-model="startDate"></InputFieldComponent>
                    <InputFieldComponent Type="date" Id="eveEndDay" Label="活動結束日期"></InputFieldComponent>
                    <InputFieldComponent Type="time" Id="eveEndTime" Label="活動結束時間"></InputFieldComponent>

                    <!-- 最大活動人數 -->
                    <ColumnInputFieldComponent
                        Type="number"
                        Id="eveCap"
                        Label="最大活動人數"
                        Indent="false"
                        LabelCol="4"
                        InputCol="8"
                        SpaceCol="0"
                        class="gt-3">
                    </ColumnInputFieldComponent>
                    <!-- <InputFieldComponent Type="number" Id="eveCap" Label="最大活動人數"></InputFieldComponent> -->
                </div>
            </div>
            <!-- submit -->
            <button class="fixedBtn roundBtn btn btn-primary" type="submit" @submit="submit">
                <i class="bi bi-plus-circle-fill"></i>
            </button>
        </form>
    </div>
    
</template>

<style lang="css" scoped>
    .flexBox {
        display: flex;
    }

    .roundBtn {
        border-radius: 100%;
        width: 50px;
        height: 50px;
        font-size: 1.25em;
    }

    .fixedBtn {
        display:block;
        position: fixed;
        right: 50px;
        bottom: 50px;
    }

    .holdplace {
        height: 200px;
        width: 100%;
        border: 1px solid salmon;
    }
</style>