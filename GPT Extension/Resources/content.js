// Get redirect URL based on mode
function getRedirectUrl(searchTerm) {
    return new Promise((resolve) => {
        chrome.storage.local.get('redirectMode', function(data) {
            const mode = data.redirectMode || 'search';
            switch(mode) {
                case 'search':
                    resolve(`https://chat.openai.com/search?q=${encodeURIComponent(searchTerm)}`);
                    break;
                case 'chat':
                    resolve(`https://chat.openai.com/?q=${encodeURIComponent(searchTerm)}`);
                    break;
                case 'google':
                    resolve(`https://www.google.com/search?q=${encodeURIComponent(searchTerm)}`);
                    break;
                default:
                    resolve(`https://chat.openai.com/search?q=${encodeURIComponent(searchTerm)}`);
            }
        });
    });
}

// Intercept form submissions
document.addEventListener('submit', function(e) {
    const form = e.target;
    const searchInput = form.querySelector('input[type="text"], input[type="search"]');
    
    if (searchInput) {
        e.preventDefault();
        const searchTerm = searchInput.value
            .trim()
            .replace(/\s+/g, ' '); // Normalize spaces
        console.log("Search intercepted:", searchTerm);
        
        getRedirectUrl(searchTerm).then(url => {
            window.location.href = url;
        });
    }
}, true);

console.log("Search interceptor loaded");
