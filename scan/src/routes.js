import { poloniex_coins } from './data';

module.exports = (app)=>{
	app.get('/', (req, res)=>{
		res.render(__dirname + '/view/pages/index');
	});
	app.get('/scan_1', (req, res)=>{
		res.render(__dirname + '/view/pages/scan_1');
	});
	app.get('/scan_2', (req, res)=>{
		res.render(__dirname + '/view/pages/scan_2');
	});
	app.get('/datafeed_integration', (req, res)=>{
		res.render(__dirname + '/view/pages/datafeed_integration', {poloniex_coins});
	});
	app.get('/datafeed_integration/:coin', (req, res)=>{
		res.render(__dirname + '/view/pages/datafeed_coin', {
			coin: req.params.coin
		});
	});
}