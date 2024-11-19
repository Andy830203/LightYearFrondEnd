
// import $ from 'jquery';
import { ref, onMounted, nextTick } from 'vue';
import { dt_set_mp_forsd } from '@/hb1_t_js/GM_c.js';
const map_loc_url = import.meta.env.VITE_API_BASEURL;
export default function useDataTable() {
    const table = ref(null);

    // 初始化 DataTable
    const initializeDataTable = (data) => {
        table.value = $('#dynamicTable_z8').DataTable({
            data: data,
            columns: [
                { data: 'county', title: '縣市' },
                { data: 'activityCount', title: '活動總數' }
            ],
            responsive: true,
            lengthMenu: [[10, 20, 30, -1], [10, 20, 30, "All"]],
            searching: false,
            lengthChange: false,
            pageLength: 4,
            pagingType: "simple",
            language: {
                lengthMenu: "前往 _MENU_",
                info: "",
                paginate: {
                    previous: "上一頁", // 自定義「上一頁」的文字
                    next: "下一頁" // 自定義「下一頁」的文字
                }
            },
            scrollX: true
        });
        // 綁定行點擊事件
        $('#dynamicTable_z8 tbody').on('click', 'tr', function () {
            handleRowClick(this); // 調用 handleRowClick 函數
        });
    };
    // 行點擊處理函數
    const handleRowClick = (rowElement) => {
        const rowData = table.value.row(rowElement).data();
        console.log(rowData.county)
        fetch('src/hb1_t_js/map_jsonfile/台灣縣市中心/contrycenter.json')
            .then(res => { return res.json(); })
            .then(c_f => {
                dt_set_mp_forsd(parseFloat(c_f[rowData.county][0]["lat"]),parseFloat(c_f[rowData.county][0]["lng"]))
            })
    };
    const fetchData = async () => {
        try {
            const countyFilePath = `src/hb1_t_js/map_jsonfile/台灣縣市中心/contrycenter.json`;
            const data = [];

            // 1. 加載縣市中心 JSON 檔案
            const response = await fetch(countyFilePath);
            if (!response.ok) throw new Error('Failed to load county center JSON file');
            const countyData = await response.json();

            // 取得所有縣市名稱
            const counties = Object.keys(countyData);

            // 2. 加載 Locations 和 EventLocations 數據
            const [locationsResponse, eventLocationsResponse] = await Promise.all([
                fetch(map_loc_url + "/Locations"),
                fetch(map_loc_url + "/EventLocations")
            ]);

            if (!locationsResponse.ok) throw new Error('Failed to load Locations data');
            if (!eventLocationsResponse.ok) throw new Error('Failed to load EventLocations data');

            const locations = await locationsResponse.json();
            const eventLocations = await eventLocationsResponse.json();

            // 3. 將 EventLocations 按 lId 組織為映射
            const eventLocationMap = new Map();
            eventLocations.forEach(eventLocation => {
                const count = eventLocationMap.get(eventLocation.lId) || 0;
                eventLocationMap.set(eventLocation.lId, count + 1);
            });

            // 4. 建立所有縣市的處理 Promise
            const fetchPromises = counties.map(async (countyName) => {
                let activityCount = 0;

                // 查找與縣市名匹配的 Locations
                locations.forEach(location => {
                    if (location.address.includes(countyName)) {
                        // 如果 location 有對應的活動數量，則將其加到活動計數中
                        activityCount += eventLocationMap.get(location.id) || 0;
                    }
                });

                // 將結果儲存到 data 陣列中
                data.push({
                    "county": countyName,
                    "activityCount": activityCount
                });
            });

            // 5. 等待所有縣市的異步處理完成
            await Promise.all(fetchPromises);

            // 6. 傳入已完成的 data 陣列
            initializeDataTable(data);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };



    // 載入 jQuery 和 DataTable 資源並加載數據
    onMounted(() => {
        // 動態載入 jQuery
        const jqueryScript = document.createElement('script');
        jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        jqueryScript.onload = () => {
            // 當 jQuery 資源載入完成後，載入 DataTable 樣式和腳本
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdn.datatables.net/1.10.24/css/jquery.dataTables.min.css';
            document.head.appendChild(link);

            const datatableScript = document.createElement('script');
            datatableScript.src = 'https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js';
            datatableScript.onload = fetchData;
            document.head.appendChild(datatableScript);
        };
        document.head.appendChild(jqueryScript);
    });

    return { table };
}
