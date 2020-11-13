module.exports = function(string) {
    return string.toUpperCase().replace(/[^A-Za-z]/g,"").replace(/\s/g,"");
}