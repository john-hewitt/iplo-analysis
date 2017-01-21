$(document).ready(function() {
    $("").hide();

    //SetupTitle();
    SetupTextBoxes();
    SetupAnimation();
});

function SetupTitle() {
   $(".left-input-textarea").on({
   		focus: function() {
   			
   		},
	    mouseenter: function(){
	        $(this).animate({height: '500px'}, "slow");
	        $(".right-input-textarea").animate({height: '500px'}, "slow");
	    }, 
	    mouseleave: function(){
	        $(this).animate({height: '100px'}, "slow");
	        $(".right-input-textarea").animate({height: '100px'}, "slow");
	    }, 
	    click: function(){
	        
	    } 
	});
}


function SetupTextBoxes() {
   $(".left-input-textarea").on({
   		focus: function() {
   			
   		},
	    mouseenter: function(){
	        $(this).animate({height: '500px'}, "slow");
	        $(".right-input-textarea").animate({height: '500px'}, "slow");
	    }, 
	    mouseleave: function(){
	        $(this).animate({height: '100px'}, "slow");
	        $(".right-input-textarea").animate({height: '100px'}, "slow");
	    }, 
	    click: function(){
	        
	    } 
	});
    $(".right-input-textarea").on({
   		focus: function() {
   			
   		},
	    mouseenter: function(){
	        $(this).animate({height: '500px'}, "slow");
	        $(".left-input-textarea").animate({height: '500px'}, "slow");
	    }, 
	    mouseleave: function(){
	        $(this).animate({height: '100px'}, "slow");
	        $(".left-input-textarea").animate({height: '100px'}, "slow");
	    }, 
	    click: function(){
	        
	    } 
	});
}

function SetupAnimation() {
	var $animation_elements = $('.textarea-animation-element');
	var $window = $(window);
	$window.on('scroll resize', check_if_in_view);
	$window.trigger('scroll');

	function check_if_in_view() {
	  var window_height = $window.height();
	  var window_top_position = $window.scrollTop();
	  var window_bottom_position = (window_top_position + window_height);
	 
	  $.each($animation_elements, function() {
	    var $element = $(this);
	    var element_height = $element.outerHeight();
	    var element_top_position = $element.offset().top;
	    var element_bottom_position = (element_top_position + element_height);

	    //check to see if this current container is within viewport
	    if ((element_bottom_position >= window_top_position) &&
	        (element_top_position <= window_bottom_position)) {
	        $element.fadeIn( 2000, function() {
			    // Animation complete
			});
	    } else {
	    	$element.fadeOut( 2000, function() {
			    // Animation complete
			});
	    }
	  });
	}
}
