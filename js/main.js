(function() {

  $('a[href*=#]:not([href=#])').click(function() {
    console.log('////////////////////////\nclick captured.\n////////////////////////');
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

      if (target.length) {
        $('html,body').stop();
        var n = target.offset().top,
          speed = Math.abs($(window).scrollTop() - n) / 4;

        if (speed > 1200) speed = 1200;

        $('html,body').animate({
            scrollTop: n
        }, speed);

        return false;
      }
    }
  });

    var $imgWindow = $('#imgWindow');

    $imgWindow.click(function() {

        $imgWindow.addClass('active');
        setTimeout(function() {
            $imgWindow.css('width', '1px');
            $imgWindow.animate({
                height: $(window).height()
            }, 1000);

            $('#closeTour').addClass('active');
            $('#tourBranding').removeClass('hidesidenav');
            window.clearInterval(window.panoRotate);
        }, 1000);
    });

    var $closeTour = $('#closeTour');

    $closeTour.click(function() {
        $closeTour.removeClass('active');
        $('#tourBranding').addClass('hidesidenav');
        $imgWindow.css('width', '100%');
        $imgWindow.animate({
            height: $(window).height() * 0.7
        }, function() {
            $imgWindow.removeClass('active');
        })
    });

    $(document).ready(function() {
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 2, // Creates a dropdown of 15 years to control year

            // The title label to use for the month nav buttons
            labelMonthNext: 'Nächster Monat',
            labelMonthPrev: 'Vorheriger Monat',

            // The title label to use for the dropdown selectors
            labelMonthSelect: 'Wähle einen Monat',
            labelYearSelect: 'Wähle ein Jahr',

            // Months and weekdays
            monthsFull: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            weekdaysFull: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            weekdaysShort: ['Son', 'Mon', 'Die', 'Mi', 'Do', 'Fre', 'Sam'],

            // Materialize modified
            weekdaysLetter: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],

            // Today and clear
            today: 'Heute',
            clear: 'Leeren',
            close: 'Wählen'
        });

        $('select').material_select();
    });

    $(document).ready(checkTermin);
    $("#wunschtermin").change(checkTermin);

    function checkTermin() {
        var $this;

        if (this.checked) {
            $('#wunschterminMore').slideDown();
        } else {
            $('#wunschterminMore').slideUp();
        }
    }

    $(document).ready(checkRueckruf);
    $("#rueckruf").change(checkRueckruf);

    function checkRueckruf() {
        var $this;

        if (this.checked) {
            $('#rueckrufMore').slideDown();
        } else {
            $('#rueckrufMore').slideUp();
        }
    }

    $('#terminForm input[type=submit]').click(checkForm);
    $('#terminForm').submit(checkForm);

    function checkForm(event) {
        var scrolled = false;
        var send = true;
        event.preventDefault();

        $('#terminForm input[required]').each(function() {
            if (!$(this).val()) {
                $('#requiredFields').show();
                if (!scrolled) {
                    scrolled = true;
                    $('html, body').animate({
                        scrollTop: $("#requiredFields").offset().top - 200
                    }, 100);
                }
                send = false;
                return false;
            } else {
                $('#requiredFields').hide();
            }
        });

        if (!document.getElementById('wunschtermin').checked && !document.getElementById('rueckruf').checked) {
            // KEINE AUSWAHL
            $('#chooseOne').show();
            if (!scrolled) {
                scrolled = true;
                $('html, body').animate({
                    scrollTop: $("#chooseOne").offset().top - 200
                }, 100);
            }

            send = false;
        } else {
            $('#chooseOne').hide();

            // RUECKRUF FELDER LEERGELASSEN

            if (document.getElementById('rueckruf').checked && (!$('#rueckDate').val() || !$('#rueckTageszeit option:selected').attr('value'))) {
                $('#chooseRueckruf').show();
                if (!scrolled) {
                    scrolled = true;
                    $('html, body').animate({
                        scrollTop: $("#chooseRueckruf").offset().top - 200
                    }, 100);
                }
                send = false;
            } else {
                $('#chooseRueckruf').hide();
            }

            if (document.getElementById('wunschtermin').checked & (!$('#terminDate').val() || !$('#terminTageszeit option:selected').attr('value'))) {
                $('#chooseTermin').show();
                if (!scrolled) {
                    scrolled = true;
                    $('html, body').animate({
                        scrollTop: $("#chooseTermin").offset().top - 200
                    }, 100);
                }
                send = false;
            } else {
                $('#chooseTermin').hide();
            }
        }

        if (send) {
            var $form = $('#terminForm');
            $form.addClass('sending');
            $form.removeClass('send');

            $.ajax({
                type: "POST",
                url: "/php/contact.php",
                data: $form.serialize(),
                success: function() {
                    $form.trigger("reset");
                    $('#rueckrufMore').slideUp();
                    $('#wunschterminMore').slideUp();
                    $form.removeClass('sending');
                    $form.addClass('send');
                }
            });
        }
    }
})();
