const alphabetUC = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");

module.exports = function(string) {
    let N = string.length; // Total string length
    let iocTotal = 0;
    for (let letter of alphabetUC) {
        let n = string.split(letter).length - 1; // Number of occurences of letter
        iocTotal += (n * (n - 1)) / (N * (N - 1));
    }
    return iocTotal;
}