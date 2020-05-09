let { encrypt, decrypt } = require("../../ciphers/vigenere.js")

$(document).ready(() => {
    $("#ciphertext").bind('input propertychange', function() {
        if ($("#key").val() == "") return;
        let decoded = decrypt($("#key").val(), $("#ciphertext").val());
        $("#plaintext").val(decoded)
    });
    $("#plaintext").bind('input propertychange', function() {
        if ($("#key").val() == "") return;
        let encoded = encrypt($("#key").val(), $("#plaintext").val());
        $("#ciphertext").val(encoded)
    });
    $("#encode").click(() => {
        if ($("#key").val() == "") return;
        let encoded = encrypt($("#key").val(), $("#plaintext").val());
        $("#ciphertext").val(encoded)
    });
    $("#decode").click(() => {
        if ($("#key").val() == "") return;
        let decoded = decrypt($("#key").val(), $("#ciphertext").val());
        $("#plaintext").val(decoded)
    });
});