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

    $('.scroll-box').hover(function() { 
        $(this).addClass('hovered');
      }, function() {
        $(this).removeClass('hovered');
      });
})

function change() {
    let ciphers = ["Caesar", "Affine", "Vigenere"]
    let index = (ciphers.indexOf($("#cipher-selector").text()) + 1) % ciphers.length
    let cipher = ciphers[index]
    $("#cipher-selector").text(cipher)
    cipher = cipher.toLowerCase();
    $(".cipher-shell").hide()
    $(`#${cipher}`).show()
}

/* Slow scroll */

window.addEventListener('DOMMouseScroll', wheel, false);
window.onmousewheel = document.onmousewheel = wheel;

function wheel(event) {
    var delta = 0;
    if (event.wheelDelta) delta = event.wheelDelta / 120;
    else if (event.detail) delta = -event.detail / 3;

    handle(delta);
    if (event.preventDefault) event.preventDefault();
    event.returnValue = false;
}

function handle(delta) {
    var time = 600;
	var distance = 100;
    
    $('.hovered').stop().animate({
        scrollTop: $(".hovered").scrollTop() - (distance * delta)
    }, time );
}