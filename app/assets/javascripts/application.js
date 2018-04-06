// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require rails-ujs
//= require turbolinks
//= require bootstrap-sprockets
//= require ckeditor/init
//= require_tree .

$(document).on('turbolinks:click', function(){
  // animate on fade out
  $('.page-content')
		.hide()
    .addClass('animated zoomOut')
    .off('webkitAnimationEnd oanimationend msAnimationEnd animationend');
});

$(document).on('page:fetch', function() {
  $(".spinner").show();
});

$(document).on('page:change', function() {
  $(".spinner").hide();
});

$(document).on('turbolinks:load', function(event) {
  // animation fade on page load
	$(".spinner").hide();
	if (event.originalEvent.data.timing.visitStart) {
		$('.page-content')
    .addClass('animated fadeIn')
    .one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
      $('.page-content').removeClass('animated');
    });
	} else {
		$('.page-content').removeClass('hide');
	}

  // initialize masonry
  var $grid = $('.grid').masonry({
    itemSelector: 'grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer',
    columnWidth: 200
  });

  // initialize masonry after images are loaded
  $grid.imagesLoaded().progress( function() {
    $grid.masonry('layout');
  });

	// Navigation Javascript
	(function() {
		var container = document.querySelector( 'div.container' ),
			triggerBttn = document.getElementById( 'trigger-overlay' ),
			navLinks = document.querySelectorAll('.overlay ul li a'),
			overlay = document.querySelector('div.overlay'),
			closeBttn = document.querySelector('button.overlay-close');
			transEndEventNames = {
				'WebkitTransition': 'webkitTransitionEnd',
				'MozTransition': 'transitionend',
				'OTransition': 'oTransitionEnd',
				'msTransition': 'MSTransitionEnd',
				'transition': 'transitionend'
			},
			transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ],
			support = { transitions : Modernizr.csstransitions };

		function toggleOverlay() {
			if( classie.has( overlay, 'open' ) ) {
				classie.remove( overlay, 'open' );
				classie.remove( container, 'overlay-open' );
				classie.add( overlay, 'close' );
				var onEndTransitionFn = function( ev ) {
					if( support.transitions ) {
						if( ev.propertyName !== 'visibility' ) return;
						this.removeEventListener( transEndEventName, onEndTransitionFn );
					}
					classie.remove( overlay, 'close' );
				};
				if( support.transitions ) {
					overlay.addEventListener( transEndEventName, onEndTransitionFn );
				}
				else {
					onEndTransitionFn();
				}
			}
			else if( !classie.has( overlay, 'close' ) ) {
				classie.add( overlay, 'open' );
				classie.add( container, 'overlay-open' );
			}
		}

		navLinks.forEach(function(elem) {
			elem.addEventListener('click', toggleOverlay)
		})
		triggerBttn.addEventListener( 'click', toggleOverlay );
		closeBttn.addEventListener( 'click', toggleOverlay );
	})();
});
