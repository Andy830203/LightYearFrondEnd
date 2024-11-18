<script setup>
    import "@/hb1_t_js/sighup_sidebar.css"
    import signuppage from  "@/views/event/SignUpView.vue"
    import { ref } from "vue";
    import { isModalVisible } from "@/hb1_t_js/GM_c.js"
    const closeModal = () => {//關閉報名視窗
    isModalVisible.value = false;
    };
</script>

<template>
    <div id="sighup_page" v-if="isModalVisible">
        <div class="modal-header">
        <button type="button" @click="closeModal"><i class="bi bi-x-lg" ></i></button>
        </div>
        <signuppage></signuppage>
    </div>
</template>
<style scoped>
#sighup_page {
    width: 78vw;
    height: 40vw;
    background-color: #fffdf1;
    position: absolute;
    right: 11vw;
    top: 2vw;
    border-radius: 16px;
    padding: 2%;
    z-index: 1110;
}
button{
    position: absolute;
    right: 30px;
}
</style>