const {shell, remote} = require('electron');

$(document).ready(() => {
    $("#key-container").click(() => {
        $("#key-container").text("")
    })
    $(document).on('click', 'a[href^="http"]', function(event) {
        event.preventDefault();
        shell.openExternal(this.href);
    });
    $("#close").click(() => {
        let w = remote.getCurrentWindow();
        w.close();
    })
    $("#minimise").click(() => {
        let w = remote.getCurrentWindow();
        w.minimize();
    })

    $(".back").click(() => {
        $(".box-c").hide();
        $(".main").show();
    })
})