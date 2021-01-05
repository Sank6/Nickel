const caesar = require("./assets/js/ciphers/caesar.js");
const affine = require("./assets/js/ciphers/affine.js");
const vigenere = require("./assets/js/ciphers/vigenere.js");

let error = (e) => {
    $(".key").css({'transform': "scale(1.15, 1.15)", "background-color": "var(--secondary)"});
    setTimeout(() => {
        $(".key").removeAttr("style");
    }, 400)
    new Noty({
        theme: "sunset",
        type: "error",
        text: e,
        timeout: 1000
    }).show();
}

let flash = () => {
    $(".key").css({'transform': "scale(1.15, 1.15)", "background-color": "var(--tertiary)"});
    setTimeout(() => {
        $(".key").removeAttr("style");
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
    let key = document.querySelector("#caesar-key").innerText;
    let body = document.querySelector("#caesar-body");
    let res = caesar.encrypt(key, body.value);
    if (!res.success) return error(res.error)
    body.value = res.ciphertext;
    time_taken(start);
}

let caesar_decrypt = () => {
    let start = Date.now();
    let key = document.querySelector("#caesar-key").innerText;
    let body = document.querySelector("#caesar-body");
    let res = caesar.decrypt(key, body.value);
    if (!res.success) return error(res.error)
    body.value = res.plaintext
    time_taken(start);
}

let caesar_solve = () => {
    let start = Date.now();
    let body = document.querySelector("#caesar-body");
    let res = caesar.solve(body.value);
    if (!res.success) return error(res.error)
    document.querySelector("#caesar-key").innerText = res.key;
    flash()
    body.value = res.plaintext
    time_taken(start);
}

// Affine

let affine_encrypt = () => {
    let start = Date.now();
    let key = document.querySelector("#affine-key").innerText.split(", ");
    key = {a: key[0], b: key[1]};
    let body = document.querySelector("#affine-body");
    let res = affine.encrypt(key, body.value);
    if (!res.success) return error(res.error)
    body.value = res.ciphertext;
    time_taken(start);
}

let affine_decrypt = () => {
    let start = Date.now();
    let key = document.querySelector("#affine-key").innerText.split(", ");
    key = {a: key[0], b: key[1]};
    let body = document.querySelector("#affine-body");
    let res = affine.decrypt(key, body.value);
    if (!res.success) return error(res.error)
    body.value = res.plaintext
    time_taken(start);
}

let affine_solve = () => {
    let start = Date.now();
    let body = document.querySelector("#affine-body");
    let res = affine.solve(body.value);
    if (!res.success) return error(res.error)
    document.querySelector("#affine-key").innerText = `${res.key["a"]}, ${res.key["b"]}`;
    flash()
    body.value = res.plaintext
    time_taken(start);
}

// Vigenere

let vigenere_encrypt = () => {
    let start = Date.now();
    let key = document.querySelector("#vigenere-key").innerText;
    let body = document.querySelector("#vigenere-body");
    let res = vigenere.encrypt(key, body.value);
    if (!res.success) return error(res.error)
    body.value = res.ciphertext
    time_taken(start);
}

let vigenere_decrypt = () => {
    let start = Date.now();
    let key = document.querySelector("#vigenere-key").innerText;
    let body = document.querySelector("#vigenere-body");
    let res = vigenere.decrypt(key, body.value);
    if (!res.success) return error(res.error)
    body.value = res.plaintext
    time_taken(start);
}

let vigenere_keylength = () => {
    let start = Date.now();
    let body = document.querySelector("#vigenere-body");
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
    let body = document.querySelector("#vigenere-body");
    let res = vigenere.solve(body.value);
    if (!res.success) return error(res.error);
    document.querySelector("#vigenere-key").innerText = res.key;
    flash()
    body.value = res.plaintext
    time_taken(start);
}