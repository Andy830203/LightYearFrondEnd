<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
//DataTable setting
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';

DataTable.use(DataTablesCore);

const options = {
    responsive: true,
    select: true,
}

// props
const props = defineProps(['enableAddLocation', 'locationData', 'columns'])

// emit
const emit = defineEmits(['addLocation'])

const addLocHander = (table) => {
    // alert('hi')
    emit('addLocation', table)
}

const updateHander = () => {

}
// v-model
const inputList = defineModel()

const demoList = [
    { 'id': '0', 'locName': 'Location A1', 'order': '1' },
    { 'id': '1', 'locName': 'Location A2', 'order': '2' },
    { 'id': '2', 'locName': 'Location A3', 'order': '3' },
    { 'id': '3', 'locName': 'Location A4', 'order': '4' },
    { 'id': '4', 'locName': 'Location A5', 'order': '5' },
    { 'id': '5', 'locName': 'Location A6', 'order': '6' },
    { 'id': '6', 'locName': 'Location A7', 'order': '7' },
    { 'id': '7', 'locName': 'Location A8', 'order': '8' },
    { 'id': '8', 'locName': 'Location A9', 'order': '9' },
    { 'id': '9', 'locName': 'Location A10', 'order': '10' },
]

const enableDragable = ref(false)
const targetList = ref(demoList)
const newListOrder = ref([])

//drag
//參考GPT
const enableDragAndDrop = (tableBody, elementName) => {
    let draggedRow = null;
    let isDragging = false

    tableBody.addEventListener('dragstart', function (event) {
        isDragging = true
        draggedRow = event.target; // 紀錄被拖曳的元素
        event.dataTransfer.effectAllowed = "move";
        // event.dataTransfer.setData('text/html', draggedRow.outerHTML);
        draggedRow.style.opacity = '0.5'; // 拖曳時改變透明度
    });

    tableBody.addEventListener('dragover', function (event) {
        event.preventDefault(); // 允許放下
        event.dataTransfer.dropEffect = "move";
    });

    tableBody.addEventListener('drop', function (event) {
        isDragging = false
        event.preventDefault();
        if (event.target.closest(elementName) && draggedRow !== event.target.closest(elementName)) {
            const targetRow = event.target.closest(elementName); // 確定 drop 的目標行
            const rows = Array.from(tableBody.querySelectorAll(elementName)); // 獲取當前所有行
            const draggedIndex = rows.indexOf(draggedRow);
            const targetIndex = rows.indexOf(targetRow);

            if (draggedIndex > targetIndex) {
                tableBody.insertBefore(draggedRow, targetRow); // 將拖曳行放在目標行之前
            } else {
                tableBody.insertBefore(draggedRow, targetRow.nextSibling); // 放在目標行之後
            }

            const newRows = Array.from(tableBody.querySelectorAll(elementName))
            const nowIndexPairs = newRows.map((item, index) => {
                console.log(item.key)
                const nowIndex = item.querySelector('.nowIndex')
                nowIndex.innerText = `${index}`
                return { 'key': item.dataset.key, 'index': Number(nowIndex.innerText) }
            })
            console.log(nowIndexPairs)
            newListOrder.value = JSON.parse(JSON.stringify(nowIndexPairs))
        }
        draggedRow.style.opacity = '1'; // 拖放結束時恢復透明度
    });

    tableBody.addEventListener('dragend', function () {
        if (isDragging) {
            draggedRow.style.opacity = '1'; // 拖放結束時恢復透明度
        }
        draggedRow = null; // 清空拖曳狀態
    });
}

// functions

const CouldAddLocation = () => {
    if (props.enableAddLocation !== undefined) {
        return props.enableAddLocation
    } else {
        return false
    }
}

const updateOrder = () => {
    // send new order
    let kvPair = newListOrder.value
    kvPair.forEach(pair => {
        console.log(`${pair.key}, ${pair.index}`)
        const target = targetList.value.find(x => x.id === pair.key)
        target.order = pair.index + 1
    })
    alert(JSON.stringify(kvPair))
    // await nextTick()
    props.enableAddLocation = false
}

const initDrag = () => {
    let dragItem = 'li'
    if (enableDragable.value === true) {
        document.querySelectorAll('.DragableOn').forEach((tableBody) => {
            enableDragAndDrop(tableBody, dragItem);
            // buildIndice(tableBody, dragItem, 'nowIndex')
        });
    }
    // alert(JSON.stringify(newListOrder.value))
}

const onChange = () => {
    targetList.value.sort((a, b) => a.order - b.order)
    console.log(targetList.value)
    initDrag()
}

const modalRef = ref(null);       // modal 元素的引用
const dataTableRef = ref(null);    // DataTable 元件的引用
const showTable = ref(false);      // 控制 DataTable 是否顯示
const modalInstance = ref(null);   // Bootstrap modal 實例

// 打開 modal 並延遲顯示 DataTable
const openModal = () => {
    showTable.value = false;         // 確保重新加載表格
    modalInstance.value.show();      // 顯示 modal
};

// 關閉 modal
const closeModal = () => {
    modalInstance.value.hide();
};

// 初始化 modal 並監聽 shown.bs.modal 事件
onMounted(() => {
    modalInstance.value = new Modal(modalRef.value);

    // 監聽 modal 顯示事件，在 modal 完全顯示後顯示 DataTable
    modalRef.value.addEventListener('shown.bs.modal', () => {
        showTable.value = true;         // Modal 完全顯示後設置 DataTable 顯示
    });

    // 監聽 modal 隱藏事件，隱藏 DataTable
    modalRef.value.addEventListener('hidden.bs.modal', () => {
        showTable.value = false;        // Modal 關閉後隱藏 DataTable
    });
});

</script>
<!-- from: https://devdevout.com/css/css-list-styles -->
<template>
    <div>
        <!-- <h5>{{ title }}</h5> -->
        <input type="checkbox" v-model="enableDragable" @change="onChange">開啟拖放
        <div class="list">
            <ul v-if="enableDragable" class="DragableOn">
                <li :draggable="enableDragable" v-for="item in targetList" :key="item.id" :data-key="item.id">
                    <span class="tspan tspan-padding">{{ item.order }}-{{ item.locName }} [<span
                            class="nowIndex"></span>]</span>
                </li>
            </ul>
            <ul v-else class="DragableOff">
                <li :draggable="enableDragable" v-for="item in targetList" :key="item.id">
                    <span class="tspan tspan-padding">{{ item.order }}-{{ item.locName }}</span>
                </li>
            </ul>
        </div>
        <div class="row d-flex justify-content-end">
            <div class="col-6 d-flex justify-content-end">
                <button class="btn btn-primary me-3" @click="updateOrder(newListOrder)"> 更改 </button>
                <button v-if="CouldAddLocation()" class="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#modalLocattions" @click="openModal()"> 新增地點 </button>
            </div>
        </div>

        <!-- Vertically centered scrollable modal -->
        <div class="modal fade" id="modalLocattions" tabindex="-1" aria-labelledby="modalLocattionsLabel"
            aria-hidden="true" ref="modalRef">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" id="">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3 class="modal-title" id="modalLocattionsLabel">地點列表</h3>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <DataTable v-if="showTable" :data="props.locationData" :columns="props.columns" class="display"
                            :options="options" ref="dataTableRef">
                            <thead class="table-primary"></thead>
                        </DataTable>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                        <!-- 將所選加入到targetList -->
                        <button type="button" class="btn btn-primary" @click="addLocHander(dataTableRef)">添加地點</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
/* ul.DragableOn {
    border: 1px solid salmon;
} */

ul.DragableOn li {
    background-color: #000;
    /* color: #fff; */
    /* border: 1px solid aliceblue; */
}

ul.DragableOff li {
    background-color: #000;
}

.hidden {
    display: none;
}

.list {
    position: relative;
}

.list h2 {
    color: #fff;
    font-weight: 700;
    letter-spacing: 1px;
    margin-bottom: 10px;
}

.list ul {
    position: relative;
}

.list ul li {
    position: relative;
    left: 0;
    color: #fce4ec;
    list-style: none;
    margin: 4px 0;
    border-left: 2px solid #b49f8c;
    transition: 0.5s;
    cursor: pointer;
}

.list ul li:hover {
    left: 10px;
}

.list ul li span.tspan {
    position: relative;
    display: inline-block;
    z-index: 1;
    transition: 0.5s;
}

.list ul li span.tspan-padding {
    padding: 8px;
    padding-left: 12px;
}

.list ul li:hover span.tspan {
    color: #111;
}

.list ul li:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: #b49f8c;
    transform: scaleX(0);
    transform-origin: left;
    transition: 0.5s;
}

.list ul li:hover:before {
    transform: scaleX(1);
}

.table-primary {
    background-color: #e0f7fa !important;
}
</style>