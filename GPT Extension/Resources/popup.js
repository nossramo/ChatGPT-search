document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.getElementById('searchMode');
    const chatButton = document.getElementById('chatMode');
    const googleButton = document.getElementById('googleMode');

    // Load saved mode or default to search
    chrome.storage.local.get('redirectMode', function(data) {
        const mode = data.redirectMode || 'search';
        updateButtons(mode);
    });

    searchButton.addEventListener('click', function() {
        updateButtons('search');
        chrome.storage.local.set({ redirectMode: 'search' });
    });

    chatButton.addEventListener('click', function() {
        updateButtons('chat');
        chrome.storage.local.set({ redirectMode: 'chat' });
    });

    googleButton.addEventListener('click', function() {
        updateButtons('google');
        chrome.storage.local.set({ redirectMode: 'google' });
    });

    function updateButtons(mode) {
        searchButton.classList.remove('active');
        chatButton.classList.remove('active');
        googleButton.classList.remove('active');

        switch(mode) {
            case 'search':
                searchButton.classList.add('active');
                break;
            case 'chat':
                chatButton.classList.add('active');
                break;
            case 'google':
                googleButton.classList.add('active');
                break;
        }
    }
});
