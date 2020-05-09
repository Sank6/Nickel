const remote = require('electron').remote

$(document).ready(() => {
    if (localStorage.getItem("ciphertext")) {
        $('#ciphertext').val(localStorage.getItem("ciphertext"))
    } else {
        $('#hidden-nav').css("visibility", "hidden");
    }
    $("#submit").click(() => {
        localStorage.setItem("ciphertext", $('#ciphertext').val());
        location.reload()
    })
    $("#close").click(() => {
        let w = remote.getCurrentWindow();
        w.close();
    })
    $("#minimise").click(() => {
        let w = remote.getCurrentWindow();
        w.minimize();
    })
})