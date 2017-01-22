$(document).ready(function() {
    $("").hide();
    /* SetupTextBoxes();*/
	$("div.submit-button").focus(function() {
		$(this).css("background-color", "blue");
	});
});

$(':radio').change(function() {
	if (this.value == "plain") {
		$('#twitter, #file').hide(0, function() {
			$('#plain').fadeIn();
		});
	} else if (this.value == "twitter") {
		$('#plain, #file').hide(0, function() {
			$('#twitter').fadeIn();
		});
	} else if (this.value == "file") {
		$('#twitter, #plain').hide(0, function() {
			$('#file').fadeIn();
		});
	} 
});