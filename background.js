chrome.runtime.onInstalled.addListener(function() {
    chrome.action.onClicked.addListener(function(tab) {
      chrome.action.setPopup({tabId: tab.id, popup: "popup.html"});
    });
  });
  