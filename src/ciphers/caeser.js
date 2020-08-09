const { decrypt } = require("./vigenere");

const alphabetLC = ("abcdefghijklmnopqrstuvwxyz").split("");
const alphabetUC = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
const frequency = require("../tools/frequency.js");

module.exports.encrypt = (key, body) => {
    key = parseInt(key);
    if (key === NaN && typeof key === "string") {
        if (key.length > 1) return {success: false, error: "Invalid Key"};
        key = alphabetUC.indexOf(key.toUpperCase());
        if (key === -1) return { "error": "Invalid Key"};
    }

    let ciphertext = "";
    for (let character of body) {
        if (alphabetLC.includes(character)) ciphertext += alphabetLC[(alphabetLC.indexOf(character) + key) % 26]
        else if (alphabetUC.includes(character)) ciphertext += alphabetUC[(alphabetUC.indexOf(character) + key) % 26]
        else ciphertext += character;
    }
    return {success: true, ciphertext, plaintext: body}
}

module.exports.decrypt = (key, body) => {
    key = parseInt(key);
    if (key === NaN && typeof key === "string") {
        if (key.length > 1) return {success: false, error: "Invalid Key"};
        key = alphabetUC.indexOf(key.toUpperCase());
        if (key === -1) return { "error": "Invalid Key"};
    }

    let plaintext = "";
    for (let character of body) {
        if (alphabetLC.includes(character)) {
            let k = alphabetLC.indexOf(character) - key;
            if (k < 0) k = 26 + k
            plaintext += alphabetLC[k % 26]
        }
        else if (alphabetUC.includes(character)) {
            let k = alphabetUC.indexOf(character) - key;
            if (k < 0) k = 26 + k
            plaintext += alphabetUC[k % 26]
        }
        else plaintext += character;
    }
    
    return {success: true, plaintext, ciphertext: body}
}

module.exports.solve = (body) => {
    let shifts = []
    for (let shift = 1; shift < 25; shift ++) {
        let decrypted = module.exports.decrypt(shift, body);
        let freq = frequency(decrypted.plaintext);
        let sumDifferences = freq.map(x => x.actualFrequency.difference).reduce((a, b) => a + b);
        shifts.push(sumDifferences);
    }
    let key = shifts.indexOf(Math.min(...shifts)) + 1;

    return key;
}