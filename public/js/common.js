$(function() {
	var dropdownToggled = false
	var dropdownButton = $(".dropdown-toggle");
	var dropdown = $(".dropdown-menu");

	dropdownButton.click(function() {	
		if (dropdownToggled) {
			dropdownToggled = false;
			dropdown.hide();
		} else {
			dropdown.show();
			dropdownToggled = true
		}
	})	
})