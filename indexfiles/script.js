"use strict";

// grab and check url search parameters
const url = new URL(window.location.href);
if (url.searchParams.get("b") || url.searchParams.get("e")) {
    // oh, so we DO have a "b" search parameter or an "e" search parameter!
    const b = url.searchParams.get("b");
    const e = url.searchParams.get("e");
    //console.log(b);
    //console.log(e);
    if (!(b === null) && !(e === null)) {
        // this means the user manually changed the search parameters to include inputs for both b and e so we will strip all search parameters
        //whatDidYouDo();
        newValue();
    }
    // clear the page content to make room for incoming content
    document.getElementById("content").innerHTML = "";
    if (!(b === null)) {
        convertBinary(b);
    } else if (!(e === null)) {
        convertEnglish(e);
    } else {
        // this shouldn't ever happen
        alert("uh... what did you do??");
        newValue();
    }
}

// trigger "convert to binary" with enter key
document.getElementById("toBinary").addEventListener("keydown", (event) => {
    if (event.key === "Enter") toBinary();
});

// trigger "convert to English" with enter key
document.getElementById("toEnglish").addEventListener("keydown", (event) => {
    if (event.key === "Enter") toEnglish();
});

// validation checking for converting to binary
function toBinary() {
    let value = document.getElementById("toBinary").value;
    if (value === "" || value === null || value === undefined) {
        // nothing was entered
        document.getElementById("toBinary").focus();
        alert("please input some English to convert to binary.");
        return;
    }
    // something was entered, so set the "b" url search parameter with the value
    url.searchParams.set("b", value);
    window.location.href = url;
}

// validation checking for converting to English
function toEnglish() {
    let value = document.getElementById("toEnglish").value;
    if (value === "" || value === null || value === undefined) {
        // nothing was entered
        document.getElementById("toEnglish").focus();
        alert("please input some binary to convert to English");
        return;
    }
    // check to make sure it's all zeros n' ones
    for (let i = 0; i < value.length; i++) {
        if (value[i] == "0" || value[i] == "1") continue;
        // it didn't pass the validation check line above (with the continue) so that means that there's a character here that isn't a zero or one
        alert("that doesn't look like accepted binary?");
        return;
    }
    // valid binary, so set the "e" url search parameter with the value
    url.searchParams.set("e", value);
    window.location.href = url;
}

function clipboard() {
    // copy the result to the user's clipboard
    // thisElement is the button, not the result paragraph
    const data = document.getElementById("result").dataset.binary;
    navigator.clipboard.writeText(data);
}

function newValue() {
    // remove all url search parameters so that the user can convert something else
    // thisElement is the button, not the result paragraph
    url.search = "";
    window.location.href = url;
}

function convertBinary(data) {
    // first convert everything to ascii
    const encoder = new TextEncoder();
    const ascii = encoder.encode(data);
    //console.log(ascii);
    // now convert the ascii to binary
    var fin = "";
    for (let i = 0; i < ascii.length; i++) {
        let cur = ascii[i];
        cur = cur.toString(2);
        cur = cur.padStart(8, "0");
        var fin = fin + cur;
    }
    //console.log(fin);
    // write the result itself on the webpage
    const result = document.createElement("p");
    result.id = "result";
    result.dataset.binary = fin;
    result.innerText = `"${data}" to UTF-8 binary is: ${fin}`;
    document.getElementById("content").appendChild(result);
    // add div to contain the buttons
    const buttons = document.createElement("div");
    buttons.className = "inputGroup";
    // add a button that copies result to clipboard
    const clipboard = document.createElement("button");
    clipboard.setAttribute("onclick", "clipboard()");
    clipboard.innerText = "copy to clipboard";
    buttons.appendChild(clipboard);
    // add a button that removes url search parameters to try converting something else
    const yay = document.createElement("button");
    yay.setAttribute("onclick", "newValue()");
    yay.innerText = "convert something else";
    buttons.appendChild(yay);
    // add those buttons to the webpage
    document.getElementById("content").appendChild(buttons);
}

function convertEnglish(data) {
    // split the binary into chunks of 8
    const chunks = data.match(/.{1,8}/g || []);
    //console.log(chunks);
    // convert the binary to ascii, then the ascii to English
    const decoder = new TextDecoder();
    var fin = "";
    for (let i = 0; i < chunks.length; i++) {
        let cur = chunks[i];
        cur = parseInt(cur, 2);
        // now cur is in ascii
        // now we convert the ascii to English character
        cur = String.fromCharCode(cur);
        // add character to the finished result
        var fin = fin + cur;
    }
    console.log(fin);
}