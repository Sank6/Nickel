const ngrams = require("./assets/js/tools/ngrams.js");
$(document).ready(() => {
    function update() {
        let cipher = $("#cipher-selector").text().toLowerCase()
        let bigrams = ngrams(2, $(`#${cipher}-body`).val())
        let bigram_map = bigrams.map(x => 
            `<span style="color: rgb(${255-(255 * x[1]/bigrams[0][1])}, ${(255 * x[1]/bigrams[0][1])}, 20)">${x[0]}: ${x[1]}</span>`
            ).join("<br />")
        $(".bigrams").html(bigram_map)
    }

    update()

    $(".body").on('change keyup paste', update)
    $("button").on('click', update)
})