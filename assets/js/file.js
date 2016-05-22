$(document).ready(function () {

    $("button").on("click", pressSubmit);
});

var pressSubmit = function (event) {
    event.preventDefault();
    alert("Hallo iedereen");

    $("#step1").slideUp();
    $("#step1").addClass("hide");
    $("#step2").removeClass("hide");
    $("#step2").delay(1000).slideDown();

};

