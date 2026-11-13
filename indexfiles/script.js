"use strict";

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
}