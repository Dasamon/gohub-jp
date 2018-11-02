// Chrome extensions の Page Action の API
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    console.log(tab.url, changeInfo.status);
});
