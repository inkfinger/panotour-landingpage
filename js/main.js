(function() {

  $('a[href*=#]:not([href=#])').click(function() {
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

        if (send) {
            var $form = $('#terminForm');
            $form.addClass('sending');
            $form.removeClass('send');

            $.ajax({
                type: "POST",
                url: "./php/contact.php",
                data: $form.serialize(),
                success: function() {
                    $form.trigger("reset");
                    $form.removeClass('sending');
                    $form.addClass('send');
                }
            });
        }
    }
})();
