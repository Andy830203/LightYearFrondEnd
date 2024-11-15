import { ref, onMounted } from 'vue';

const BASE_URL = import.meta.env.VITE_API_BASEURL;

export const memberCount = ref(null);
export const productsCount = ref(null);
export const eventsCount = ref(null);

export function count_init() {

    async function fetchStats() {
        try {
            // 獲取會員總數
            const memberResponse = await fetch(`${BASE_URL}/members/count`);
            const data = await memberResponse.json();
            memberCount.value = data.count; // 提取 count 屬性
        } catch (error) {
            console.error("會員數據獲取失敗", error);
        }
        try {
            const productsResponse = await fetch (`${BASE_URL}/Products`, {
                method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
            })
            const productsData = await productsResponse.json();
            productsCount.value = productsData.length; 
        } catch (error) {
            console.error("商品數據獲取失敗", error);
        }
        try {
            const eventsResponse = await fetch (`${BASE_URL}/Events`, {
                method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
            })
            const eventsData = await eventsResponse.json();
            eventsCount.value = eventsData.length; 
        } catch (error) {
            console.error("活動數據獲取失敗", error);
        }
    }

    onMounted(() => {
        fetchStats();
    });
}