$(function () {
	var socket = io();

	socket.on('scan_2_up_5', function(msg){
		$('#min_5_list_up').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_2_down_5', function(msg){
		$('#min_5_list_down').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});

	socket.on('scan_2_up_15', function(msg){
		$('#min_15_list_up').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_2_down_15', function(msg){
		$('#min_15_list_down').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});

	socket.on('scan_2_up_30', function(msg){
		$('#min_30_list_up').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_2_down_30', function(msg){
		$('#min_30_list_down').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});

	socket.on('scan_2_up_60', function(msg){
		$('#min_60_list_up').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_2_down_60', function(msg){
		$('#min_60_list_down').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});

	socket.on('scan_2_up_120', function(msg){
		$('#min_120_list_up').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_2_down_120', function(msg){
		$('#min_120_list_down').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});

	socket.on('scan_2_up_240', function(msg){
		$('#min_240_list_up').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_2_down_240', function(msg){
		$('#min_240_list_down').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});

	socket.on('scan_2_up_1440', function(msg){
		$('#min_1440_list_up').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_2_down_1440', function(msg){
		$('#min_1440_list_down').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});

	socket.on('scan_2_up_10080', function(msg){
		$('#min_10080_list_up').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_2_down_10080', function(msg){
		$('#min_10080_list_down').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});

	socket.on('scan_2_up_43200', function(msg){
		$('#min_43200_list_up').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
	socket.on('scan_2_down_43200', function(msg){
		$('#min_43200_list_down').append($('<li>').text(JSON.stringify(msg)));
		window.scrollTo(0, document.body.scrollHeight);
	});
});