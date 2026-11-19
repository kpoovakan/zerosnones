"use strict";

// grab and check url search parameters
const url = new URL(window.location.href);
if (url.searchParams.get("b") || url.searchParams.get("e")) {
    // oh, so we DO have a "b" search parameter or an "e" search parameter!
    const b = url.searchParams.get("b");
    const e = url.searchParams.get("e");
    console.log(b);
    console.log(e);
    if (!(b === null) && !(e === null)) {
        // this means the user manually changed the search parameters to include inputs for both b and e so we will strip all search parameters
        //whatDidYouDo();
        url.search = "";
        window.location.href = url;
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