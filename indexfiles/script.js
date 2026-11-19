"use strict";

const url = new URL(window.location.href);
if (url.searchParams.get("b") || url.searchParams.get("e")) {
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

document.getElementById("toBinary").addEventListener("keydown", (event) => {
    if (event.key === "Enter") toBinary();
});

document.getElementById("toEnglish").addEventListener("keydown", (event) => {
    if (event.key === "Enter") toEnglish();
});

function toBinary() {
    let value = document.getElementById("toBinary").value;
    if (value === "" || value === null || value === undefined) {
        document.getElementById("toBinary").focus();
        alert("please input some English to convert to binary.");
        return;
    }
    url.searchParams.set("b", value);
    window.location.href = url;
}

function toEnglish() {
    let value = document.getElementById("toEnglish").value;
    if (value === "" || value === null || value === undefined) {
        document.getElementById("toEnglish").focus();
        alert("please input some binary to convert to English");
        return;
    }
    for (let i = 0; i < value.length; i++) {
        if (value[i] == "0" || value[i] == "1") continue;
        alert("that doesn't look like accepted binary?");
        return;
    }
    url.searchParams.set("e", value);
    window.location.href = url;
}