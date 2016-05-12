//Localstorage of options
var dataStorage = function (event) {
    //alert("Je wordt hierna normaal doorgestuurd naar spel");

    //event.preventDefault();

    var gameOptions = {
        gameType: $('input[name=gameType]:checked').val(),
        numberOfPlayers: $("input[name=number]:checked").val(),
        player1: $("input[name=player1]").val(),
        player2: $("input[name=player2]").val(),
        player3: $("input[name=player3]").val(),
        player4: $("input[name=player4]").val()
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
var generateSrc = function () {
    for (var i = 2; i <= 4; i++) {
        $('#numberOfPlayers').append('<label><input type="radio" required value=' + [i] + ' name="number"/><img src="assets/media/' + [i] + '.png"/></label>');
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

/**
 * Created by Maxim
 */

var deckCardsArray = ['adventurer', 'alchemist', 'ambassador', 'bureaucrat', 'cellar', 'chancellor', 'chapel', 'councilroom', 'feast', 'festival', 'gardens', 'library', 'market', 'mine', 'moat', 'moneylender', 'smithy', 'spy', 'thief', 'throneroom', 'village', 'witch', 'woodcutter', 'workshop'];
var handCardsArray = ['copper', 'copper', 'estate', 'copper', 'copper', 'estate', 'copper', 'copper', 'estate', 'copper'];

var makeDeck = function (e) {

    deckCardsArray.sort(function () {
        return 0.5 - Math.random()
    });
    handCardsArray.sort(function () {
        return 0.5 - Math.random()
    });

    //Generate deckCards
    for (var i = 0, len = 10; i < len; i++) {
        var html = '';

        if (i == 5) {
            html += "<br />";
        }

        //Generate img src
        var src = 'images/small/' + deckCardsArray[i] + '.png';
        console.log(src);
        html += '<img alt="' + deckCardsArray[i] + '"  title="' + deckCardsArray[i] + '" src="' + src + '" />';
        $("#deckCards").append(html);

        console.log(html);
    }

    //Generate handCards
    for (var i = 0, len = 5; i < len; i++) {

        var html = '';

        //Generate img src
        var src = 'images/' + handCardsArray[i] + '.jpg';
        console.log(src);
        html += '<img alt="' + handCardsArray[i] + '"  title="' + handCardsArray[i] + '" src="' + src + '"  id="' + handCardsArray[i] + '"/>';
        $("#handCards").append(html);

        console.log(html);
    }
};

/*var test = function(e){

 var currentCard = $(this).attr("id");

 switch (currentCard) {
 case "card1":
 $("#card1").animate({bottom: '+=160px'}, 500);
 break;
 case "card2":
 $("#card2").animate({bottom: '+=160px'}, 500);
 break;
 case "card3":
 $("#card3").animate({bottom: '+=160px'}, 500);
 break;
 case "card4":
 $("#card4").animate({bottom: '+=160px'}, 500);
 break;
 case "card5":
 $("#card5").animate({bottom: '+=160px'}, 500);
 alert("hello!");
 break;
 }
};*/

var cardsInMiddle = function(e){
    var currentCardName = this.id;

    alert(currentCardName);
};

var infoDeckCards = function(e) {

};

var enlargeCards = function(e) {
    
};

//-------------------AJAX-------------------
var savePlayers = function(e) {
	
	switch (numberOfPlayers) {
	case 3:
		
		break;
		
	case 4:
		
		break;

	default:
		
		break;
	}
	
    var spelerNaam = $("input#naam").val();
    var parameters = {
        spelerNaam: spelerNaam,
        operation: "addPlayer"
    };

    $.ajax({
        url: 'http://localhost:8080/Dominion/DominionServlet',
        data: parameters,
        type: 'GET'
    }).done(function (response) {
        console.log(response, JSON.parse(response));
    });
}
//-------------------AJAX-------------------

$(document).ready(function () {
    generateSrc();
    changeLanguage();
    makeDeck();
    $('#submit').on('click', dataStorage);
    $('#numberOfPlayers').on('change', dynamicInput);
    $("#handCards img").on('click',cardsInMiddle);
    $('#sendName').on('click', savePlayers);
    $('#submit').on('click', savePlayers);

    //$("#handCards").on('click', test);

    //$("#card1").on('click',function(){
    //    $("#card1").animate({bottom: '+=160px'}, 500);
    //    alert("hello!");
    //})
});