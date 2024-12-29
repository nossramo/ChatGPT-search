// Get redirect URL based on mode
function getRedirectUrl(searchTerm) {
    return new Promise((resolve) => {
        chrome.storage.local.get('redirectMode', function(data) {
            const mode = data.redirectMode || 'search';
            const path = mode === 'search' ? '/search' : '/';
            resolve(`https://chat.openai.com${path}?q=${encodeURIComponent(searchTerm)}`);
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
