export function triggerques_display() {
    const overlay = document.getElementById('quesOverlay');
    // 顯示覆蓋層
    overlay.style.display = 'block';
}
export function triggerques_display_close() {
    const overlay = document.getElementById('quesOverlay');
    overlay.style.display = 'none';
}