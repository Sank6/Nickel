const mean = require("../utils/mean.js");
const getIOC = require("../utils/getIOC.js");
const clean = require("../utils/clean.js");

const factors = number => Array
    .from(Array(number + 1), (_, i) => i)
    .filter(i => number % i === 0 && i !== 1);

module.exports = (body, maxColumns = 30) => {
    body = clean(body);
    let returnData = []

    // Iterate over every possible number of columns
    for (let columns = 1; columns < maxColumns+1; columns++) {

        // Size of Column (character count per column)
        let i = Math.floor(body.length / columns);
        let columnIOCArray = [];

        // Select ever nth character from ciphertext
        let regex = new RegExp("(.)".repeat(columns), "g");

        // Iterate over all the columns, and collect the IOCs of each of them
        for (let n = 0; n < columns; n ++) {
            let column = Array.from(body.matchAll(regex), m => m[n + 1]).join("");
            columnIOCArray.push(getIOC(column))
        }

        returnData.push({columnCount: columns, columnIOC: mean(columnIOCArray)})
    }
    return returnData
}