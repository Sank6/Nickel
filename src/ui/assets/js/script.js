const {shell, remote} = require('electron');

$(document).ready(() => {
    $("#key-container").click(() => {
        $("#key-container").text("")
    })
    $('.box-c').click((e) => {
        if (!e.target.classList.contains("box-c") && e.target.tagName !== "H3") return;
        let h = e.currentTarget.style.height;
        if (h === "203px") {
            e.currentTarget.children[1].style.display = "none";
            e.currentTarget.style.height = "25px";
        }
        else {
            $(".box-c").each(function() {
                this.children[1].style.display = "none";
                this.style.height = "25px";
            })
            e.currentTarget.style.height = "203px";
            e.currentTarget.children[1].style.display = "block";
        }
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
})