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

//Hierdoor is gameInterface & play.html op dezelfde pagina gezet
var pressSubmit = function (event) {
    event.preventDefault();
    $("#step1").slideUp();
    $("#step1").addClass("hide");
    $("#step2").removeClass("hide");
    $("#step2").delay(1000).slideDown();

};

//Hide and show the name inputs according to number of players
var numberOfPlayers
var dynamicInput = function () {
    numberOfPlayers = $("input[name=number]:checked").val();
    var html = "";
    for (var i = 0; i < numberOfPlayers; i++) {
        html += "<div><label>'Player " + (i + 1) + ":</label><input type='text' required placeholder='Firstname Lastname' id='player" + (i + 1) + "' /></div>"
    }
    $("#nameOfPlayers").html(html);
    
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


var kaartenInHand = function(response){

	$("#handCards").empty();
	  for (var i = 0;  i < 5; i++) {
	        var html = '';
	        var src = 'images/' + response[i] + '.jpg';
	        html += '<img alt="' + response[i] + '"  title="' + response[i] + '" src="' + src + '"  id="' + response[i] + '"/>';
	        $("#handCards").append(html);  
	    }
}

var actieKaartenGeneren = function(response){

	for (var i = 0;  i < 10; i++) {
		
		var html = '';
		if (i == 5) {html += "<br />";}
        var src = 'images/small/' + response[i] + '.png';
        html += '<img alt="' + response[i] + '"  title="' + response[i] + '" src="' + src + '"  id="' + response[i] + '"/>';
     
        $("#deckCards").append(html);
        console.log(html);
    }
	}

var cardsInMiddle = function(e){
    var currentCardName = this.id;    
    $('#playedCards').append(this);
    $('#message').empty();
    $('#message').append('Player 1 heeft een ' + currentCardName + ' kaart gespeeld.');
};

var gekozenKaart = function(e) {
	
	
	
	Kopen(kaart);
};


//-------------------AJAX-------------------
var spelersOpslaan = function(e) {
	
    var spelerNaam1 = $("input#player1").val();
    var spelerNaam2 = $("input#player2").val();
    var spelerNaam3 = $("input#player3").val();
    var spelerNaam4 = $("input#player4").val();
    var spelerNaam5 = $("input#player5").val();
    var spelerNaam6 = $("input#player6").val();
    
    var parameters = {
        speler1: spelerNaam1,
        speler2: spelerNaam2,
        speler3: spelerNaam3,
        speler4: spelerNaam4,
        speler5: spelerNaam5,
        speler6: spelerNaam6,
        operation: "spelerToevoegen"
    };

    $.ajax({
        url: 'http://localhost:8080/Dominion/DominionServlet',
        data: parameters,
        type: 'GET'
    }).done(function (response) {
    	geefKaartenInHand();
    	actieKaarten();
    	
    	
    });
}


var geefKaartenInHand = function(e) {
    var parameters = {
        operation: "geefKaartenInHand"
    };

    $.ajax({
        url: 'http://localhost:8080/Dominion/DominionServlet',
        data: parameters,
        type: 'GET'
    }).done(function (response) {
        var result = JSON.parse(response);
        kaartenInHand(result);
        
     
    });
}
var actieKaarten = function (e){
	 var parameters = { operation: "actieKaartenGeneren" };

	 $.ajax({
		 	url: 'http://localhost:8080/Dominion/DominionServlet',
	        data: parameters,
	        type: 'GET'
	    }).done(function (response) {
		    	
	        var result = JSON.parse(response);
	        console.log(result);
	        actieKaartenGeneren(result);
		       
	    });
}

var Kopen = function(kaart) {
	
	var gekozenKaart = kaart;
    var parameters = {
    	kaart: gekozenKaart,
        operation: "kaartenKopen"
    };

    $.ajax({
        url: 'http://localhost:8080/Dominion/DominionServlet',
        data: parameters,
        type: 'GET'
    }).done(function (response) {
        console.log(response, JSON.parse(response));
        var result = JSON.parse(response);
        console.log(result);
    });
}

var stopBeurt = function(e){
var parameters = {
    	
        operation: "stopBeurt"
    };

    $.ajax({
        url: 'http://localhost:8080/Dominion/DominionServlet',
        data: parameters,
        type: 'GET'
    }).done(function (response) {
    });
}

//
//-------------------AJAX-------------------

$(document).ready(function () {
    generateSrc();
    changeLanguage();
    $('#submit').on('click', dataStorage);
    $('#numberOfPlayers').on('change', dynamicInput);
    $('#handCards img').on('click', cardsInMiddle);
    $('#deckCards img').on('click', gekozenKaart);
    $('#submitPlayers').on('click', spelersOpslaan)
	$("button").on("click", pressSubmit);
	$('#endTurn').on("click",stopBeurt)
	$('#endTurn').on("click",geefKaartenInHand)
	

});