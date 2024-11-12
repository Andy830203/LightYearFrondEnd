import { watch, onMounted, ref } from 'vue';
import $ from 'jquery';
import { feature_cityname, feature_townname } from '@/hb1_t_js/GM_c.js';
const map_loc_url = import.meta.env.VITE_API_BASEURL;
export const tableData = ref([
    { name: '公益活動', position: '高雄市楠梓區德賢路' },
    { name: '志工', position: '高雄市楠梓區右昌街' },
    { name: '剩食分享', position: '高雄市楠梓區後昌路' },
    { name: '愛心餐', position: '高雄市楠梓區藍昌路' },
    { name: '公益活動', position: '高雄市楠梓區軍校路' },
    { name: '志工', position: '高雄市楠梓區楠梓新路' },
    { name: '剩食分享', position: '高雄市楠梓區後勁東路' },
    { name: '愛心餐', position: '高雄市楠梓區翠屏路' },
    { name: '公益活動', position: '高雄市楠梓區惠民路' },
    { name: '志工', position: '高雄市楠梓區興楠路' }
  ]);
export function init_sidebar() {
    onMounted(() => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css';
        document.head.appendChild(link);
        // 初始化 DataTable
        const table = $('#side_dt').DataTable({
            responsive: true, //響應式
            lengthMenu: [[10, 20, 30, -1], [10, 20, 30, "All"]],
            searching: false,
            pageLength: 4,
            language: {
                lengthMenu: "前往 _MENU_",
                info: ""
            },
            scrollX: true, // 啟用橫向滾動

        });
        document.getElementById('side_dt').addEventListener('click', function (event) {
            // 檢查點擊的是否是 td 元素
            if (event.target && event.target.nodeName === 'TD') {
                const cellData = table.cell(event.target).data();
                setOffcanvasContent(cellData);
            }
        });
        function setOffcanvasContent(content) {
            const contentElement = document.getElementById('offcanvasContent');
            if (contentElement) {
                contentElement.textContent = content;
            }
        }
        // console.log(feature_cityname.value);//取得縣市名
        // console.log(feature_townname.value);//取得區名
    });
    //datatable的資料來源
    fetch(map_loc_url + "/EventLocations")
        .then(res => res.json())
        .then(events => {
            events.forEach(event => {
                console.log(event.eId);//活動id
                console.log(event.belongedEvent);//活動名稱
                fetch(map_loc_url + "/Locations" + `/${event.lId}`)//使用地址id搜尋地址
                    .then(res => res.json())
                    .then(location => {
                        const fullAddress = feature_cityname.value + feature_townname.value;// 檢查地址是否符合條件
                        if (location.address.startsWith(fullAddress)) {
                            // 如果地址符合條件，將資料加入到 tableData 中
                            console.log("OK")
                            console.log(event.belongedEvent)
                            console.log(location.address)
                            // watch(tableData, (newVal) => {
                            //     if (newVal !== null) {
                            //         console.log("tableData updated:", newVal);
                            //         tableData.value.push({
                            //             name: event.belongedEvent,
                            //             position: location.address
                            //         });
                            //     }
                            // });
                        }
                    })
            });
        })
}
