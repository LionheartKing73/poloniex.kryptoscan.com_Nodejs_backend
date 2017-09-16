import express from 'express';
import http from 'http';
import sio from 'socket.io';

import schedule from 'node-schedule';
import autobahn from 'autobahn';

import routes from './routes';
import { make_15s_buffer } from './helper';
import { pull_data, pull_data_init } from './model';
import { scan_1 } from './scans/scan_1';
import { percentageAlert } from './scans/scan_2';
import { datafeed_alert } from './scans/datafeed'

const app = express();
const server = http.createServer(app);
const io = sio.listen(server);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

const port = process.env.PORT || 7890;

let min_5_candle = {};
let min_15_candle = {};
let min_30_candle = {};
let min_60_candle = {};
let min_120_candle = {};
let min_240_candle = {};
let min_1440_candle = {};
let min_10080_candle = {};
let min_43200_candle = {};

let s_15_buffer_data = {};

io.on('connection', (socket)=>{
	console.log('a user connected');
	socket.on('disconnect', ()=>{
		console.log('user disconnected');
	});
	
});
////////////////initial work///////////////////
pull_data_init('min_5', (candle)=>{	min_5_candle = candle; });
pull_data_init('min_15', (candle)=>{ min_15_candle = candle; });
pull_data_init('min_30', (candle)=>{ min_30_candle = candle; });
pull_data_init('min_60', (candle)=>{ min_60_candle = candle; });
pull_data_init('min_120', (candle)=>{ min_120_candle = candle; });
pull_data_init('min_240', (candle)=>{ min_240_candle = candle; });
pull_data_init('min_1440', (candle)=>{ min_1440_candle = candle; });
pull_data_init('min_10080', (candle)=>{ min_10080_candle = candle; });
pull_data_init('min_43200', (candle)=>{ min_43200_candle = candle; }); 
/////////////////////////////////////

///////////////poloniex socket connect///////////////////
(function ticker() {

	console.log("\n------------- OPEN CONNECTION ---------------\n");
	const connection = new autobahn.Connection({
		url: 'wss://api.poloniex.com',
		realm: 'realm1',
		max_retries: -1
	});

  	connection.onopen = (session)=>{
	    const marketEvent = (args,kwargs)=>{
	    	datafeed_alert(io, args);
	    	make_15s_buffer(s_15_buffer_data, args);
			scan_1(io, min_5_candle, args, 5, 'Poloniex');
			scan_1(io, min_15_candle, args, 15, 'Poloniex');
			scan_1(io, min_30_candle, args, 30, 'Poloniex');
			scan_1(io, min_60_candle, args, 60, 'Poloniex');
			scan_1(io, min_120_candle, args, 120, 'Poloniex');
			scan_1(io, min_240_candle, args, 240, 'Poloniex');
			scan_1(io, min_1440_candle, args, 1440, 'Poloniex');
			scan_1(io, min_10080_candle, args, 10080, 'Poloniex');
			scan_1(io, min_43200_candle, args, 43200, 'Poloniex');
		}
	    session.subscribe('ticker', marketEvent);

	    setTimeout(function () {
	      console.log("\n------------- CLOSING CONNECTION ---------------\n");
	      connection.close();
	    }, 300000);

	};

	connection.open();

	setTimeout(ticker, 300200);
})();

/////////////server////////////
routes(app);

server.listen(port, '0.0.0.0', ()=>{
	console.log('\n' + '**********************************');
	console.log('SCAN Server listening on port ' + port);
	console.log('**********************************' + '\n');
});

////////////////////schedule work///////////////////////
const s_15_schedule = new schedule.RecurrenceRule();
s_15_schedule.second = [0,15,30,45];
schedule.scheduleJob(s_15_schedule, ()=>{
	percentageAlert(io, 5, min_5_candle, s_15_buffer_data);
	percentageAlert(io, 15, min_15_candle, s_15_buffer_data);
	percentageAlert(io, 30, min_30_candle, s_15_buffer_data);
	percentageAlert(io, 60, min_60_candle, s_15_buffer_data);
	percentageAlert(io, 120, min_120_candle, s_15_buffer_data);
	percentageAlert(io, 240, min_240_candle, s_15_buffer_data);
	percentageAlert(io, 1440, min_1440_candle, s_15_buffer_data);
	percentageAlert(io, 10080, min_10080_candle, s_15_buffer_data);
	percentageAlert(io, 43200, min_43200_candle, s_15_buffer_data);
	s_15_buffer_data = {};
});
console.log('15 second schedule is running!');

const min_5_schedule = new schedule.RecurrenceRule();
min_5_schedule.minute = [0,5,10,15,20,25,30,35,40,45,50,55];
schedule.scheduleJob(min_5_schedule, ()=>{ 
	pull_data(5, 'min_5', 2, (candle)=>{
		min_5_candle = candle;
	});
});
console.log('15 min schedule is running!');

const min_15_schedule = new schedule.RecurrenceRule();
min_15_schedule.minute = [0,15,30,45];
schedule.scheduleJob(min_15_schedule, ()=>{ 
	pull_data(15, 'min_15', 3, (candle)=>{
		min_15_candle = candle;
	});
});
console.log('15 min schedule is running!');

const min_30_schedule = new schedule.RecurrenceRule();
min_30_schedule.minute = [0,30];
schedule.scheduleJob(min_30_schedule, ()=>{ 
	pull_data(30, 'min_30', 4, (candle)=>{
		min_30_candle = candle;
	});
});
console.log('30 min schedule is running!');

const min_60_schedule = new schedule.RecurrenceRule();
min_60_schedule.minute = 0;
schedule.scheduleJob(min_60_schedule, ()=>{ 
	pull_data(60, 'min_60', 5, (candle)=>{
		min_60_candle = candle;
	});
});
console.log('60 min schedule is running!');

const min_120_schedule = new schedule.RecurrenceRule();
min_120_schedule.minute = 0;
min_120_schedule.hour = [0,2,4,6,8,10,12,14,16,18,20,22];
schedule.scheduleJob(min_120_schedule, ()=>{ 
	pull_data(120, 'min_120', 6, (candle)=>{
		min_120_candle = candle;
	});
});
console.log('120 min schedule is running!');

const min_240_schedule = new schedule.RecurrenceRule();
min_240_schedule.minute = 0;
min_240_schedule.hour = [0,4,8,12,16,20];
schedule.scheduleJob(min_240_schedule, ()=>{ 
	pull_data(240, 'min_240', 7, (candle)=>{
		min_240_candle = candle;
	});
});
console.log('240 min schedule is running!');

const min_1440_schedule = new schedule.RecurrenceRule();
min_1440_schedule.minute = 0;
min_1440_schedule.hour = 0;
schedule.scheduleJob(min_1440_schedule, ()=>{ 
	pull_data(1440, 'min_1440', 8, (candle)=>{
		min_1440_candle = candle;
	});
});
console.log('1440 min schedule is running!');

const min_10080_schedule = new schedule.RecurrenceRule();
min_10080_schedule.minute = 0;
min_10080_schedule.hour = 0;
min_10080_schedule.dayOfWeek = 0;
schedule.scheduleJob(min_10080_schedule, ()=>{ 
	pull_data(10080, 'min_10080', 9, (candle)=>{
		min_10080_candle = candle;
	});
});
console.log('10080 min schedule is running!');

const min_43200_schedule = new schedule.RecurrenceRule();
min_43200_schedule.minute = 0;
min_43200_schedule.hour = 0;
min_43200_schedule.date = 0;
schedule.scheduleJob(min_43200_schedule, ()=>{ 
	pull_data(43200, 'min_43200', 10, (candle)=>{
		min_43200_candle = candle;
	});
});
console.log('43200 min schedule is running!');
//////////////////////////////////
