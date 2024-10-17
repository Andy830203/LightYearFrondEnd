<script setup>
import { onBeforeRouteLeave } from 'vue-router';
import { state } from '@/global_value.js';  // 引入共享狀態
// 在路由離開時恢復 A 組件的狀態
onBeforeRouteLeave((to, from) => {
  state.isDisabled = false;
});
</script>

<template>
    <div>
        <p>this is location page</p>
    </div>
</template>
<style scoped>
</style>