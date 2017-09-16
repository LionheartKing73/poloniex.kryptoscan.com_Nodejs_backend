const datafeed_alert = (io, args)=>{
	let Alert_ask_bid = {};
	Alert_ask_bid['currencyPair'] = args[0];
	Alert_ask_bid['price'] = parseFloat(args[1]);
	Alert_ask_bid['lowestAsk'] = parseFloat(args[2]);
	Alert_ask_bid['highestBid'] = parseFloat(args[3]);
	io.emit(args[0], Alert_ask_bid);
}

module.exports = {
	datafeed_alert
}