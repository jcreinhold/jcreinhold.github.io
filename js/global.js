function set_page() {
	var h = window.location.hash.substr(1);
	if ($.inArray(h, ['about','blog']) > -1) {
		$('.content').hide();
		
		$('#'+h+'-sec').show();
		if (h == 'about') {
			$('#headshot').show();
		}
	}
	
	if (h == '') {
		$('.content').hide();
		$('#about-sec').show();
		$('#headshot').show();
	}
}

$( document ).ready(function(){
	
	/* set up navigation */
	$(window).on('hashchange', set_page);
	set_page();
	
	/* add email */
	$('.email').attr('href', 'mailto:' + 'jcreinhold' + '@' + 'gmail.com');

})
