$(document).ready(function() {


  // $('#selector').css('padding-top', ($(window).height()/2)-$('#selector').height()/2 - $('header').height()-100);
  // $('#globalWrapper').height($(window).height() - $('header').height());


  // $(window).resize(function() {
  //     $('#selector').css('padding-top', ($(window).height()/2)-$('#selector').height()/2 - $('header').height()-100);
  //     $('#globalWrapper').height($(window).height() - $('header').height());
  // });
  
  
  
  //selectors animation
  $('#selector article').hover(
  function () {

    $(this).stop(true, true).animate({ opacity:1}, 'slow', 'swing').end();
    $('#selector article').css('opacity', .2);
  }, 
  function () {
    $('#selector article').css('opacity', 1);
    //$(this).stop(true, true).animate({ opacity:.2}, 300, 'swing').end();
  }
);
  
  
  
  
});
