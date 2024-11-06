export function triggerCloudAnimation() {
    console.log("loading中");
    const overlay = document.getElementById('cloudOverlay');
    const clouds = overlay.querySelectorAll('.cloud');

    // 顯示覆蓋層
    overlay.style.display = 'block';

    // 移除並重新添加雲朵動畫 class 來觸發動畫
    clouds.forEach(cloud => {
        cloud.classList.remove('cloud left', 'cloud right');
        // setTimeout(() => {
        //     if (cloud.classList.contains('cloud-left')) {
        //         cloud.classList.add('cloud-left');
        //     } else {
        //         cloud.classList.add('cloud-right');
        //     }
        // }, 10); // 短暫延遲確保變化被渲染
    });
    overlay.style.display = 'none';
    console.log("loading結束");
}