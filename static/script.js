$(document).ready(function() {
	$("").hide();
	/* SetupTextBoxes();*/
	$("div.submit-button").focus(function() {
		$(this).css("background-color", "blue");
	});
});

$(':radio').change(function() {
	if ($(this).attr('id') == 'option1') {
		$('#twitter, #file').hide(0, function() {
			$('#plain').fadeIn();
		});
	} else if ($(this).attr('id') == 'option2') {
		$('#plain, #file').hide(0, function() {
			$('#twitter').fadeIn();
		});
	} else if ($(this).attr('id') == 'option3') {
		$('#plain, #twitter').hide(0, function() {
			$('#file').fadeIn();
		});
	}
});