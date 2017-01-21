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