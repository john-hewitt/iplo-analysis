$(document).ready(function() {
    $("").hide();

    /* SetupTextBoxes();*/
	$("div.submit-button").focus(function() {
		$(this).css("background-color", "blue");
	});
});

/*
function SetupTextBoxes() {
   $(".area-input").on({
   		focus: function() {
   			$(this).css("background-color", "lightgreen");
   		}
	    mouseenter: function(){
	        
	    }, 
	    mouseleave: function(){
	        
	    }, 
	    click: function(){
	        
	    } 
	});
}
*/

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