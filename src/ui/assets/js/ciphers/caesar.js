const alphabetLC = ("abcdefghijklmnopqrstuvwxyz").split("");
const alphabetUC = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
const frequency = require("../tools/frequency.js");

module.exports.encrypt = (key, body) => {
    if (isNaN(parseInt(key))) {
        if (alphabetUC.includes(key.toUpperCase())) {
            key = alphabetUC.indexOf(key.toUpperCase());
        }
        else return {success: false, error: "Invalid Key"};
    } else key = parseInt(key)

    let ciphertext = "";
    for (let character of body) {
        if (alphabetLC.includes(character)) ciphertext += alphabetLC[(alphabetLC.indexOf(character) + key) % 26]
        else if (alphabetUC.includes(character)) ciphertext += alphabetUC[(alphabetUC.indexOf(character) + key) % 26]
        else ciphertext += character;
    }
    return {success: true, ciphertext, plaintext: body}
}

module.exports.decrypt = (key, body) => {
    if (isNaN(parseInt(key))) {
        if (alphabetUC.includes(key.toUpperCase())) {
            key = alphabetUC.indexOf(key.toUpperCase());
        }
        else return {success: false, error: "Invalid Key"};
    } else key = parseInt(key)

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
    
    // Carry out each shift
    for (let shift = 0; shift < 25; shift ++) {
        let decrypted = module.exports.decrypt(shift, body);
        let freq = frequency(decrypted.plaintext);

        // Add the differences between the actual frequency of the letter and the expected frequency
        // of all the letters
        let sumDifferences = freq.map(x => x.actualFrequency.difference).reduce((a, b) => a + b);
        shifts.push(sumDifferences);
    }

    // Return the shift with the lowest difference
    let key = shifts.indexOf(Math.min(...shifts));
    
    let {plaintext} = module.exports.decrypt(key, body);

    return {success: true, plaintext, ciphertext: body, key}
}