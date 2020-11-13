const ngrams = require("./assets/js/tools/ngrams.js");
$(document).ready(() => {
    function update() {
        let cipher = $("#cipher-selector").text().toLowerCase()
        for (n = 2; n <= 4; n ++) {
            let ng = ngrams(n, $(`#${cipher}-body`).val())
            let ng_map = ng.slice(0, 30).map(x => 
                `<span style="color: rgb(${255-(255 * x[1]/ng[0][1])}, ${(255 * x[1]/ng[0][1])}, 20)">${x[0]}: ${x[1]}</span>`
                ).join("<br />")
            $(`.${["", "", "bigrams", "trigrams", "quadgrams"][n]}`).html(ng_map)
        }
    }

    update()

    $(".body").on('change keyup paste', update)
    $("button").on('click', update)
})