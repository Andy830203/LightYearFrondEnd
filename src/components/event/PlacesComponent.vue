<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';

// props
const props = defineProps(['enableAddLocation'])

// emit
const emit = defineEmits(['addLocation'])

const addLocHander = () => {
    // alert('hi')
    emit('addLocation')
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

const updateOrder = async () => {
    // send new order
    let kvPair = newListOrder.value
    kvPair.forEach(pair => {
        console.log(`${pair.key}, ${pair.index}`)
        const target = targetList.value.find(x => x.id === pair.key)
        target.order = pair.index + 1
    })
    alert(JSON.stringify(kvPair))
    await nextTick()
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
                <button v-if="CouldAddLocation()" class="btn btn-primary" @click="addLocHander()"> 新增地點 </button>
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
    border-left: 2px solid #f50057;
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
    background: #f50057;
    transform: scaleX(0);
    transform-origin: left;
    transition: 0.5s;
}

.list ul li:hover:before {
    transform: scaleX(1);
}
</style>