function openLightbox1 () {
    $('body').append('<div class="lightbox" style="display: none"><div class="inner"><iframe src="https://www.clever-fit.com/fitness-studios/clever-fit-lehrte/"></div></div>');
    $('body .lightbox').fadeIn();
    $('body .lightbox').click(closeLightbox1);
}

function closeLightbox1 () {
    $('body .lightbox').fadeOut(200, function () {
        $(this).remove();
    });
}