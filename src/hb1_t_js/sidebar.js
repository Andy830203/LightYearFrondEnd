
// import $ from 'jquery';
import { ref, onMounted, nextTick } from 'vue';
import { dt_set_mp, feature_cityname, feature_townname } from '@/hb1_t_js/GM_c.js';
const map_loc_url = import.meta.env.VITE_API_BASEURL;
export default function useDataTable() {
    const table = ref(null);

    // 初始化 DataTable
    const initializeDataTable = (data) => {
        table.value = $('#dynamicTable').DataTable({
            data: data,
            columns: [
                { data: 'name', title: '活動名稱' },
                { data: 'position', title: '位置' }
            ],
            responsive: true,
            lengthMenu: [[10, 20, 30, -1], [10, 20, 30, "All"]],
            searching: false,
            lengthChange: false,
            pageLength: 4,
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
        $('#dynamicTable tbody').on('click', 'tr', function () {
            handleRowClick(this); // 調用 handleRowClick 函數
        });
    };
    // 行點擊處理函數
    const handleRowClick = (rowElement) => {
        const rowData = table.value.row(rowElement).data();
        console.log(rowData.position)
        fetch(map_loc_url + "/Locations")
            .then(res => { return res.json(); })
            .then(c => {
                c.forEach(s_c => {
                    if (rowData.position === s_c.address) {
                        dt_set_mp(s_c.longitude, s_c.latitude);
                    }
                })
            })
    };
    const fetchData = async () => {
        try {
            // 資料來源和篩選條件
            const res = await fetch(map_loc_url + "/EventLocations");
            const events = await res.json();
            const data = [];

            // 使用 Promise.all 等待所有的 fetch 完成
            const fetchPromises = events.map(async (event) => {
                const locationRes = await fetch(map_loc_url + "/Locations" + `/${event.lId}`);
                const location = await locationRes.json();
                const fullAddress = feature_cityname.value + feature_townname.value;
                if (location.address.startsWith(fullAddress)) {
                    data.push({
                        "name": event.belongedEvent,
                        "position": location.address
                    });
                }
            });
            // 等待所有的 fetch 完成後再執行
            await Promise.all(fetchPromises);
            // 傳入已完成的 data 陣列
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
