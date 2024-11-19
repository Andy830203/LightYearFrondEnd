export function triggerques_display() {
    const overlay = document.getElementById('quesOverlay');
    // 顯示覆蓋層
    overlay.style.display = 'block';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 1500);//顯性等待
}
export function triggerques_display_close() {
    const overlay = document.getElementById('quesOverlay');
    overlay.style.display = 'none';
}