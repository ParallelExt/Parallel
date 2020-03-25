// Function to capture the first word of the selection
// Needs Modification to exclude following punctuation
// Regex is being explored
getWord = (selected) => {
    let word = selected[0].toString().trim();              // Remove whitespace charcters
    let indexStart = word.indexOf(word.match(/[A-z]/));    // Look for the first letter in selection
    if (indexStart === -1) {                               // return null if no letters exist
        return null;
    }
    let indexEnd = word.indexOf(word.match(/\s/));         // Match for the end of first word
    if (indexEnd === -1 ) {
        indexEnd = word.length;                            // Use the word length if no spaces selected
    } 
    return word.substring(indexStart, indexEnd).toLowerCase();           // return the word
}

// AJAX function to load the required dictionary json file and finds the word in the dictionary
// takes the path to the json file as an argument
lookDict = (path, word) => {
    var xobj = new XMLHttpRequest();         // Use AJAX XMHttpRequest to pull from local server
    xobj.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          findWord(xobj.response, word);
        }
      };
    xobj.open('POST', path);
    xobj.responseType = 'json';              // Get JSON format
    xobj.send(); 
}

// To find the word in the dictionary
findWord = (dict, word) => {
    index = word.charCodeAt(0) - 97 ;            // TO calculate the array location in the dictionary
    if ((dict[index])[word] == undefined ) printWord("Please select a valid word") ;
    printWord((dict[index])[word]);
}

// Prints the word to the extension
printWord = (printMessage) => {
    document.getElementById("meaning").innerHTML = printMessage ;
}

// main function to execute script
// Call any required functions from the callback function
chrome.tabs.executeScript({               
    code: "window.getSelection().toString();"
}, function (selected) {
    selectText = getWord(selected);
    $("#wordHeading").append(selectText);
    lookDict("../Dictionary/dictionary_alpha_arrays.json", selectText);
});