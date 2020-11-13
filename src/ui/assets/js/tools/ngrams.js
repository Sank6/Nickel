const clean = require("../utils/clean.js");

module.exports = (n, body) => {
    body = clean(body)
    if (!body || !n) return []
    let index = body.length - n + 1;
    let nstore = []

    for (let i = 0; i < index; i++) {
        nstore[i] = body.slice(i, i + n)
    }

    let nstore_obj = {};
    for (let ngram of nstore) {
        if (ngram in nstore_obj)
            nstore_obj[ngram] ++
        else nstore_obj[ngram] = 1
    }

    return Object.entries(nstore_obj).sort((a, b) => b[1] - a[1]).filter(a => a[1] !== 1)
}