import { onMounted, onBeforeUnmount, ref } from 'vue';
//地圖所需元件St
const mapStyle = [
  {
    "featureType": "administrative",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#ffeb3b"
      },
      {
        "saturation": -5
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
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

//Json路徑
const fileNames = ['Changhua_County', 'Chiayi_City', 'Chiayi_County', 'Hsinchu_City', 'Hsinchu_County', 'Hualien_County', 'Kaohsiung', 'Keelung_City', 'Miaoli_County', 'nantou_county', 'New_Taipei_City', 'Pingtung_County', 'Taichung_City', 'tainan', 'Taipei_City', 'Taitung_County', 'Taoyuan_County', 'Yilan_County', 'Yunlin_County'];  // 可以依據檔案數量進行修改
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
        //前金區緯經度lat: 22.6273, lng: 120.3014
        styles: mapStyle,
        disableDefaultUI: true,//停用ui
        //以下設定縮放限制
        minZoom: 9,
        maxZoom: 10,
        restriction: {
          latLngBounds: {
            north: 26,
            south: 21,
            east: 123,
            west: 119,
          },
        },
      });
      // //讀取所有縣市geojson
      let filenum = 0;
      let fileroute;
      fileNames.forEach(function () {
        fileroute = "src/hb1_t_js/map_jsonfile/" + fileNames[filenum] + ".json";
        map.data.loadGeoJson(fileroute);
        //擷取json資料st
        fetch(fileroute)
          .then(response => {
            return response.json();
          })
          .then(jsondata => {
            console.log(jsondata.features[0].properties.COUNTY);//要顯示名稱
            const concenter = 'src/hb1_t_js/map_jsonfile/contrycenter.json';
            fetch(concenter).then(c_res=>{
              return c_res.json();
            })
            .then(c_c=>{//c_c是contrycenter裡的資料
              //console.log("c_c城市名:"+c_c);
              const test = jsondata.features[0].properties.COUNTY;//要顯示名稱
              //console.log("geojson城市名:"+test)
              //console.log("經度:"+c_c[test][0]["lng"]);
            })
          })
        //擷取json資料end
        filenum++;
      })

      // 加載 GeoJSON 並創建標籤
      // let filenum = 0;
      // let fileroute;
      // map.data.loadGeoJson(fileroute);
      // fileNames.forEach(function () {
      // fileroute = "src/hb1_t_js/map_jsonfile/" + fileNames[filenum] + ".json";
      //   map.data.loadGeoJson(fileroute, null, (features) => {
      //       features.forEach((feature) => {
      //         // 中心點抓取st
      //         const concenter = 'src/hb1_t_js/map_jsonfile/contrycenter.json';
      //         fetch(concenter)
      //         .then(response => {
      //           return response.json();
      //         })
      //         .then(c_c=>{
      //           // console.log(fileroute[c_c.features[0].properties.COUNTY][lng]);
      //           console.log(c_c.features[0].properties.COUNTY);
      //           // let c_center={lng:c_c[jsondata.features[0].properties.COUNTY][lng],lat:c_c[jsondata.features[0].properties.COUNTY][lat]};//中心點物件
      //         })

      //         // 中心點抓取end
      //           // 設定地名與數值
      //           // const cityName = jsondata.features[0].properties.COUNTY;
      //           // const someValue = 1; // 假設數值隨機產生
      //           // 創建自訂標籤
      //           //new CustomLabel(map, c_center, cityName, someValue);
      //       });
      //   });
      //   filenum++;
      // })

      // // 計算 GeoJSON 多邊形的中心
      // function getFeatureCenter(feature) {
      //   const bounds = new google.maps.LatLngBounds();
      //   feature.getGeometry().forEachLatLng((latLng) => bounds.extend(latLng));
      //   return bounds.getCenter();
      // }


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
        const feature_COUNTY_ID = event.feature.Fg.COUNTY_ID;//取得geojson裡COUNTY_ID
        const feature_cityname = event.feature.Fg.COUNTY;//取得geojson裡COUNTY_ID
        alert("縣市id:" + feature_COUNTY_ID + "\n" + "縣市名:" + feature_cityname);
        //map.setZoom(14)
      });
      // // 創建一個全域的 InfoWindow 變數
      // const infoWindow = new google.maps.InfoWindow();
      // //顯示自定義文字
      // const feature_COUNTY_ID = event.feature.getProperty('COUNTY_ID'); // 取得 geojson 裡的 COUNTY_ID
      // const feature_cityname = event.feature.getProperty('COUNTY'); // 取得 geojson 裡的 COUNTY 名稱

      // // 設定 InfoWindow 的內容
      // infoWindow.setContent(
      //     `<div><strong>縣市ID:</strong> ${feature_COUNTY_ID}<br><strong>縣市名:</strong> ${feature_cityname}</div>`
      // );
    };
    updateMapHeight(); // 初次掛載時設置高度
    window.addEventListener('resize', updateMapHeight); // 監聽視窗大小變化
    // 自訂標籤 OverlayView
    //   function CustomLabel(map, position, cityName, value) {
    //     this.position = position;   // 地標的位置
    //     this.cityName = cityName;   // 地標的名稱
    //     this.value = value;         // 顯示的數值
    //     this.div = null;            // HTML容器，用於存放顯示內容
    //     this.setMap(map);           // 將標籤附加到地圖上
    // }
    // //繼承OverlayView
    // CustomLabel.prototype = new google.maps.OverlayView();
    // // 創建標籤的容器
    // CustomLabel.prototype.onAdd = function () {
    //   this.div = document.createElement('div');
    //   this.div.style.position = 'absolute';
    //   this.div.style.backgroundColor = 'rgba(0,0,0,1)';
    //   this.div.style.border = '1px solid black';
    //   this.div.style.padding = '4px';
    //   this.div.style.textAlign = 'center';
    //   this.div.style.fontSize = '12px';
    //   // 設定標籤內容，包含兩行
    //   this.div.innerHTML = `<div><strong>${this.cityName}</strong></div><div>數值: ${this.value}</div>`;

    //   // 將標籤元素添加到 overlayLayer
    //   const panes = this.getPanes();
    //   panes.overlayLayer.appendChild(this.div);
    // };
    // //每次地圖移動或縮放時自動呼叫
    // CustomLabel.prototype.draw = function () {
    //   const overlayProjection = this.getProjection();
    //   const pos = overlayProjection.fromLatLngToDivPixel(this.position);

    //   // 設定標籤位置
    //   if (this.div) {
    //       this.div.style.left = pos.x + 'px';
    //       this.div.style.top = pos.y + 'px';
    //   }
    // };

    // CustomLabel.prototype.onRemove = function () {
    //   if (this.div) {
    //       this.div.parentNode.removeChild(this.div);
    //       this.div = null;
    //   }
    // };
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateMapHeight); // 組件卸載時移除監聽
  });
}