(function($, jQuery) {

	function init() {

		var gzoom;
		if (window.matchMedia("(max-width: 991px)").matches) {
			gzoom = 1;
		} else {
			gzoom = 0;
		}

		var userAgent = window.navigator.userAgent
		var isLinux = userAgent.indexOf('Linux') > -1
		var isWebKit = userAgent.indexOf('AppleWebKit') > -1
		var isPresto = userAgent.indexOf('Presto') > -1

	  var fenway = new google.maps.LatLng(83.94,2.829);
		var panoramaOptions = {
			position: fenway,
			scrollwheel: false,
			clickToGo: true,
			disableDefaultUI: true,
			pov: {
				heading: 110,
				pitch: 0,
			 	zoom: gzoom
			},
	    mode: (
	      Modernizr.webgl && !(isLinux && (isWebKit || isPresto)) ?
	        'webgl' :
	      Modernizr.canvas ?
	        'html5' :
	      // else
	        'html4'
	    )
		};
		var pano = new google.maps.StreetViewPanorama(document.getElementById('GoogleTrustedPanorama'),panoramaOptions);
		pano.setPano('08REEdwNz3IAAAQvO6TTMA');

		window.panoRotate = window.setInterval(function(){
			pano.setPov({heading: pano.getPov().heading - 0.05, pitch: pano.getPov().pitch});
		}, 17);

		/* ///////////////////////////////////////////////////// */
		var defaultTitel 	= $(document).attr('title');
		var startArea			= $('#currentAreaKey').text();
		var hotelKey			= $('#currentHotelKey').text();
		var hotelName			= $('#currentHotelName').text();
		var url						= window.location.href;
		var $vTour				= $('#vTour');

		var initialPano = $('#initialCoord').text();
		initialPano = initialPano.split(',');
		initialPano[1] = parseFloat(initialPano[1]);
		initialPano[2] = parseFloat(initialPano[2]);

		$(document).attr('title', [defaultTitel, $('#areaNav .areaChild[panoid="' + initialPano[0] + '"]').addClass('active').attr('areaName')].join(' - ') );

		$('.directLink').click(function(){
			ga('send', 'event', 'Visit Homepage', {
				eventCategory: 'Engagement: Visit Homepage',
				eventAction: 'AreaNavigation: DirectLink',
		    eventLabel: event.target.href,
		    transport: 'beacon'
			});
		});

		$('#areaNav .areaChild').click( function () {

			var $this = $(this)
			var key		= $this.attr('areaKey')
			var area	= $this.attr('areaName')

			$(document).attr('title', [defaultTitel, area].join(' - ') )
			$('#areaNav .areaChild.active').removeClass('active')
			$this.addClass('active')

			var newPano = $this.attr('coord')
			newPano = newPano.split(',')
			newPano[0] = parseFloat(newPano[0])
			newPano[1] = parseFloat(newPano[1])

			movePano($this.attr('panoID'), newPano[0], newPano[1]);

			ga('send', 'event', 'AreaNavigation: ' + hotelName, area , url, {
				'hotel': hotelName,
				'area' : area
			});
		});

		$('#actionBookNow').click( function () {
			ga('send', 'event', 'Book Now', {
				eventCategory: 'External link: Booking page',
				eventAction: 'Button click: #actionBookNow',
		    eventLabel: event.target.href,
		    transport: 'beacon'
			});
		});

		$('#fullscreenEnter').click( function () {
			ga('send', 'event', 'Enter fullscreen mode', {
				eventCategory: 'Engagement: Enter fullscreen',
				eventAction: 'Button click: #fullscreenEnter',
		    eventLabel: event.target.href,
		    transport: 'beacon'
			});
		});

		$('#fullscreenExit').click( function () {
			ga('send', 'event', 'Exit fullscreen mode', {
				eventCategory: 'Engagement: Return to last page',
				eventAction: 'Button click: #fullscreenExit',
		    eventLabel: event.target.href,
		    transport: 'beacon'
			});
		});

		$('#brandingLogo').click( function () {
			ga('send', 'event', 'Visit Brand', {
				eventCategory: 'Engagement: Visit directory page',
				eventAction: 'Image click: #brandingLogo',
		    eventLabel: event.target.href,
		    transport: 'beacon'
			});
		});

		window.movePano = function(panoID,head,pitch) {
			pano.setPov({
				heading: head,
		  	pitch: 	 pitch,
		  	zoom: 	 gzoom
			});
			pano.setPano(panoID);
		};
		/* ///////////////////////////////////////////////////// */
	}

	google.maps.event.addDomListener(window, 'load', init);

})(jQuery, jQuery);
