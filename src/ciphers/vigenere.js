const alphabetLC = ("abcdefghijklmnopqrstuvwxyz").split("");
const alphabetUC = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");

const ioc = require("../tools/ioc.js");

Array.prototype.intersect = function(...a) {
    return [this,...a].reduce((p,c) => p.filter(e => c.includes(e)));
}

module.exports.getKeyLength = (body) => {
    let ioc = ioc(body);

    // Setup an object of all the potential factors
    let factorStore = [];

    // Find array intersections in the top 3 columnIOC
    let selection = ioc.sort((a, b) => b.columnIOC - a.columnIOC).slice(0, 3).map(x => x.factors);
    for (let columnCount of ioc) {
        for (let f of columnCount.factors) {
            factorStore.push(f);
        }
    }
    let f = Math.max(...[...new Set(factorStore.intersect(...selection))]);

    return f;
}

module.exports.encrypt = (key, body) => {
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
    return solved
}

module.exports.decrypt = (key, body) => {
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
    return solved
}