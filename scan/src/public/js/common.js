$(document).ready(function(){

	$('.logout').on('click', function(){
		alert('You are gonna logout!');
	});
	$('.service').on('click', function(){
		alert('You clicked User Icon!');
	});
	$('.settings').on('click', function(){
		alert('You clicked Settings Icon');
	});
	$('.help').on('click', function(){
		alert('You clicked Help Icon');
	});
	
//////////////////////////////
	

});
$(document).on('shown.bs.tab', '.top a[data-toggle="tab"]', function (e) {
		$('.navbar-fixed-left .top a').removeClass('actived');
		$(this).addClass('actived');
});
