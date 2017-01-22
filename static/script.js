$(document).ready(function() {
    $("").hide();
    /* SetupTextBoxes();*/
	$("div.submit-button").focus(function() {
		$(this).css("background-color", "blue");
	});
});

$(':radio').change(function() {
	if (this.value == "plaintext") {
		$('#twitter').fadeOut(function() {
			$('#plain').fadeIn();
		});
	} else if (this.value == "twitter") {
		$('#plain').fadeOut(function() {
			$('#twitter').fadeIn();
		});
	}
});
/*
    SetupTitle();
    SetupTextBoxes();
    //SetupAnimation();
});

function SetupTitle() {
   $('.title').textillate({
  // the default selector to use when detecting multiple texts to animate
  selector: '.texts',
  
  // enable looping
  loop: true,
  
  // sets the minimum display time for each text before it is replaced
  minDisplayTime: 1500,
  
  // sets the initial delay before starting the animation
  // (note that depending on the in effect you may need to manually apply 
  // visibility: hidden to the element before running this plugin)
  initialDelay: 0,
  
  // set whether or not to automatically start animating
  autoStart: true,
  
  // custom set of 'in' effects. This effects whether or not the 
  // character is shown/hidden before or after an animation  
  inEffects: [],
  
  // custom set of 'out' effects
  outEffects: [ 'rotateInUpRight' ],
  
  // in animation settings
  in: {
  // set the effect name
  effect: 'flash',
  
  // set the delay factor applied to each consecutive character
  delayScale: 1.5,
  
  // set the delay between each character
  delay: 50,
  
  // set to true to animate all the characters at the same time
  sync: false,
  
  // randomize the character sequence 
  // (note that shuffle doesn't make sense with sync = true)
  shuffle: true
},

  // out animation settings.
  out: {
    effect: 'rotateInUpRight',
    delayScale: 1.5,
    delay: 50,
    sync: false,
    shuffle: true,
  },
})

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
*/
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

$(':radio').change(function() {
	if (this.value == "plaintext") {
		$('#twitter').fadeOut(function() {
			$('#plain').fadeIn();
		});
	} else if (this.value == "twitter") {
		$('#plain').fadeOut(function() {
			$('#twitter').fadeIn();
		});
	}
});
