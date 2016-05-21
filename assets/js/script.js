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

//Ask if user is sure to close window
var showAlert = function() {
    return window.confirm("Are you sure?");
}
var testAlert = function(){
	alert(this.id);
}

//Quicktutorial op scherm laten verschijnen
var quickTutorial = function () {

    var id = '#dialog';

    //Get the screen height and width
    var popupHeight = $(document).height();
    var popupWidth = $(window).width();

    //Set height and width to popup to fill up the whole screen
    $('#popup').css({'width': popupWidth, 'height': popupHeight});

    //transition effect
    $('#popup').fadeIn(1000);
    $('#popup').fadeTo("slow", 0.8);

    //Get the window height and width
    var winH = $(window).height();
    var winW = $(window).width();

    //Set the popup window to center
    $(id).css('top', winH / 2 - $(id).height() / 2);
    $(id).css('left', winW / 2 - $(id).width() / 2);

    //transition effect
    $(id).fadeIn(2000);
    $(".wrap").addClass('blur');

    //if popup is clicked
    $('.window').click(function () {
        $(this).hide();
        $('.window').hide();
        $(".wrap").removeClass('blur');
    });

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
        $('.tabs ' + currentAttrValue).show().siblings().hide();
        $(this).parent('li').addClass('active').siblings().removeClass('active');
        e.preventDefault();
    });
};


var kaartenInHand = function(response){

	$("#handCards").empty();
 	var cardIdx;
 	for(cardIdx in response){
        var html = '';
        var src = 'images/' + response[cardIdx] + '.jpg';
        html += '<img alt="' + response[cardIdx] + '"  title="' + response[cardIdx] + '" src="' + src + '"  id="' + response[cardIdx] + '"/>';
        $("#handCards").append(html);  
	}
	 
}



var actieKaartenGeneren = function(response){
	var cardIdx;
	for(cardIdx in response){

	
		
		var html = '';
		if (cardIdx == 5) {html += "<br />";}
        var src = 'images/small/' + response[cardIdx] + '.png';
        html += '<em id="' + response[cardIdx] + 'counter"></em>';
        html += '<img alt="' + response[cardIdx] + '"  title="' + response[cardIdx] + '" src="' + src + '"  id="' + response[cardIdx] + '"/>';
     
        $("#deckCards").append(html);
        
    	}
	}



var toonHuidigSpeelVeld = function(response){
		
	console.log("response tester"+response);
	$("#playedCards").empty();
	
	var cardIdx;
	for(cardIdx in response){
		var html = '';
        var src = 'images/small/' + response[cardIdx] + '.png';
        html += '<img alt="' +  response[cardIdx] + '"  title="' +  response[cardIdx] + '" src="' + src + '"  id="' +  response[cardIdx] + '"/>';
     
        $("#playedCards").append(html);
	}}
	
var infoSpeler = function (result) {
	$('#usernames').empty();
	for (var i = 0; i < 4; i++) {
		$('#usernames').append(result[i] + "<br />");
	}
}

var kaartGlow = function (){
	kaart = this.id;
	$(this).addClass('glowKaart');
}

var stopInfo = function()
{
	$('#infoKaart').empty();
	}
var huidigeStatus = function(){
	huidigSpeelVeld();
	geefKaartenInHand();
	geefHuidigeWaarden();
}

var ajaxCalls = function(parameters){
	 $.ajax({
	        url: 'http://localhost:8080/Dominion/DominionServlet',
	        data: parameters,
	        type: 'GET'
	    })
}

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
    	trekKaartInHand();
    	geefKaartenInHand();
    	actieKaarten();
    	geefHuidigeWaarden();
    	
    	
    	
    });
}

var actieUitvoeren = function(){
	var gekozenKaart = this.id;
	if (gekozenKaart == "landgoed"){
		return;
	}
	console.log("hue hue");
    var parameters = {
    	kaart: gekozenKaart,
        operation: "actieUitvoeren"
    };

    $.ajax({
        url: 'http://localhost:8080/Dominion/DominionServlet',
        data: parameters,
        type: 'GET'
    }).done(function (response) {
    	huidigeStatus();
    	
        
        
     
    });
}
var geefKaartenInHand = function() {
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

var geefHuidigeWaarden = function(e) {
    var parameters = {
        operation: "huidigeWaarden"
    };

    $.ajax({
        url: 'http://localhost:8080/Dominion/DominionServlet',
        data: parameters,
        type: 'GET'
    }).done(function (response) {
        var result = JSON.parse(response);
        infoSpeler(result);
    });
}
var actieKaarten = function (e){
	 var parameters = {
		 operation: "actieKaartenGeneren" 
	 };

	 $.ajax({
		 	url: 'http://localhost:8080/Dominion/DominionServlet',
	        data: parameters,
	        type: 'GET'
	    }).done(function (response) {
		    	
	        var result = JSON.parse(response);
	        actieKaartenGeneren(result);
		       
	    });
}

var huidigSpeelVeld = function (){
	 var parameters = { 
			 operation: "toonSpeelVeld" };
	

	 $.ajax({
		 	url: 'http://localhost:8080/Dominion/DominionServlet',
	        data: parameters,
	        type: 'GET'
	    }).done(function (response) {
	        var result = JSON.parse(response);
	        toonHuidigSpeelVeld(result);
	        
	        
		       
	    });
}

var geldKaartenVanHandNaarSpeelVeld = function (){
	 var parameters = { 
			 operation: "brengGeldKaartenUitHandaarSpeelVeld" };
	

	 $.ajax({
		 	url: 'http://localhost:8080/Dominion/DominionServlet',
	        data: parameters,
	        type: 'GET'
	    }).done(function (response) {
	       
	       
	        
	        
		       
	    });
}


var kaartKopen = function() {
	var gekozenKaart = this.id;
	console.log('hier kom ik in :D');
	
    var parameters = {
    	kaart: gekozenKaart,
        operation: "kaartenKopen"
    };

    $.ajax({
        url: 'http://localhost:8080/Dominion/DominionServlet',
        data: parameters,
        type: 'GET'
    }).done(function (response) {
    	geefHuidigeWaarden();
        
        
     
    });
}

var trekKaartInHand = function() {
    var parameters = {
        operation: "trekKaartInHand"
    };

    $.ajax({
        url: 'http://localhost:8080/Dominion/DominionServlet',
        data: parameters,
        type: 'GET'
    }).done(function (response) {
    });
}

var geefInfoOverKaart = function(response) {
	
	 var gekozenKaart = this.id; 
	
    var parameters = {
    	kaart: gekozenKaart,
        operation: "infoOphalen"
    };

    $.ajax({
        url: 'http://localhost:8080/Dominion/DominionServlet',
        data: parameters,
        type: 'GET'
    }).done(function (response) {
        var result = JSON.parse(response);
        $("#infoKaart").empty();
        $("#infoKaart").append(result);

      
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
    	$("#playedCards").empty();	
    });
}




//
//-------------------AJAX-------------------

$(document).ready(function () {
    generateSrc();
    changeLanguage();

    $('#numberOfPlayers').on('change', dynamicInput);
    $('#submitPlayers').on('click', spelersOpslaan);
   
	$("#submitPlayers").on("click", pressSubmit);
	 //$('#submitPlayers').on('click', quickTutorial);
	$('#endTurn').on("click",stopBeurt);
	$('#endTurn').on("click",trekKaartInHand);
	$('#endTurn').on("click",geefKaartenInHand);
	$('#endTurn').on("click",geefHuidigeWaarden );
	
	$('#playMoney').on("click",geldKaartenVanHandNaarSpeelVeld);
	$('#playMoney').on("click",huidigSpeelVeld);
	$('#playMoney').on("click",geefKaartenInHand);
	$('#playMoney').on("click",geefHuidigeWaarden);
	
	$('body').on('mouseover',stopInfo)
	//$('body').on('click','#deckCards img', geefInfoOverKaart);
	//$('body').on('click','#handCards img ', geefInfoOverKaart);
	$('body').on('click','#deckCards img',kaartKopen);
	//$('body').on('click','#deckCards img', kaartGlow);
	$('body').on('click','#handCards img ', actieUitvoeren);
	
	

});