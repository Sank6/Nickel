module.exports = function(string) {
    return string.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"]/g,"").replace(/\s/g,"");
}