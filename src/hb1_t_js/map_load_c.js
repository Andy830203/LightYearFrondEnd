export function triggerCloudAnimation() {
    console.log("loading中");
    const overlay = document.getElementById('cloudOverlay');
    const clouds = overlay.querySelectorAll('.cloud');
    // 顯示覆蓋層
    overlay.style.display = 'block';
    // 移除並重新添加雲朵動畫 class 來觸發動畫
    clouds.forEach(cloud => {
        cloud.classList.remove('cloud-left', 'cloud-right');
        setTimeout(() => {
            if (cloud.classList.contains('cloud-left')) {
                cloud.classList.add('cloud-left');
            } else if (cloud.classList.contains('cloud-right')) {
                cloud.classList.add('cloud-right');
            }
        }, 10); //顯性等待
    });
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 1500);//顯性等待
}

