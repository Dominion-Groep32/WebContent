//Localstorage of options
var dataStorage = function(event) {
	// alert("Je wordt hierna normaal doorgestuurd naar spel");

	// event.preventDefault();

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
	}
};

// Ask if user is sure to close window
var showAlert = function() {
	return window.confirm("Are you sure?");
}

//Quicktutorial op scherm laten verschijnen
var quickTutorial = function() {

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
    $(".wrapper").addClass('blur');

    //if popup is clicked
    $('.window').click(function () {
        $(this).hide();
        $('.window').hide();
        $(".wrapper").removeClass('blur');
    });

};

// Hierdoor is gameInterface & play.html op dezelfde pagina gezet
var pressSubmit = function(event) {
	event.preventDefault();
	$("#step1").slideUp();
	$("#step1").addClass("hide");
	$("#step2").removeClass("hide");
	$("#step2").delay(1000).slideDown();

};

// Hide and show the name inputs according to number of players
var numberOfPlayers
var dynamicInput = function() {
	numberOfPlayers = $("input[name=number]:checked").val();
	var html = "";
	for (var i = 0; i < numberOfPlayers; i++) {
		html += "<div><label>'Player "
				+ (i + 1)
				+ ":</label><input type='text' required placeholder='Firstname Lastname' id='player"
				+ (i + 1) + "' /></div>"
	}
	$("#nameOfPlayers").html(html);

};

// Generate the source of the images (shields)
var generateSrc = function() {
	for (var i = 2; i <= 4; i++) {
		$('#numberOfPlayers').append(
				'<label><input type="radio" required value=' + [ i ]
						+ ' name="number"/><img src="assets/media/' + [ i ]
						+ '.png"/></label>');
	}

};

// Change language of manual: Nederlands / English
var changeLanguage = function() {
	$('.tabs .tab-links a').on(
			'click',
			function(e) {
				var currentAttrValue = $(this).attr('href');
				$('.tabs ' + currentAttrValue).show().siblings().hide();
				$(this).parent('li').addClass('active').siblings().removeClass(
						'active');
				e.preventDefault();
			});
};

var kaartenInHand = function(response) {

	$("#handCards").empty();
	var i;
	for (i in response) {
		var html = '';
		var src = 'images/' + response[i] + '.png';
		html += '<img alt="' + response[i] + '"  title="' + response[i]
				+ '" src="' + src + '"  id="' + response[i] + '"/>';
		$("#handCards").append(html);
	}

}

var actieKaartenGeneren = function(response) {
	var i;
	for (i in response) {

		var html = '';
		if (i == 5) {
			html += "<br />";
		}
		var src = 'images/small/' + response[i] + '.png';
		html += '<em id="' + [ i ] + 'counter"></em>';
		html += '<img alt="' + response[i] + '"  title="' + response[i]
				+ '" src="' + src + '"  id="' + response[i] + '"/>';

		$("#deckCards").append(html);

	}
}

var stapelsOpvragen = function(response) {
	var i;
	for (i in response) {
		var plaats = (i + "counter");
		$('#' + plaats).empty();
		$('#' + plaats).append(response[i]);
	}
}

var toonHuidigSpeelVeld = function(response) {
	$("#playedCards").empty();
	var i;
	for (i in response) {
		var html = '';
		var src = 'images/' + response[i] + '.png';
		html += '<img alt="' + response[i] + '"  title="' + response[i]
				+ '" src="' + src + '"  id="' + response[i] + '"/>';
		$("#playedCards").append(html);
	}
}

var infoSpeler = function(response) {
	$('#usernames').empty();
	var i;
	for (i in response) {
		$('#usernames').append(response[i] + "<br />");
	}
}

var kaartGlow = function() {
	kaart = this.id;
	$(kaart).addClass('glowKaart');
}

var stopInfo = function() {
	$("#kaartNaam").empty();
	$('#infoKaart').empty();
}
var huidigeStatus = function() {
	huidigSpeelVeld();
	geefKaartenInHand();
	geefHuidigeWaarden();
}

var testfunctie = function(){
	var everyChild = document.querySelectorAll("#deckCards img");
	for (var i = 0; i<everyChild.length; i++) {
	    everyChild[i].classList.addClass('glowKaart');
	}
}


// -------------------AJAX-------------------

var spelersOpslaan = function(e) {
	var spelers = "";
	for (i = 0; i < $("input[name=number]:checked").val(); i++) {
		spelers += $("input#player" + (i + 1)).val() + ",";
	}
	var parameters = {
		spelers : spelers,
		operation : "spelerToevoegen"
	};

	$.ajax({
		url : 'http://localhost:8080/Dominion/DominionServlet',
		data : parameters,
		type : 'GET'
	}).done(function(response) {

		geefKaartenInHand();
		actieKaarten();
		geefHuidigeWaarden();
	});
}

var geefKaartenDieJeKuntKopen = function() {
	var parameters = {
		operation : "KaartenDieJeKuntKopen"
	};

	$.ajax({
		url : 'http://localhost:8080/Dominion/DominionServlet',
		data : parameters,
		type : 'GET'
	}).done(function(response) {
		
		var result = JSON.parse(response);
		console.log(result);
		
	});
}



var stapelsMaken = function() {
	var parameters = {
		operation : "stapelsGeneren"
	};

	$.ajax({
		url : 'http://localhost:8080/Dominion/DominionServlet',
		data : parameters,
		type : 'GET'
	}).done(function(response) {
		var result = JSON.parse(response);
		stapelsOpvragen(result);
	});
}

var actieUitvoeren = function() {
	var gekozenKaart = this.id;
	if (gekozenKaart == "landgoed") {
		return;
	}
	var parameters = {
		kaart : gekozenKaart,
		operation : "actieUitvoeren"
	};

	$.ajax({
		url : 'http://localhost:8080/Dominion/DominionServlet',
		data : parameters,
		type : 'GET'
	}).done(function(response) {
		huidigeStatus();
	});
}

var geefKaartenInHand = function() {
	var parameters = {
		operation : "geefKaartenInHand"
	};

	$.ajax({
		url : 'http://localhost:8080/Dominion/DominionServlet',
		data : parameters,
		type : 'GET'
	}).done(function(response) {
		var result = JSON.parse(response);
		kaartenInHand(result);
	});
}

var geefHuidigeWaarden = function(e) {
	var parameters = {
		operation : "huidigeWaarden"
	};

	$.ajax({
		url : 'http://localhost:8080/Dominion/DominionServlet',
		data : parameters,
		type : 'GET'
	}).done(function(response) {
		var result = JSON.parse(response);
		infoSpeler(result);
	});
}
var actieKaarten = function(e) {
	var parameters = {
		operation : "actieKaartenGeneren"
	};

	$.ajax({
		url : 'http://localhost:8080/Dominion/DominionServlet',
		data : parameters,
		type : 'GET'
	}).done(function(response) {

		var result = JSON.parse(response);
		actieKaartenGeneren(result);
		stapelsMaken();
		geefKaartenDieJeKuntKopen();
		

	});
}

var huidigSpeelVeld = function() {
	var parameters = {
		operation : "toonSpeelVeld"
	};

	$.ajax({
		url : 'http://localhost:8080/Dominion/DominionServlet',
		data : parameters,
		type : 'GET'
	}).done(function(response) {
		var result = JSON.parse(response);
		toonHuidigSpeelVeld(result);
	});
}

var geldKaartenVanHandNaarSpeelVeld = function() {
	var parameters = {
		operation : "brengGeldKaartenUitHandaarSpeelVeld"
	};

	$.ajax({
		url : 'http://localhost:8080/Dominion/DominionServlet',
		data : parameters,
		type : 'GET'
	}).done(function(response) {
	});
}

var kaartKopen = function() {
	var gekozenKaart = this.id;

	var parameters = {
		kaart : gekozenKaart,
		operation : "kaartenKopen"
	};

	$.ajax({
		url : 'http://localhost:8080/Dominion/DominionServlet',
		data : parameters,
		type : 'GET'
	}).done(function(response) {
		geefHuidigeWaarden();
		stapelsMaken();
	});
}

var trekKaartInHand = function() {
	var parameters = {
		operation : "trekKaartInHand"
	};

	$.ajax({
		url : 'http://localhost:8080/Dominion/DominionServlet',
		data : parameters,
		type : 'GET'
	}).done(function(response) {
	});
}

var geefInfoOverKaart = function(response) {
	var gekozenKaart = this.id;
	$("#kaartNaam").append("Kaart: " + gekozenKaart)

	var parameters = {
		kaart : gekozenKaart,
		operation : "infoOphalen"
	};
	$.ajax({
		url : 'http://localhost:8080/Dominion/DominionServlet',
		data : parameters,
		type : 'GET'
	}).done(function(response) {
		var result = JSON.parse(response);
		$("#infoKaart").empty();
		$("#infoKaart").append(result);
	});
}

var stopBeurt = function(e) {
	var parameters = {
		operation : "stopBeurt"
	};

	$.ajax({
		url : 'http://localhost:8080/Dominion/DominionServlet',
		data : parameters,
		type : 'GET'
	}).done(function(response) {
		$("#playedCards").empty();
	});
}

// -------------------AJAX-------------------

$(document).ready(function() {
	generateSrc();
	changeLanguage();

	$('#numberOfPlayers').on('change', dynamicInput);

	$('#submitPlayers').on('click', spelersOpslaan);
	$("#submitPlayers").on("click", pressSubmit);
	$('#submitPlayers').on('click', quickTutorial);

	$('#endTurn').on("click", stopBeurt);
	$('#endTurn').on("click", geefKaartenInHand);
	$('#endTurn').on("click", geefHuidigeWaarden);

	$('#playMoney').on("click", geldKaartenVanHandNaarSpeelVeld);
	$('#playMoney').on("click", huidigSpeelVeld);
	$('#playMoney').on("click", geefKaartenInHand);
	$('#playMoney').on("click", geefHuidigeWaarden);

	$('body').on('mouseover', stopInfo)
	$('body').on('mouseover', '#deckCards img', geefInfoOverKaart);
	$('body').on('mouseover', '#handCards img ', geefInfoOverKaart);
	$('body').on('click', '#deckCards img', kaartKopen);
	$('body').on('click', '#deckCards img', kaartGlow);
	$('body').on('click', '#handCards img', geefKaartenDieJeKuntKopen);
	$('body').on('click', '#handCards img ', actieUitvoeren);
	$('body').on('click', '#deckCards img', testfunctie);
	

});