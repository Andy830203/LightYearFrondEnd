import { onMounted, onBeforeUnmount, ref } from 'vue';

export const mapHeight = ref('500px');//地圖預設值
//地圖初始化
export function map_init() {
    const updateMapHeight = () => {// 函式來調整地圖高度
        mapHeight.value = `${window.innerHeight}px`;
    };
    onMounted(() => {
        const script = document.createElement('script');
        script.src = `http://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_API_GM_API}`;//使用.env儲存api，env 512=14130
        script.async = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
        script.onload = () => { //初始化GoogleMap
            const map = new google.maps.Map(document.getElementById("map"), {//佈署地圖
                zoom: 8,//地圖縮放倍率
                center: { lat: 23.6978, lng: 120.9605 },//台灣正中心
                //前金區緯經度lat: 22.6273, lng: 120.3014
            });
        };
        updateMapHeight(); // 初次掛載時設置高度
        window.addEventListener('resize', updateMapHeight); // 監聽視窗大小變化
    });
    onBeforeUnmount(() => {
        window.removeEventListener('resize', updateMapHeight); // 組件卸載時移除監聽
    });
}