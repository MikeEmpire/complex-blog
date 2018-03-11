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

document.addEventListener("turbolinks:load", function() {
	var main = document.querySelector('main');
	// Bind our listeners on the document object so we can intercept any anchors
	document.addEventListener('click', function(e) {
		var el = e.target;
		// Go up in the nodelist until we find a node with a href
		while (el && !el.href) {
			el = el.parentNode;
		}

		if (el) {
			e.preventDefault();
			history.pushState(null, null, el.href);
			changePage();

			return;
		}
	});

	var cache = {};

	// Fetches the html content of a page given its URL
	function loadPage(url) {
		var myHeaders = new Headers();
		myHeaders.append('x-pjax', 'yes');

		if (cache[url]) {
			return new Promise(function(resolve) {
				resolve(cache[url]);
			});
		}

		return fetch(url, {
			method: 'GET',
			headers: myHeaders,
		}).then(function(response) {
			cache[url] = response.text();
			return cache[url];
		});
	}

	function changePage() {
		// after the URL is already changed
		var url = window.location.href;

		loadPage(url).then(function(responseText) {
			var wrapper = document.createElement('div');
					wrapper.innerHTML = responseText;
			var oldContent = document.querySelector('.cc');
			var newContent = wrapper.querySelector('.cc');

			main.appendChild(newContent);
			animate(oldContent, newContent);
		});
	};

	function animate(oldContent, newContent) {
		oldContent.style.position = 'absolute';

		var fadeOut = oldContent.animate({
			opacity: [1, 0]
		}, 600);

		var fadeIn = newContent.animate({
			opacity: [0, 1]
		}, 600);

		fadeIn.onfinish = function() {
			oldContent.parentNode.removeChild(oldContent);
		};
	}

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
