export function triggerCloudAnimation() {
    const overlay = document.getElementById('cloudOverlay');
    // 顯示覆蓋層
    overlay.style.display = 'block';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 1500);//顯性等待
}

