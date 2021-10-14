/* const $StickyFooter = document.querySelector('.StickyFooter')
$Intro = document.querySelector('.Intro')
IntroHeight = $Intro.offsetHeight;

const StuckFooter = function () {
  let WindowYOffset = window.pageYOffset;
  if (WindowYOffset >= IntroHeight) {
    $StickyFooter.classList.add('Stuck')
  } else {
    $StickyFooter.classList.remove('Stuck')
  }
} */

document.addEventListener("scroll", function () {
  //StuckFooter();
})

// set options when initializing butter.js
var options = {
  wrapperId: 'butter',
  wrapperDamper: 0.12,
  cancelOnTouch: true
};

// butter.init(options);

// Hamburger Menu

var ham = document.getElementsByClassName("Header__HamburgerIcon")[0];
var hmenu = document.getElementsByClassName("Header__HamburgerMenu")[0];

ham.addEventListener("click", function () {
  // make the icons flip
  ham.classList.toggle("flip");
  // open menu items
  hmenu.classList.toggle("opener");
});

ham.addEventListener("keypress", function (e) {
  if(e.which == 13) {
    // make the icons flip
    ham.classList.toggle("flip");
    // open menu items
    hmenu.classList.toggle("opener");
  }
});

// Select all links with hashes
$('a[href*="#"]')
// Remove links that don't actually link to anything
.not('[href="#"]')
.not('[href="#0"]')
.click(function (event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, "") ==
    this.pathname.replace(/^\//, "") &&
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $("html, body").animate({
          scrollTop: target.offset().top
        },
        300,
        function () {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            // Checking if the target was focused
            return false;
          } else {
            $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        }
      );
    }
  }
});


( function() {
	'use strict';

	if ( 'querySelector' in document && 'addEventListener' in window ) {
		var body = document.body;

		body.addEventListener( 'mousedown', function() {
			body.classList.add( 'using-mouse' );
		} );

		body.addEventListener( 'keydown', function() {
			body.classList.remove( 'using-mouse' );
		} );
	}

} )();