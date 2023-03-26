document.getElementById("send-msg-btn").addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const port = chrome.tabs.connect(tabs[0].id);
      port.postMessage({msg: "Hello from popup!"});
    });
  });
  