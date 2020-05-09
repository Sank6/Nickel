const alphabetLC = ("abcdefghijklmnopqrstuvwxyz").split("");
const alphabetUC = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");

module.exports.encrypt = (key, body) => {
    key = parseInt(key);
    if (key === NaN && typeof key === "string") {
        if (key.length > 1) return {success: false, error: "Invalid Key"};
        key = alphabetUC.indexOf(key.toUpperCase());
        if (key === -1) return { "error": "Invalid Key"};
    } else if (typeof key !== "string") return {success: false, error: "Invalid Key"};

    let ciphertext = "";
    for (let character of body) {
        if (character in alphabetLC) ciphertext += alphabetLC[alphabetLC.indexOf(character) + 1]
        else if (character in alphabetUC) ciphertext += alphabetUC[alphabetUC.indexOf(character) + 1]
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
    } else if (typeof key !== "string") return {success: false, error: "Invalid Key"};

    let plaintext = "";
    for (let character of body) {
        if (character in alphabetLC) plaintext += alphabetLC[alphabetLC.indexOf(character) - 1]
        else if (character in alphabetUC) plaintext += alphabetUC[alphabetUC.indexOf(character) - 1]
        else plaintext += character;
    }
    return {success: true, plaintext, ciphertext: body}
}