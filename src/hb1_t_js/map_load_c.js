export function triggerCloudAnimation() {
    console.log("loading中");
    const overlay = document.getElementById('cloudOverlay');
    // 顯示覆蓋層
    overlay.style.display = 'block';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 1500);//顯性等待
}

