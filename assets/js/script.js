//Localstorage of options
var dataStorage = function(event) {

	var gameOptions = {
		gameType : $('input[name=gameType]:checked').val(),
		numberOfPlayers : $("input[name=number]:checked").val(),
		player1 : $("input[name=player1]").val(),
		player2 : $("input[name=player2]").val(),
		player3 : $("input[name=player3]").val(),
		player4 : $("input[name=player4]").val()
	};

	if (typeof (Storage) !== "undefined") {
		localStorage.setItem("gameOptions", JSON.stringify(gameOptions));
	};
};

var toonVoorAlert = function (idNaam ,tweedeIdNaam){
		var id = ('#'+idNaam);
		var tweedeId = ('#'+tweedeIdNaam);
	    $(tweedeId).css({'width': $(window).width(), 'height':  $(document).height()});
	    $(tweedeId).fadeIn(1000);
	    $(id).css('top', $(window).height() / 2 - $(id).height() / 2);
	    $(id).css('left', $(window).width() / 2 - $(id).width() / 2);
	    $(id).fadeIn(2000);
	    $(".wrapper").addClass('blur');
};

var uitlegSpel = function() {
    toonVoorAlert("dialog","");
    $('.window').click(function () {
        $(this).hide();
        $('.window').hide();
        $(".wrapper").removeClass('blur');
    });
};

var alertPopup = function() {
	toonVoorAlert("alert","secretDiv");
	};
	
var kiesKaartAnder = function(e){
	e.preventDefault();
	toonVoorAlert("speelVeld","kiesKaartAndereSpeler");
};

	

// Hierdoor is gameInterface & play.html op dezelfde pagina gezet
var doorgaanNaarSpeelVeld = function(e) {
	e.preventDefault();
	$("#step1").slideUp();
	$("#step1").addClass("hide");
	$("#step2").removeClass("hide");
	$("#step2").delay(1000).slideDown();
	uitlegSpel();

};

// Hide and show the name inputs according to number of players
var numberOfPlayers;
var aantalSpelersOpvragen = function() {
	numberOfPlayers = $("input[name=number]:checked").val();
	var html = "";
	for (var i = 0; i < numberOfPlayers; i++) {
		html += "<div><label>'Player "+ (i + 1)+ ":</label><input type='text' required placeholder='Firstname Lastname' id='player"+ (i + 1) + "' /></div>"
		};
	$("#nameOfPlayers").html(html);

};

var generateSrc = function() {
	for (var i = 2; i <= 4; i++) {
		$('#numberOfPlayers').append('<label><input type="radio" required value=' + [ i ]+ ' name="number"/><img src="assets/media/' + [ i ]+ '.png"/></label>');};
};

var taalAanpassen = function () {
    $('.tab-links a').on('click', function (e) {
        e.preventDefault();
        var currentLanguage = $(this).attr('href');
        $('.tabs ' + currentLanguage).show().siblings().hide();
        $(this).parent('li').addClass('active').siblings().removeClass('active');
    });
};

var toonKaartenInHand = function(response) {

	$("#handCards").empty();
	var i;
	for (i in response) {
		var html = '';
		var src = 'images/' + response[i] + '.png';
		html += '<li><a href="#"><img alt="' + response[i] + '"  title="' + response[i]+ '" src="' + src + '"  id="' + response[i] + '"/></a></li>';
		$("#handCards").append(html);
	};
};

var actieKaartenGeneren = function(response) {
	var i;
	for (i in response) {
		var html = '';
		if (i == 5) {html += "<br />";}
		var src = 'images/small/' + response[i] + '.png';
		html += '<span id="' + [i] + 'counter"></span>';
		html += '<img alt="' + response[i] + '"  title="' + response[i]+ '" src="' + src + '"  id="' + response[i] + '"/>';
		$("#deckCards").append(html);
	};
};

var stapelsOpvragen = function(response) {
	var i;
	for (i in response) {
		var plaats = (i + "counter");
		$('#' + plaats).empty();
		$('#' + plaats).append(response[i]);
	};
};

var toonHuidigSpeelVeld = function(response) {
	$("#playedCards").empty();
	var i;
	for (i in response) {
		var html = '';
		var src = 'images/' + response[i] + '.png';
		html += '<li><a href="#"><img alt="' + response[i] + '"  title="' + response[i]+ '" src="' + src + '"  id="' + response[i] + '"/></a></li>';
		$("#playedCards").append(html);
	};
};

var infoSpeler = function(response) {
	$('#usernames').empty();
	var i;
	for (i in response) {$('#usernames').append(response[i] + "<br />");}
};

var stopInfo = function() {
	$("#kaartNaam").empty();
	$('#infoKaart').empty();
};

var huidigeStatus = function() {
	huidigSpeelVeld();
	geefKaartenInHand();
	geefHuidigeWaarden();
};

var verwijderGlow = function(){
	var gebieden = ["deckCards","playedCards","handCards","victoryCards","treasureCards"];
	for(i=0;i<gebieden.length;i++){verwijderGlowFunctie(gebieden[i]);};
};

var verwijderGlowFunctie = function(naam){
	
	var alleIds = document.querySelectorAll("#"+naam +" img");
	for (var i = 0; i<alleIds.length; i++) {
	    alleIds[i].classList.remove('glowKaart');
	};
};

var toonDeKaartenDieJeKuntKopen = function(response){
	var i;
	for (i in response){
		if (response[i] == "koper"){
			window.setInterval(function(){$(id).toggleClass('geldKaart3');},1000);
		}
		var id = ('#' + response[i]);
		
		var parent = ($(id).parent());
		if (!$(parent).hasClass("geenGlow")){$(id).addClass('glowKaart');
		window.setInterval(function(){$(id).toggleClass('glowKaart');},1000);
		};
	};
	$('#playedCards').removeClass('glowKaart');
	$('li a img').removeClass('glowKaart');
	
};


var toonDiv = function(e){
	if ($('#step1').hasClass('hide')){
		e.preventDefault();
		alertPopup();
	};
};

var verbergDiv = function(){
    $('#secretDiv').addClass('hide');
    $(".wrapper").removeClass('blur');
    $('#secretDiv').fadeOut(1000);
	$('#secretDiv').fadeTo("slow");
};

var terugNaarStart = function(){
	javascript:location.href='index.html';
};

var specialeActieFunctie = function(response) {
	$("#speelVeld").empty();
	
	var i = 0;
	for (i in response) {
		var html = '';
		var src = 'images/' + response[i] + '.png';
		html += '<img alt="' + response[i] + '"  title="' + response[i]	+ '" src="' + src + '"  id="' + response[i] + '"/>';
		$("#speelVeld").append(html);
		
	};
}
var toonVorigeActies = function(response) {
	console.log(response);
	$('#berichtActie').empty();
	$('#berichtActie').append(response[0]);
	
	var i = 1;
	 for(var i=1 ; i<response.length;i++){
		var html = '';
		var src = 'images/' + response[i] + '.png';
		html += '<img alt="' + response[i] + '"  title="' + response[i]	+ '" src="' + src + '"  id="' + response[i] + '"/>';
		$("#speelVeld").append(html);
		
		
	};
}


var uitgaan = function(){
	 $('#kiesKaartAndereSpeler').addClass('hide');
	    $(".wrapper").removeClass('blur');
	    $('#kiesKaartAndereSpeler').fadeOut(1000);
		$('#kiesKaartAndereSpeler').fadeTo("slow");
		huidigeStatus();
}




// -------------------AJAX------------------- //



var spelersOpslaan = function(e) {
	var spelers = "";
	for (i = 0; i < $("input[name=number]:checked").val(); i++) {
		spelers += $("input#player" + (i + 1)).val() + ",";
	};
	
	var parameters = {spelers : spelers,operation : "spelerToevoegen"};
	$.ajax({url : '/Dominion/DominionServlet',data : parameters,type : 'GET'}).done(function(response) {
		geefActieKaarten();
		huidigeStatus();
	});
};

var geefKaartenDieJeKuntKopen = function() {
	var parameters = {operation : "KaartenDieJeKuntKopen"};
	$.ajax({url : '/Dominion/DominionServlet',data : parameters,type : 'GET'}).done(function(response) {
		toonDeKaartenDieJeKuntKopen(JSON.parse(response));
	});
};

var stapelsMaken = function() {
	var parameters = {operation : "stapelsGeneren"};
	$.ajax({url : '/Dominion/DominionServlet',data : parameters,type : 'GET'}).done(function(response) {
		stapelsOpvragen(JSON.parse(response));
	});
};

var actieUitvoeren = function() {
	$('#berichtActie').empty();
	$('#speelVeld').empty();
	var gekozenKaart = this.id;
	
	var parameters = {kaart : gekozenKaart,operation : "actieUitvoeren"};
	$.ajax({url : '/Dominion/DominionServlet',data : parameters,type : 'GET'}).done(function(response) {
		if(response.length !=0)
		{var result = JSON.parse(response)
			
		if(result[0] == "speciaal" && result[3] == 'huidigeSpeler' ){
			$('#berichtActie').append(result[2]);
			toonVoorAlert("speelVeld","kiesKaartAndereSpeler");
			doeSpecialeActieFunctie();
		};}
		
		huidigeStatus();
		geefKaartenDieJeKuntKopen();
		
		
	});
};

var geefKaartenInHand = function() {
	var parameters = {operation : "geefKaartenInHand"};

	$.ajax({url : '/Dominion/DominionServlet',data : parameters,type : 'GET'}).done(function(response) {
		toonKaartenInHand(JSON.parse(response));
	});
};

var geefHuidigeWaarden = function(e) {
	var parameters = {operation : "huidigeWaarden"};
	$.ajax({url : '/Dominion/DominionServlet',data : parameters,type : 'GET'}).done(function(response) {
		console.log(response);
		infoSpeler(JSON.parse(response));
	});
};
var geefActieKaarten = function(e) {
	var parameters = {operation : "actieKaartenGeneren"};
	$.ajax({url : '/Dominion/DominionServlet',data : parameters,type : 'GET'}).done(function(response) {
		actieKaartenGeneren(JSON.parse(response));
		stapelsMaken();
	});
};

var huidigSpeelVeld = function() {
	var parameters = {operation : "toonSpeelVeld"};
	$.ajax({url : '/Dominion/DominionServlet',data : parameters,type : 'GET'}).done(function(response) {
		toonHuidigSpeelVeld(JSON.parse(response));
	});
};

var geldKaartenVanHandNaarSpeelVeld = function() {
	var parameters = {operation : "brengGeldKaartenUitHandaarSpeelVeld"};
	$.ajax({url : '/Dominion/DominionServlet',data : parameters,type : 'GET'}).done(function(response) {
		
		geefHuidigeWaarden();
		huidigeStatus();
		geefKaartenDieJeKuntKopen();
	});
};

var kaartKopen = function() {
	var gekozenKaart = this.id;
	var parameters = {kaart : gekozenKaart,operation : "kaartenKopen"};
	$.ajax({url : '/Dominion/DominionServlet',data : parameters,type : 'GET'}).done(function(response) {
		geefHuidigeWaarden();
		stapelsMaken();
		verwijderGlow();
		geefKaartenDieJeKuntKopen();
	});
};

var trekKaartInHand = function() {
	var parameters = {operation : "trekKaartInHand"};
	$.ajax({url : '/Dominion/DominionServlet',data : parameters,type : 'GET'})
};

var geefInfoOverKaart = function(response) {
	var gekozenKaart = $(this).attr("id");
	var parameters = {kaart : gekozenKaart,operation : "infoOphalen"};
	$.ajax({url : '/Dominion/DominionServlet',data : parameters,type : 'GET'}).done(function(response) {
		$("#infoKaart").append(JSON.parse(response));
	});
};

var stopBeurt = function(e) {
	var parameters = {operation : "stopBeurt"};
	$.ajax({url : '/Dominion/DominionServlet',data : parameters,type : 'GET'}).done(function(response) {
		geefKaartenInHand();
		geefHuidigeWaarden();
		verwijderGlow();
		
		
	});
};

var geefActiesVorigeSpeler = function(){
	var parameters = {operation : "vorigeActies"};
	$.ajax({url : '/Dominion/DominionServlet',data : parameters,type : 'GET'}).done(function(response) {
		$("#speelVeld").empty();
		toonVorigeActies(JSON.parse(response))
		toonVoorAlert("speelVeld","kiesKaartAndereSpeler");
		
		
	})
		
}

var tweedeActieFase = function(){
	var gekozenKaart = $(this).attr("id");
	var parameters = {kaart: gekozenKaart,operation : "tweedeActieUitvoeren"};
	$.ajax({url : '/Dominion/DominionServlet',data : parameters,type : 'GET'}).done(function(response) {
		doeSpecialeActieFunctie();
		});
	};


var doeSpecialeActieFunctie = function() {
	var parameters = {operation : "special"};

	$.ajax({url : '/Dominion/DominionServlet',data : parameters,type : 'GET'}).done(function(response) {
		var result = JSON.parse(response);
		 specialeActieFunctie(JSON.parse(response));
	});
};

// -------------------AJAX-------------------

$(document).ready(function() {
	generateSrc();
	taalAanpassen();

	$('#numberOfPlayers').on('change', aantalSpelersOpvragen);
	$('#submitPlayers').on('click', spelersOpslaan);
	$('#submitPlayers').on('click', doorgaanNaarSpeelVeld);
	$('#endTurn').on('click',geefActiesVorigeSpeler);
	$('#endTurn').on('click', stopBeurt);
	
	$('#playMoney').on('click', geldKaartenVanHandNaarSpeelVeld);

	$('body').on('mouseover', stopInfo)
	$('body').on('mouseover', '#deckCards img ,#handCards img,#victoryCards img,#treasureCards img', geefInfoOverKaart);
	$('body').on('click', '#deckCards img,#victoryCards img,#treasureCards img', kaartKopen);
	$('body').on('click', '#handCards img ', actieUitvoeren);
	$('body').on('click', '#speelVeld img ', tweedeActieFase);
	
	
	$('#home').on('click',toonDiv);
	$('#stoppen').on('click',terugNaarStart);
	$('#doorgaan').on('click',verbergDiv);
	$('#bevestig').on('click',uitgaan);
	
	

});