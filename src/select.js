loadJSON = () => {
    console.log("here");
    var xobj = new XMLHttpRequest();
    xobj.open('POST','../Dictionary/dictionary_alpha_arrays.json', true);
    xobj.responseType = 'json';
    xobj.send();
    xobj.onload = function() {
        return xobj.response;
    }
}

chrome.tabs.executeScript({
    code: "window.getSelection().toString();"
}, function (selected) {
    var selectText = selected;
    document.getElementById("showWord").innerHTML = selectText;
    const dict = loadJSON();
});