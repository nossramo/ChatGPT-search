document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchMode');
    const gptButton = document.getElementById('gptMode');

    // Load saved mode or default to search
    chrome.storage.local.get('redirectMode', function(data) {
        const mode = data.redirectMode || 'search';
        updateButtons(mode);
    });

    searchButton.addEventListener('click', function() {
        updateButtons('search');
        chrome.storage.local.set({ redirectMode: 'search' });
    });

    gptButton.addEventListener('click', function() {
        updateButtons('gpt');
        chrome.storage.local.set({ redirectMode: 'gpt' });
    });

    function updateButtons(mode) {
        if (mode === 'search') {
            searchButton.classList.add('active');
            gptButton.classList.remove('active');
        } else {
            searchButton.classList.remove('active');
            gptButton.classList.add('active');
        }
    }
});
