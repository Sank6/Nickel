const alphabetLC = ("abcdefghijklmnopqrstuvwxyz").split("");
const alphabetUC = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");
const { solve } = require("./caesar.js");
const ioc = require("../tools/ioc.js");
const clean = require("../utils/clean.js");

Array.prototype.intersect = function(...a) {
    return [this,...a].reduce((p,c) => p.filter(e => c.includes(e)));
}

module.exports.getKeyLength = (body) => {
    let i = ioc(body);

    // Setup an object of all the potential factors
    let factorStore = [];

    // Find array intersections in the top 3 columnIOC
    let selection = i.sort((a, b) => b.columnIOC - a.columnIOC).slice(0, 3).map(x => x.factors);
    for (let columnCount of i) {
        for (let f of columnCount.factors) {
            factorStore.push(f);
        }
    }
    let f = Math.max(...[...new Set(factorStore.intersect(...selection))]);

    return f;
}

module.exports.encrypt = (key, body) => {
    if (!key) return {success: false, error: "Invalid Key"};
    let converted = [];
    for (let i = 0; i < key.length; i++) {
        let k = key.charAt(i)
        if (alphabetLC.includes(k)) converted.push(alphabetLC.indexOf(k));
        else if (alphabetUC.includes(k)) converted.push(alphabetUC.indexOf(k));
    }
    
    let solved = "";
    let positionInBody = 0;
    while (positionInBody < body.length) {
        let positionInKey = 0;
        while (positionInKey < key.length && positionInBody < body.length) {
            let k = body.charAt(positionInBody);
            if (alphabetLC.includes(k)) {
                solved += alphabetLC[((alphabetLC.indexOf(k)) + converted[positionInKey]) % 26];
            } else if (alphabetUC.includes(k)) {
                solved += alphabetUC[((alphabetUC.indexOf(k)) + converted[positionInKey]) % 26];
            } else {
                solved += k;
                positionInKey --;
            }
            positionInKey ++;
            positionInBody ++;
        }
    }
    if (body === solved) return {success: false, error: "Invalid Key"};
    return {success: true, plaintext: body, ciphertext: solved}
}

module.exports.decrypt = (key, body) => {
    if (!key) return {success: false, error: "Invalid Key"};
    let converted = [];
    for (let i = 0; i < key.length; i++) {
        let k = key.charAt(i)
        if (alphabetLC.includes(k)) converted.push(alphabetLC.indexOf(k));
        else if (alphabetUC.includes(k)) converted.push(alphabetUC.indexOf(k));
    }
    
    let solved = "";
    let positionInBody = 0;
    while (positionInBody < body.length) {
        let positionInKey = 0;
        while (positionInKey < key.length && positionInBody < body.length) {
            let k = body.charAt(positionInBody);
            if (alphabetLC.includes(k)) {
                let pos = ((alphabetLC.indexOf(k)) - converted[positionInKey]) % 26;
                if (pos < 0) pos += 26;
                solved += alphabetLC[pos];
            } else if (alphabetUC.includes(k)) {
                let pos = ((alphabetUC.indexOf(k)) - converted[positionInKey]) % 26;
                if (pos < 0) pos += 26;
                solved += alphabetUC[pos];
            } else {
                solved += k;
                positionInKey --;
            }
            positionInKey ++;
            positionInBody ++;
        }
    }
    if (body === solved) return {success: false, error: "Invalid Key"};
    return {success: true, plaintext: solved, ciphertext: body}
}

module.exports.solve = (body) => {
    let keyLength = module.exports.getKeyLength(body);
    
    if (!keyLength || isNaN(keyLength) || !isFinite(keyLength)) return {success: false, error: "Unable to solve"}
    let cleaned = clean(body);

    // Select ever nth character from ciphertext
    let regex = new RegExp("(.)".repeat(keyLength), "g");

    // Iterate over all the columns, and solve the caesar on each
    let finalKey = "";
    for (let n = 0; n < keyLength; n ++) {
        let column = Array.from(cleaned.matchAll(regex), m => m[n + 1]).join("");
        let {key} = solve(column);
        finalKey = finalKey.concat(alphabetUC[key])
    }

    let {plaintext} = module.exports.decrypt(finalKey, body)

    return {success: true, plaintext, ciphertext: body, key: finalKey}
}