import { onBeforeRouteLeave } from 'vue-router';
import { state } from '@/global_value.js';  // 引入共享狀態
export function FT_set() {
  onBeforeRouteLeave((to, from) => {// 在路由離開時恢復 A 組件的狀態
    state.isDisabled = false;
  });
}