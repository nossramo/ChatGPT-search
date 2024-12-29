// Debug logging function
function logDebug(message, ...args) {
    console.log(`[ChatGPT Redirect] ${message}`, ...args);
}

// Pattern for Safari/Yahoo search
const searchPattern = /^https?:\/\/(?:[^.]+\.)?yahoo\.com\/search.*?[?&]p=([^&]+)/i;

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

// Listen for navigation events
browser.webNavigation.onBeforeNavigate.addListener(function(details) {
    logDebug("Navigation event:", details);
    
    const match = details.url.match(searchPattern);
    if (match && details.frameId === 0) { // frameId 0 means main frame
        const searchTerm = decodeURIComponent(match[1])
            .replace(/\+/g, ' '); // Replace + with spaces
        
        getRedirectUrl(searchTerm).then(redirectUrl => {
            logDebug("Search term:", searchTerm);
            logDebug("Redirecting to:", redirectUrl);
            
            browser.tabs.update(details.tabId, {
                url: redirectUrl
            }).catch(error => {
                logDebug("Redirect error:", error);
            });
        });
    }
});
