/*map_api_js_c.js*/
import { onMounted, onBeforeUnmount, ref } from 'vue';
const zoom12_mapstyle = [
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    }
];
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
                zoom: 8.2,//地圖縮放倍率
                center: { lat: 23.6978, lng: 120.9605 },//台灣正中心
                styles: zoom12_mapstyle,//不顯示任何label
            });
        };
    });
}