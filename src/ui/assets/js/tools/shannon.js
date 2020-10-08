function log(val) {
    return Math.log(val) / Math.log(2);
}

function p(x, i) {
    return x[i] / Object.values(x).reduce((a, b) => a + b, 0)
}

module.exports = (body) => {
    body = body.toLowerCase();
    let x = {};
    for (let letter of body) {
        if (Object.keys(x).includes(letter)) {
            x[letter] ++
        } else {
            x[letter] = 1
        }
    }

    let h = 0;
    for (let i in x) {
        h += p(x, i) * log(1/p(x, i))
    }
    return h;
}