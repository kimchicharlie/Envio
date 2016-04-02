$(document).ready(function() {

    $("#toc").tocify({ selectors: "h2, h3, h4", context:".content", scrollTo: 10, highlightOffset: 0, extendPage: true });
    $("a[href='#']").click(function(event) {
      event.preventDefault();
    }); 


    var  totalHeaderHeight = parseInt($('#mainHeader').outerHeight(true)) +  parseInt($('#home').outerHeight(true));
	$(window).scroll(function() {
	    if($(window).scrollTop() >= totalHeaderHeight){
	    	$("#toc").css('position', 'fixed');
	    	$("#toc").animate({ top: 0}, 300, function() {});
	    }else{
	    	$("#toc").css('position', 'static');
	    }
	});

});
