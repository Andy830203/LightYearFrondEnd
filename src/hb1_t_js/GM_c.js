import { onMounted, onBeforeUnmount, ref } from 'vue';
import {zoom8_mapstyle,zoom12_mapstyle,zoom16_mapstyle} from '@/hb1_t_js/map_jsonfile/地圖樣式/zoomset.js';
//地圖所需元件St(靜態)
//Json路徑(靜態)
const fileNames = ['Changhua_County', 'Chiayi_City', 'Chiayi_County', 'Hsinchu_City', 'Hsinchu_County', 'Hualien_County', 'Kaohsiung', 'Keelung_City', 'Miaoli_County', 'nantou_county', 'New_Taipei_City', 'Pingtung_County', 'Taichung_City', 'tainan', 'Taipei_City', 'Taitung_County', 'Taoyuan_County', 'Yilan_County', 'Yunlin_County'];//可以依據檔案數量進行修改
//地圖所需元件end
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
        zoom: 8.2,//地圖縮放倍率
        center: { lat: 23.6978, lng: 120.9605 },//台灣正中心
        styles: zoom8_mapstyle,//不顯示任何label
        disableDefaultUI: true,//停用ui
        //以下設定縮放限制
        scrollwheel: false, // 禁用滾輪縮放
        disableDoubleClickZoom: true, // 禁用雙擊縮放
        zoomControl: false, // 禁用縮放控制按鈕
        restriction: {//設定平移範圍
          latLngBounds: {
            north: 27,
            south: 20,
            east: 123,
            west: 119,
          },
        },
      });
      // //讀取所有縣市邊界geojson
      let filenum = 0;
      let fileroute;
      fileNames.forEach(function () {
        fileroute = "src/hb1_t_js/map_jsonfile/台灣縣市邊界/" + fileNames[filenum] + ".json";
        map.data.loadGeoJson(fileroute);
        //擷取json資料st
        fetch(fileroute)
          .then(response => {
            return response.json();
          })
          .then(jsondata => {
            const concenter = 'src/hb1_t_js/map_jsonfile/台灣縣市邊界/contrycenter.json';
            fetch(concenter).then(c_res => {
              return c_res.json();
            })
              .then(c_c => {//c_c是contrycenter裡的資料
                const c_c_ctname = jsondata.features[0].properties.COUNTY;//要顯示名稱
                // console.log("城市名:" + c_c_ctname + "," + "經度:" + c_c[c_c_ctname][0]["lng"] + "." + "緯度:" + c_c[c_c_ctname][0]["lat"]);
              })
          })
        //擷取json資料end
        filenum++;
      })
      //邊框樣式設定
      map.data.setStyle({
        fillColor: "green",
        strokeWeight: 0.5,
      });
      //參考網址
      //https://developers.google.cn/maps/documentation/javascript/datalayer?hl=zh-tw
      //當滑鼠進入時
      map.data.addListener('mouseover', function (event) {
        map.data.revertStyle();
        map.data.overrideStyle(event.feature, { fillColor: "#193300", strokeWeight: 2 });
      });
      //當滑鼠離開時
      map.data.addListener('mouseout', function (event) {
        map.data.revertStyle();
      });
      //當滑鼠點擊時
      map.data.addListener('click', function (event) {
        //const feature_COUNTY_ID = event.feature.Fg.COUNTY_ID;//取得geojson裡COUNTY_ID
        //const feature_cityname = event.feature.Fg.COUNTY;//取得geojson裡COUNTY_ID
        //alert("縣市id:" + feature_COUNTY_ID + "\n" + "縣市名:" + feature_cityname + "\n" + "目前zoom:" + map.zoom);
        const map_zoom_v = map.getZoom();//有響應
        if (map_zoom_v < 12) {//進入區域模式
          const feature_cityname = event.feature.Fg.COUNTY;//取得geojson裡COUNTY_ID
          removeGeoJson();//移除樣式
          map.data.loadGeoJson(`src/hb1_t_js/map_jsonfile/台灣區域邊界/${feature_cityname}.geojson`);
          map.setOptions({ styles: zoom12_mapstyle });//更改地圖樣式zoom12
          map.setZoom(12);
          //跳轉至縣市中心
          fetch('src/hb1_t_js/map_jsonfile/台灣縣市中心/contrycenter.json')
          .then(res=>{return res.json();})
          .then(c_cen=>{
            map.setCenter({ lat: parseFloat(c_cen[feature_cityname][0]["lat"]), lng: parseFloat(c_cen[feature_cityname][0]["lng"]) });
          })
          console.log("進入區域檢視");
        } else if (map_zoom_v === 12) {//區域模式/縣市模式
          //已經進來了，目前在台灣區域邊界內
          const feature_cityname = event.feature.Fg.COUNTYNAME;//取得geojson裡COUNTYNAME
          removeGeoJson();//移除樣式
          map.data.setStyle({});//清空style設定COUNTYNAME
          map.data.loadGeoJson(`src/hb1_t_js/map_jsonfile/台灣區域邊界/${feature_cityname}.geojson`, null, function () {
            // 設定樣式，只渲染與 featureTownName 相符的區域
            map.data.setStyle((feature) => {
              return feature.getProperty('TOWNNAME') === event.feature.Fg.TOWNNAME
                ? { strokeWeight: 0.5, fillColor: 'green' } // 符合條件的區域樣式 strokeColor: '#FF0000'
                : { visible: false }; // 其他區域不顯示
            });
          });
          map.setCenter({ lat: event.feature.Fg.CENTER.coordinates[1], lng: event.feature.Fg.CENTER.coordinates[0] });
          map.setOptions({ styles: zoom16_mapstyle });//更改地圖樣式zoom16
          map.setZoom(16);
          console.log("進入檢視活動模式");
        } else if (map_zoom_v > 12) {//檢視活動模式
          
          console.log("檢視活動模式");
        }
      });
      // 移除 GeoJSON 資料
      function removeGeoJson() {
        map.data.forEach(function (feature) {
          map.data.remove(feature)
        })
      }
      // zoom_changed當地圖縮放等級的屬性變更後，會引發此事件
    };
    updateMapHeight(); // 初次掛載時設置高度
    window.addEventListener('resize', updateMapHeight); // 監聽視窗大小變化
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateMapHeight); // 組件卸載時移除監聽
  });
}