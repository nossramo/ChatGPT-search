document.addEventListener('DOMContentLoaded', function() {
    const openSettingsButton = document.getElementById('openSettings');
    if (openSettingsButton) {
        openSettingsButton.addEventListener('click', function() {
            window.webkit.messageHandlers.controller.postMessage("open-preferences");
        });
    }
});

function updateStatus(isEnabled) {
    const statusText = document.getElementById('statusText');
    if (statusText) {
        statusText.textContent = isEnabled ? 'Enabled' : 'Disabled';
        statusText.style.color = isEnabled ? '#34c759' : '#ff3b30';
    }
}
