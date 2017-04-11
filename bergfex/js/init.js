$(".opener-overlay").click(function(){
  var hotelID = $(this).data('id');
  if (hotelID === 1) {
    var hotelFile = 'zell-am-see.html';
  } else if (hotelID === 2) {
    var hotelFile = 'romantikhotel-seevilla.html';
  }
  $('.inner').append('<iframe src="//clients.nexpics.com/bergfex/hotels/' + hotelFile+'"></iframe>');
  $('body .lightbox').addClass('active');
});

$(".closeme").click(function(){
  $('.inner').children('iframe').remove();
  $('body .lightbox').removeClass('active');
});

$(".opener-overlay").hover(function(){
  $(this).toggleClass('hover');
  $(this).children('img').toggleClass('disable');
  $(this).children('.opener-icon').toggleClass('show');
})
