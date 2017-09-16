const make_15s_buffer = (s_15_buffer, args)=>{
	let pair = args[0];
	let last = parseFloat(args[1]);
	let percent = parseFloat(args[4]);
	let high_24 = parseFloat(args[8]);
	let low_24 = parseFloat(args[9]);
	if(!(pair in s_15_buffer)){
		s_15_buffer[pair] = {};
	}
	s_15_buffer[pair]['last'] = last;
	s_15_buffer[pair]['percent'] = percent;
	s_15_buffer[pair]['high_24'] = high_24;
	s_15_buffer[pair]['low_24'] = low_24;
}

module.exports = {
	make_15s_buffer
}