$(function () {
	var socket = io();
	socket.on('scan_1_5', function(msg){
		$('#min_5_list').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_1_15', function(msg){
		$('#min_15_list').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_1_30', function(msg){
		$('#min_30_list').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_1_60', function(msg){
		$('#min_60_list').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_1_120', function(msg){
		$('#min_120_list').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_1_240', function(msg){
		$('#min_240_list').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_1_1440', function(msg){
		$('#min_1440_list').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_1_10080', function(msg){
		$('#min_10080_list').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_1_43200', function(msg){
		$('#min_43200_list').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
});