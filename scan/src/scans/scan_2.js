const percentageAlert = (io, min, prevCandle, currentBuffer)=>{
	let upScan = [];
	let downScan = [];
	for (let pair in currentBuffer){
		if((currentBuffer.hasOwnProperty(pair)) && (pair in prevCandle)){
			let current_vs_preOpen = (currentBuffer[pair]['last']-prevCandle[pair]['open'])/prevCandle[pair]['open']*100;
			currentBuffer[pair]['current_vs_preOpen'] = current_vs_preOpen;
			if(current_vs_preOpen > 0){
				upScan.push({'currencyPair': pair, 'last': currentBuffer[pair]['last'], 'percentChange': currentBuffer[pair]['percent'], '24hrHigh': currentBuffer[pair]['high_24'], '24hrLow': currentBuffer[pair]['low_24'], 'current_vs_preOpen': currentBuffer[pair]['current_vs_preOpen'] });
				
			}
			if(current_vs_preOpen < 0){
				downScan.push({'currencyPair': pair, 'last': currentBuffer[pair]['last'], 'percentChange': currentBuffer[pair]['percent'], '24hrHigh': currentBuffer[pair]['high_24'], '24hrLow': currentBuffer[pair]['low_24'], 'current_vs_preOpen': currentBuffer[pair]['current_vs_preOpen'] });
				
			}
		}
	}
	upScan.sort((a,b)=>{ return b.current_vs_preOpen - a.current_vs_preOpen; });
	downScan.sort((a,b)=>{ return a.current_vs_preOpen - b.current_vs_preOpen });
	upScan = upScan.slice(0, 20);
	downScan = downScan.slice(0, 20);
	io.emit('scan_2_up_'+min, upScan);
	io.emit('scan_2_down_'+min, downScan);
}

module.exports = {
	percentageAlert
}