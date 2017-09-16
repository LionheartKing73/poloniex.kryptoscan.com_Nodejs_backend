const scan_1 = (io, candle, args, min, exchange)=>{
	let pair = args[0];
	let last = parseFloat(args[1]);
	let percent = parseFloat(args[4]);
	let high_24 = parseFloat(args[8]);
	let low_24 = parseFloat(args[9]);
	if(pair in candle) {			
		if(last > candle[pair].high){
			//let alert = { 'exchange': exchange, 'currencyPair': pair, 'price': last, 'percentChange': percent, '24hrHigh': high_24, '24hrLow': low_24, sort: 'highScan' };
			let alert = [args[0], args[1], args[2], args[3], args[5], args[4], args[5], args[6], args[7], args[8]];
			io.emit('scan_1_'+min, alert);
			candle[pair].high = last;
		}
		if(last < candle[pair].low){
			//let alert = { 'exchange': exchange, 'currencyPair': pair, 'price': last, 'percentChange': percent, '24hrHigh': high_24, '24hrLow': low_24, sort: 'lowScan' };
			let alert = [args[0], args[1], args[2], args[3], args[5], args[4], args[5], args[6], args[7], args[8]] ;
			io.emit('scan_1_'+min, alert);
			candle[pair].low = last;
		}
	}
}

module.exports = {
	scan_1
}