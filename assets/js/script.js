$(document).ready(function () {

    changeLanguage();
    $('#submit').on('click', dataStorage);
    $('#numberOfPlayers').on('change', switches);
});

var dataStorage = function (event) {
    event.preventDefault();

    var gameOptions = {
        gameType: $('input[name=gameType]:checked').val(),
        numberOfPlayers: $("input[name=number]:checked").val(),
        player1: $("input[name=player1]").val(),
        player2: $("input[name=player2]").val(),
        player3: $("input[name=player3]").val(),
        player4: $("input[name=player4]").val(),
        player5: $("input[name=player5]").val(),
        player6: $("input[name=player6]").val()
    };

    if (typeof (Storage) !== "undefined") {
        localStorage.setItem("gameOptions", JSON.stringify(gameOptions));
    }
};

var switches = function() {

    switch ($("input[name=number]:checked".val())){
    case "3players":
        console.log("Gelukt!");
        break;
    case "4players":
        console.log("Gelukt!");
        break;
    case "5players":
        console.log("Gelukt!");
        break;
    case "6players":
        console.log("Gelukt!");
        break;
    }
};









var changeLanguage = function () {
    $('.tabs .tab-links a').on('click', function (e) {
        var currentAttrValue = $(this).attr('href');

        // Show/Hide Tabs
        $('.tabs ' + currentAttrValue).show().siblings().hide();

        // Change/remove current tab to active
        $(this).parent('li').addClass('active').siblings().removeClass('active');

        e.preventDefault();
    });
};


/*
 $(document).ready(function () {

 // Generate image sources
 generateSrc();


 });

 var numberOfPlayers = ['2players','3players', '4players', '5players', '6players'];

 var generateSrc = function() {
 for (var i = 0, len = numberOfPlayers.length; i < len; i++) {
 $('.sources').append('<figure><img src="../media' + numberOfPlayers[i] + '.png" alt="' + numberOfPlayers[i]
 + '" title="' + numberOfPlayers[i] + '" /><figcaption>' + numberOfPlayers[i] + '</figcaption></figure>');
 }
 };


 /!*<div>  <label>Player 2:</label>
 <input type="text" id="player2first" name="player2"/>
 <input type="text" id="player2last" name="player2"/></div>*!/


 var input = document.createElement("input");
 input.type = "text";
 input.id = "player" + figure.id + "first";
 input.name = "player" + figure.id;
 nameplayers.appendChild(input); // put it into the DOM
 input.type = "text";
 input.id = "player" + figure.id + "last";
 nameplayers.appendChild(input); // put it into the DOM



 /!*
 var addLogo = function () {
 $("#options img").attr("src", "assets/media/player" + $(this).attr("id") + ".jpg");
 };*!/

 */

