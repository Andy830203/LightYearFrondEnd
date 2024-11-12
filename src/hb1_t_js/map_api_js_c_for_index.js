import { onMounted, onBeforeUnmount, ref } from 'vue';
//地圖所需元件end
export const mapHeight = ref('500px');//地圖預設值

//地圖初始化
export function map_init() {
    onMounted(() => {
        const script = document.createElement('script');
        script.src = `http://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_API_GM_API}`;//使用.env儲存api，env 512=14130
        script.async = true;
        script.crossOrigin = "anonymous";
        document.head.appendChild(script);
        script.onload = () => { //初始化GoogleMap
            const map = new google.maps.Map(document.getElementById("map"), {//佈署地圖
                zoom: 17,//地圖縮放倍率
                center: { lat: 22.628333, lng: 120.292977 },//台灣正中心22.628333, 120.292977
                // styles: zoom12_mapstyle,//不顯示任何label
                scrollwheel: false, // 禁用滾輪縮放
                disableDoubleClickZoom: true, // 禁用雙擊縮放
                zoomControl: false, // 禁用縮放控制按鈕
            });
            let marker_t = new google.maps.Marker({
                position: { lat: 22.628333, lng: 120.292977 },
                map: map,
              });
        };

    });
}