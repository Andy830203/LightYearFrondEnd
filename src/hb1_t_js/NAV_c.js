import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { state } from '@/global_value';
const scale = ref(1); // 全局 scale 狀態
const navbar = ref(null);
const nav_item_dis = ref(true);
export function m_e_move() {// 滑鼠移入事件：變大
        scale.value = 1; // large
}
export function m_e_leave() {// 滑鼠移出事件：變小
        if (state.isDisabled) {
            scale.value = 0.1; // small
            nav_item_dis.value = false;
        }
        else{
            scale.value = 1;
        }
}
export const navClass = computed(() => {// 動態綁定 CSS class
    return scale.value === 1 ? 'large-nav' : 'small-nav';
});
export function m_e_onMounted() {//debug用
    onMounted(() => {
        console.log("navbar is mounted");
    });
}
export function m_e_onBeforeUnmount() {//結束載入執行
    onBeforeUnmount(() => {
        if (navbar.value) {
            navbar.value.removeEventListener('mouseenter', m_e_move);
            navbar.value.removeEventListener('mouseleave', m_e_leave);
        }
    });
}
