$( document ).ready(function() {
    "use strict";

    // Detecting IE
    var oldIE;
    if ($('html').is('.ie6, .ie7, .ie8, .ie9')) {
        oldIE = true;
    }

    if (oldIE) {
        $('input, textarea').placeholder({ customClass: 'my-placeholder' });
    }

    var fixmeTop = $('form').offset().top;

    var formFixed = function() {
    	var currentScroll = $(window).scrollTop();
	    var width = $(window).width();
	    if (width > 974) {
		    if (currentScroll + 20 >= fixmeTop) {
		        $('form').css({
		            position: 'fixed',
		            top: '0'
		        });
		    } else {
		        $('form').css({
		            position: 'relative'
		        });
		    }
	    }
    };

	$(window).scroll(function() {
	    formFixed();
	});

	var stepsWidths = function() {
		if ($(window).width() < 800) {
			$('.text-middle.step1').css('height', $('img.img-step').eq(0)[0].height);
			$('.text-middle.step2').css('height', $('img.img-step').eq(1)[0].height);
			$('.text-middle.step3').css('height', $('img.img-step').eq(2)[0].height);
		} else {
			$('.text-middle.step1').css('height', '144px');
			$('.text-middle.step2').css('height', '123px');
			$('.text-middle.step3').css('height', '147px');
		}
	};

	stepsWidths();

	$(window).resize(function() {
		stepsWidths();
		formFixed();
	});

    var totalItems = $('.item').length;
	var currentIndex = $('div.active').index() + 1;
	$('.num').html(''+currentIndex+'/'+totalItems+'');

    $('.carousel').carousel({interval: 15000});

    $('#myCarousel').on('slid.bs.carousel', function() {
	    currentIndex = $('div.active').index() + 1;
	   	$('.num').html(''+currentIndex+' / '+totalItems+'');
	});

    var fillCurrency = function(currency, rates) {
		$('tr.' + currency).find('td').eq(1).empty().append(rates[currency].we_buy_rate);
		$('tr.' + currency).find('td').eq(2).empty().append(rates[currency].we_sell_rate);
		$('tr.' + currency).find('td').eq(3).empty().append(rates[currency].average_rate);
	};

	var fillRates = function(rates) {
		fillCurrency("EUR", rates);
		fillCurrency("USD", rates);
		fillCurrency("CHF", rates);
		fillCurrency("GBP", rates);
	};

	var getRates = function() {

		$.ajax({
		    type: "GET",
		    dataType: 'jsonp',
		    url: "https://api.internetowykantor.pl/api/v2/rates/jsonp",
		    crossDomain : true,
		})
	    .done(function( data ) {
	    	fillRates(data.body.rates);
	    })
	    .fail( function(xhr, textStatus, errorThrown) {
	        console.log(xhr.responseText, textStatus);
	    });

	};

	getRates();

 	setTimeout(function next() {

		getRates();

	    setTimeout(next, 10000);

	}, 10000);


});
