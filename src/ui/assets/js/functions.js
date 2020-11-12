const caesar = require("./assets/js/ciphers/caesar.js");
const vigenere = require("./assets/js/ciphers/vigenere.js");

let error = (e) => {
    document.querySelector("#key-container").style.transform = "scale(1.15, 1.15)";
    document.querySelector("#key-container").style.backgroundColor = "var(--secondary)";
    setTimeout(() => {
        document.querySelector("#key-container").style.transform = "scale(1.05, 1.05)";
        document.querySelector("#key-container").style.backgroundColor = "var(--primary)";
    }, 400)
    new Noty({
        theme: "sunset",
        type: "error",
        text: e,
        timeout: 1000
    }).show();
}

let flash = () => {
    document.querySelector("#key-container").style.transform = "scale(1.15, 1.15)";
    document.querySelector("#key-container").style.backgroundColor = "var(--tertiary)";
    setTimeout(() => {
        document.querySelector("#key-container").removeAttribute('style');
    }, 400)
}

let time_taken = (start) => {
    document.querySelector("footer").innerHTML = `<strong>Time taken: </strong> ${Date.now() - start}ms`;
    setTimeout(() => {
        document.querySelector("footer").innerHTML = "";
    }, 5000)
}

// Caesar

let caesar_encrypt = () => {
    let start = Date.now();
    let key = document.querySelector("#key-container").innerText;
    let body = document.querySelector("#body");
    let res = caesar.encrypt(key, body.value);
    if (!res.success) return error(res.error)
    body.value = res.ciphertext;
    time_taken(start);
}

let caesar_decrypt = () => {
    let start = Date.now();
    let key = document.querySelector("#key-container").innerText;
    let body = document.querySelector("#body");
    let res = caesar.decrypt(key, body.value);
    if (!res.success) return error(res.error)
    body.value = res.plaintext
    time_taken(start);
}

let caesar_solve = () => {
    let start = Date.now();
    let body = document.querySelector("#body");
    let res = caesar.solve(body.value);
    if (!res.success) return error(res.error)
    document.querySelector("#key-container").innerText = res.key;
    flash()
    body.value = res.plaintext
    time_taken(start);
}

// Vigenere

let vigenere_encrypt = () => {
    let start = Date.now();
    let key = document.querySelector("#key-container").innerText;
    let body = document.querySelector("#body");
    let res = vigenere.encrypt(key, body.value);
    if (!res.success) return error(res.error)
    body.value = res.ciphertext
    time_taken(start);
}

let vigenere_decrypt = () => {
    let start = Date.now();
    let key = document.querySelector("#key-container").innerText;
    let body = document.querySelector("#body");
    let res = vigenere.decrypt(key, body.value);
    if (!res.success) return error(res.error)
    body.value = res.plaintext
    time_taken(start);
}

let vigenere_keylength = () => {
    let start = Date.now();
    let body = document.querySelector("#body");
    let res = vigenere.getKeyLength(body.value);
    new Noty({
        theme: "sunset",
        type: "info",
        text: `Key Length: ${res}`,
        timeout: 5000
    }).show();
    time_taken(start);
}

let vigenere_solve = () => {
    let start = Date.now();
    let body = document.querySelector("#body");
    let res = vigenere.solve(body.value);
    if (!res.success) return error(res.error);
    document.querySelector("#key-container").innerText = res.key;
    flash()
    body.value = res.plaintext
    time_taken(start);
}