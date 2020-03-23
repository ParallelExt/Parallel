let selectText;
chrome.tabs.executeScript(null, {
    code: "window.getSelection().toString();"
}, function (selected){
    selectText = selected;
    document.getElementById("showWord").innerHTML = selectText;
});