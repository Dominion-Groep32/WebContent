$(document).ready(function () {
    generateSrc();
    changeLanguage();
    $('#submit').on('click', dataStorage);
    $('#numberOfPlayers').on('change', dynamicInput);
});


//Localstorage of options
var dataStorage = function (event) {
    alert("Je wordt hierna normaal doorgestuurd naar spel");

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

//Hide and show the name inputs according to number of players
var dynamicInput = function () {
    var numberOfPlayers = $("input[name=number]:checked").val();
    var html = "";
    for (var i = 0; i < numberOfPlayers; i++) {
        html += "<div><label>'Player " + (i + 1) + ":</label><input type='text' required placeholder='Firstname Lastname' name='player" + (i + 1) + "' /></div>"
    }
    $("#nameOfPlayers").html(html);

    console.log(numberOfPlayers + " spelers");
};

//Generate the source of the images (shields)
var generateSrc = function(){
    for (var i= 2; i <= 6; i++){
        $('#numberOfPlayers').append('<label><input type="radio" required value='+[i]+' name="number"/><img src="assets/media/' + [i] + '.png"/></label>');
    }
};

//Change language of manual: Nederlands / English
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

