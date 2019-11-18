matchesVisible = false;
menuVisible = false;
alertVisible = false;
alertInterval = 10;
facts = ["Sanath Jayasuriya has more ODI wickets than Shane Warne.", "Dhaka’s Sher-e-Bangla stadium and Bangabandhu stadium have hosted more ODIs than Lord’s.", "The highest number of runs scored in an over is not 36. It’s 77.", "Adam Gilchrist holds the record for playing the most number of Tests straight after debut.", "Ishant Sharma is responsible for all the three highest scores made by a batsman against India in the 21 st century.", "On 12 th January 1964, Indian spinner Bapu Nadkarni bowled 21 consecutive maiden overs vs England at Chennai.", "Chris Martin and B.S Chandrasekhar have taken more Test wickets in their career than the test runs they scored.", "Wilfred Rhodes took 4,204 wickets in First Class cricket.", "Sir Jack Hobbs scored 199 centuries in his First Class career."];
window.addEventListener("load", function(){
		setTimeout(function(){
		$('#loading-screen').animate({'top': '+=100'}, 'slow', function(){
			$('#loading-screen').animate({'top': '-150%'}, 'slow', function(){
				$('#loading-screen').hide();
				$('#main').show("slow");
				slider();
				setTimeout(function(){
					showAlert(facts[Math.floor(Math.random() * facts.length)]);
					alertInterval = setInterval(function(){
						if (!alertVisible) {
							showAlert(facts[Math.floor(Math.random() * facts.length)]);
						}
					}, 15000)
				}, 2000)
			});
		});
	}, 600);
});

$(document).ready(function(){
	$('html, body').scrollTop(0);
	$('#logo2, #go-to-top, #alert-box, #img-view, #img-view img, #main').hide();

	layout();

	$('#menu a').click(function(event){
		event.preventDefault();
	});

	$('#menu .custom-a').click(function(){
		scrollTo($(this).attr('data-href'));
	});

	$('#logo1, #logo2, #go-to-top, #home').click(function(event){
		event.preventDefault();
		$('body, html').animate({scrollTop: 0});
	});

	$('#matches-btn').click(function(){
		if (!matchesVisible) {
			showMatches();
		} else{
			hideMatches();
		}
	});

	$('#main').click(function(){
		if (matchesVisible) {
			hideMatches();
		}
	});

	$(document).keydown(function(event){
		if (event.keyCode == 27) {
			if (matchesVisible) {
				hideMatches();			
			}
			if (menuVisible) {
				hideMenu();
			}
		}
	});

	$('#alert-box button').click(function(){
		hideAlert();
	});

	$('#alert-box h4').click(function(){
		hideAlert();
		clearInterval(alertInterval);
	});

	$('.img-click').click(function(){
		showImage($(this).attr('src'));
	});

	$('#img-view button').click(function(){
		hideImage();
	});

	$('#img-view').click(function(event){
		if (!$(event.target).closest('img').length) {
			hideImage();
		}
	});

	$('#show-menu').click(function(){
		if (!menuVisible) {
			showMenu();
		}
	});

	$('#main-menu a').click(function(event){
		event.preventDefault();
		alert("This is just a demo wbsite for the home page.");
	});

	$('#main-menu button').click(function(){
		hideMenu();
	});
});

function layout(){
	$('#matches-menu').css('left', -$(this).outerWidth());
	$('#main-menu').css('right', -$(this).outerWidth());

	$('#alert-box p').html(facts[Math.floor(Math.random() * facts.length)]);

	$('#matches-menu .matches-row').each(function(offset){
		offset++;
		$(this).css('background-image', 'url("images/matches/' + offset + '.png")');
	});

}

$(document).scroll(function(){
	$scrollTop = $(this).scrollTop();
	var PlxSpeed = 50;
	var PlxSpeedF = (1-PlxSpeed/100);
	$('#head').css('background-position', 'center -' + Math.abs($scrollTop - $('#head').offset().top) * PlxSpeedF + 'px');

	menuAlt($scrollTop);
	if ($scrollTop != 0) {
		$('#go-to-top').fadeIn();
	} else {
		$('#go-to-top').fadeOut();
	}
});

function menuAlt($scrollTop){
	if ($scrollTop >= $('#menu').height() + 50){
		$('#menu').addClass('color');
		$('#logo2').fadeIn();
		$('#menu a').addClass('color');
		$('#menu a:after').css('background', 'rgba(0,0,0,0.75)');
	}

	else{
		$('#menu').removeClass('color');
		$('#logo2').fadeOut();
		$('#menu a').removeClass('color');
		$('#menu a:after').css('background', '#f1f1f1');
	}
}

function showMatches(){
	$('#matches-btn').attr('disabled', true).animate({'left': $('#matches-menu').outerWidth() - 10}, 400, function(){
		$('#matches-btn i').html('keyboard_arrow_up');
	});
	$('#matches-menu').animate({'left': 0}, 400, function(){
		$('#matches-btn').attr('disabled', false);
		$('#main').addClass('grayscale');
	});
	matchesVisible = true;
}

function hideMatches(){
	$('#matches-btn').attr('disabled', true).animate({'left': '-10px'}, 400, function(){
		$('#matches-btn i').html('keyboard_arrow_down');
	});
	$('#matches-menu').animate({'left': -$(this).outerWidth()}, 400, function(){
		$('#matches-btn').attr('disabled', false);
		$('#main').removeClass('grayscale');
	});
	matchesVisible = false;
}

function showAlert(text){
	$('#alert-box p').html(text);
	$('#alert-box').show("slow");
	alertVisible = true;
}

function hideAlert(){
	$('#alert-box').slideUp();
	alertVisible = false;
}

function scrollTo(target){
	$('html, body').animate({scrollTop: $(target).offset().top - $('#menu').outerHeight()}, "slow");
}

function showImage(path){
	$('#img-view img').attr('src', path);
	$('#img-view').slideDown(400, function(){
		$('body').addClass('overflow-hidden');
		$('#img-view img').show(400);
	});

	$(document).keydown(function(event){
		event.stopPropagation();
		if (event.keyCode == 27) {
			hideImage();
        }
	});
}

function hideImage(){
	$('#img-view img').hide(400, function(){
		$('#img-view').slideUp(400);
		$('body').removeClass('overflow-hidden');
	});
}

function slider(){
	$('#slider img').each(function(offset){
		$(this).animate({'left': $(window).width() * offset + 'px'});
	});
	sliderImgCounter = $('#slider img').length;
	sliderCounter = 0;
	timePerSlide = 3000;
	sliderInterval = setInterval(nextSlide, timePerSlide);
}

function nextSlide(){
	if (sliderCounter >= sliderImgCounter) {
		clearInterval(sliderInterval);
		slider();
	} else{
		$('#slider img').animate({'left': '-=' + $(window).width() + 'px'}, "slow");
	}
	sliderCounter++;
}

function showMenu(){
	$('#main-menu').animate({'right': 0}, 600, function(){
		$('#main').addClass('grayscale');
	});
	menuVisible = true;
}

function hideMenu(){
	$('#show-menu').attr('disabled', true);
	$('#main-menu').animate({'right': -$(this).outerWidth()}, 600, function(){
		$('#main').removeClass('grayscale');
	});
	menuVisible = false;
}