import { defineStore } from "pinia";
import { ref, watch, computed } from "vue";

export const useMemberStore = defineStore('member', () => {
    const member = ref(JSON.parse(localStorage.getItem("member")) || null);

    // 當 member 值改變時，更新 localStorage
    watch(member, (newMember) => {
        localStorage.setItem("member", JSON.stringify(newMember));
    });

    // 判斷是否已登入
    const isLoggedIn = computed(() => member.value !== null);

    return { member, isLoggedIn };
});
