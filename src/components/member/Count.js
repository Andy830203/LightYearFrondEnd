import { ref, onMounted } from 'vue';

const BASE_URL = import.meta.env.VITE_API_BASEURL;

export const memberCount = ref(null);



export function count_init() {

    async function fetchStats() {
        try {
            // 獲取會員總數
            const memberResponse = await fetch(`${BASE_URL}/members/count`);
            const data = await memberResponse.json();
            memberCount.value = data.count; // 提取 count 屬性
        } catch (error) {
            console.error("統計數據獲取失敗", error);
        }
    }

    onMounted(() => {
        fetchStats();
    });
}