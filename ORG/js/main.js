$(document).ready( function () {

	var defaultTitel 	= $(document).attr('title')
	var startArea			= $('#currentAreaKey').text()
	var hotelKey			= $('#currentHotelKey').text()
	var hotelName			= $('#currentHotelName').text()
	var url						= window.location.href
	var $vTour				= $('#vTour')

	var initialPano = $('#initialCoord').text()
	initialPano = initialPano.split(',')
	initialPano[1] = parseFloat(initialPano[1])
	initialPano[2] = parseFloat(initialPano[2])

	$(document).attr('title', [defaultTitel, $('#areaNav .areaChild[panoid="' + initialPano[0] + '"]').addClass('active').attr('areaName')].join(' - ') )

	$('.directLink').click(function(){
		ga('send', 'event', 'Visit Homepage')
	})

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

		movePano($this.attr('panoID'), newPano[0], newPano[1])

		ga('send', 'event', 'AreaNavigation: ' + hotelName, area , url, {
			'hotel': hotelName
		,	'area' : area
		} )
	});

	function initializeGMBV() {

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

		var panoramaOptions = {
			scrollwheel: false
		, disableDefaultUI: true
		, pov: {
				heading: initialPano[1]
			, pitch: initialPano[2]
			, zoom: gzoom
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

		pano = new google.maps.StreetViewPanorama(document.getElementById('gooPano'), panoramaOptions);
		pano.setPano(initialPano[0]);

		window.movePano = function(panoID,head,pitch) {
			pano.setPov({
				heading: head
		  , pitch: 	 pitch
		  , zoom: 	 gzoom
			});
			pano.setPano(panoID);
		}
	}

	google.maps.event.addDomListener(window, 'load', initializeGMBV);
} )
