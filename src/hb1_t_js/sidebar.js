import { onMounted, ref } from 'vue';
import $ from 'jquery';



export const tableData = ref([
    { name: 'Tiger Nixon', position: 'System Architect' },
    { name: 'Garrett Winters', position: 'Accountant' },
    { name: 'Ashton Cox', position: 'Junior Technical Author' },
    { name: 'Cedric Kelly', position: 'Senior Javascript Developer' },
    { name: 'Airi Satou', position: 'Accountant' },
    { name: 'Brielle Williamson', position: 'Integration Specialist' },
    { name: 'Herrod Chandler', position: 'Sales Assistant' },
    { name: 'Rhona Davidson', position: 'Integration Specialist' },
    { name: 'Colleen Hurst', position: 'Javascript Developer' },
    { name: 'Sonya Frost', position: 'Software Engineer' },
    { name: 'Brielle Williamson', position: 'Integration Specialist' },
    { name: 'Herrod Chandler', position: 'Sales Assistant' },
    { name: 'Rhona Davidson', position: 'Integration Specialist' },
    { name: 'Colleen Hurst', position: 'Javascript Developer' },
    { name: 'Sonya Frost', position: 'Software Engineer' },
    // 可以添加更多數據
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
                setOffcanvasContent(cellData); // 將數據傳遞給 setOffcanvasContent 函數
            }
        });
        function setOffcanvasContent(content) {
            const contentElement = document.getElementById('offcanvasContent');
            if (contentElement) {
                contentElement.textContent = content;
            }
        }
    });
}