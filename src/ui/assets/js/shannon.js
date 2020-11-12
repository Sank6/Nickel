const shannon = require("./assets/js/tools/shannon.js");

$(document).ready(() => {
    let entropy = shannon(document.querySelector("#body").value);
    $(".shannon").text(`${entropy.toFixed(3)} bits`)
    
    $("#body").on('change keyup paste', function() {
        let entropy = shannon(document.querySelector("#body").value);
        $(".shannon").text(`${entropy.toFixed(3)} bits`)
    })
})