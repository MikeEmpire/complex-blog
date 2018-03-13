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
//= require_tree .

$(document).on('turbolinks:click', function(){
  // animate on fade out
  $('.page-content')
		.hide()
    .addClass('animated fadeOutUp')
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
  $('.grid').masonry({
    itemSelector: 'grid-item',
    percentPosition: true,
    columnWidth: '.grid-sizer',
    columnWidth: 200
  });

  /** Used Only For Touch Devices **/
  (function( window ) {

  	// for touch devices: add class cs-hover to the figures when touching the items
  	if( Modernizr.touch ) {

  		// classie.js https://github.com/desandro/classie/blob/master/classie.js
  		// class helper functions from bonzo https://github.com/ded/bonzo

  		function classReg( className ) {
  			return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
  		}

  		// classList support for class management
  		// altho to be fair, the api sucks because it won't accept multiple classes at once
  		var hasClass, addClass, removeClass;

  		if ( 'classList' in document.documentElement ) {
  			hasClass = function( elem, c ) {
  				return elem.classList.contains( c );
  			};
  			addClass = function( elem, c ) {
  				elem.classList.add( c );
  			};
  			removeClass = function( elem, c ) {
  				elem.classList.remove( c );
  			};
  		}
  		else {
  			hasClass = function( elem, c ) {
  				return classReg( c ).test( elem.className );
  			};
  			addClass = function( elem, c ) {
  				if ( !hasClass( elem, c ) ) {
  						elem.className = elem.className + ' ' + c;
  				}
  			};
  			removeClass = function( elem, c ) {
  				elem.className = elem.className.replace( classReg( c ), ' ' );
  			};
  		}

  		function toggleClass( elem, c ) {
  			var fn = hasClass( elem, c ) ? removeClass : addClass;
  			fn( elem, c );
  		}

  		var classie = {
  			// full names
  			hasClass: hasClass,
  			addClass: addClass,
  			removeClass: removeClass,
  			toggleClass: toggleClass,
  			// short names
  			has: hasClass,
  			add: addClass,
  			remove: removeClass,
  			toggle: toggleClass
  		};

  		// transport
  		if ( typeof define === 'function' && define.amd ) {
  			// AMD
  			define( classie );
  		} else {
  			// browser global
  			window.classie = classie;
  		}

  		[].slice.call( document.querySelectorAll( 'ul.grid > li > figure' ) ).forEach( function( el, i ) {
  			el.querySelector( 'figcaption > a' ).addEventListener( 'touchstart', function(e) {
  				e.stopPropagation();
  			}, false );
  			el.addEventListener( 'touchstart', function(e) {
  				classie.toggle( this, 'cs-hover' );
  			}, false );
  		} );

  	}

  })( window );

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
})
