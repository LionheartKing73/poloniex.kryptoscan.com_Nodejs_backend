import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import schedule from 'node-schedule';
import async from 'async';
import autobahn from 'autobahn';

import api from './api/index';


const app = express();
const url = "mongodb://localhost:27017/poloniexdb";


///////////////////////
// Server Middleware
///////////////////////

app.use(logger(app.get("env") === "production" ? "combined" : "dev"));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
// This allows client applications from other domains use the API Server
app.use((req, res, next)=>{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


//////////////////
// API Queries
//////////////////

app.use('/', api);


//////////////////
// Server Setup
//////////////////

app.set("env", process.env.NODE_ENV || "development");
app.set("host", process.env.HOST || "0.0.0.0");
app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), ()=>{
	console.log('\n' + '**********************************');
	console.log('DATA Server listening on port ' + app.get("port"));
	console.log('**********************************' + '\n');
});

//////////////socket-start///////////////
const wsuri = "wss://api.poloniex.com";
const connection = new autobahn.Connection({
  url: wsuri,
  realm: "realm1"
});
let min_1_job = null;
connection.onopen = (session)=>{
	console.log("Websocket connected to poloniex.com!");
	let scanUnit = {};
	let flags = {};
	const marketEvent = (args,kwargs)=>{
		if(!(args[0] in scanUnit)) {			//if new currencyPair
			scanUnit[args[0]] = {};				//init new currencyPari Object
			scanUnit[args[0]].totalVolume = 0;
		}

		let last = parseFloat(args[1]);
		let baseVolume = parseFloat(args[5]);

		scanUnit[args[0]].totalVolume = scanUnit[args[0]].totalVolume + baseVolume;

		if(!(args[0] in flags)){   //is new symbol in one minute
			scanUnit[args[0]].open = last;
			scanUnit[args[0]].high = last;
			scanUnit[args[0]].low = last;
			scanUnit[args[0]].start = Math.floor(Date.now()/1000);
			flags[args[0]] = true;
		}
		scanUnit[args[0]].close = last;
		if(scanUnit[args[0]].close > scanUnit[args[0]].high){
			scanUnit[args[0]].high = scanUnit[args[0]].close;
		}
		if(scanUnit[args[0]].close < scanUnit[args[0]].low){
			scanUnit[args[0]].low = scanUnit[args[0]].close;
		}
		scanUnit[args[0]].end = Math.floor(Date.now()/1000);
	}
	// session.subscribe('BTC_XMR', marketEvent);
	session.subscribe('ticker', marketEvent);
	// session.subscribe('trollbox', marketEvent);

	const min_1_schedule = new schedule.RecurrenceRule();
	min_1_schedule.second = 0;
	const make_1_min_data = ()=>{
		let time_stamp = Math.floor(Date.now()/1000)-60;
		let d = new Date();
		let time_string = d.toISOString().replace('T', ' ').replace(/\..*$/, '');
		let myobj = {time_stamp: time_stamp, time_string: time_string, exchagne: 'poloniex'};
		myobj['body'] = scanUnit;
		MongoClient.connect(url, (err, db)=>{
			if(err) throw err;
			db.collection("min_1").insertOne(myobj, (err, res)=>{
				if(err) throw err;
				console.log('---1 min data inserted at '+Date.now());
				db.close();
			});
		});
		scanUnit = {};
		flags = {};
	}
	min_1_job = schedule.scheduleJob(min_1_schedule, make_1_min_data);
	console.log('1 min schedule is running!');
}

connection.onclose = ()=>{
	console.log("Websocket closed from poloniex.com!");
	min_1_job.cancel();
}
			   
connection.open();

//////////////socket-end///////////////


/////////////////////////////////////////////////////////////////////////
const make_data = (mins, db_from, db_to, delay)=>{
	let now_time = Math.floor(Date.now()/1000);
	let d = new Date();
	let time_string = d.toISOString().replace('T', ' ').replace(/\..*$/, '');
	let scanUnit = {};
	let flags = {};
	let query = { 
					time_stamp: { 
									$gte: now_time-(60*mins),
									$lt: now_time
								}
				};
	setTimeout(()=>{
		MongoClient.connect(url, (err, db)=>{
			if(err) throw err;
			db.collection(db_from).find(query).toArray((err, result)=>{
				if (err) throw err;
				async.each(result,
					(item, callback)=>{
						for (let key in item.body){
						    if(item.body.hasOwnProperty(key)){
								if(!(key in scanUnit)) {			//if new currencyPair
									scanUnit[key] = {};				//init new currencyPari Object
									scanUnit[key].totalVolume = 0;
								}
								scanUnit[key].totalVolume = scanUnit[key].totalVolume + item.body[key].totalVolume;
								if(!(key in flags)){   //is new symbol in 5 minute
									scanUnit[key].start = item.body[key].start;
									scanUnit[key].open = item.body[key].open;
									scanUnit[key].high = item.body[key].high;
									scanUnit[key].low = item.body[key].low;
									flags[key] = true;
								}
								if(item.body[key].high > scanUnit[key].high){
									scanUnit[key].high = item.body[key].high;
								}
								if(item.body[key].low < scanUnit[key].low){
									scanUnit[key].low = item.body[key].low;
								}
								scanUnit[key].close = item.body[key].close;
								scanUnit[key].end = item.body[key].end;
						    }
						}
						callback();
					},
					(err)=>{
						let time_stamp = now_time-(60*mins);
						let myobj = {time_stamp: time_stamp, time_string: time_string, exchagne: 'poloniex'};
						myobj['body'] = scanUnit;
						db.collection(db_to).insertOne(myobj, (err, res)=>{
							if(err) throw err;
							console.log(mins+' min data inserted at '+Date.now());
							db.close();
						});
					}
				);
			});
		});
	}, 1000*delay);		
}

const min_5_schedule = new schedule.RecurrenceRule();
min_5_schedule.minute = [0,5,10,15,20,25,30,35,40,45,50,55];
schedule.scheduleJob(min_5_schedule, ()=>{ make_data(5, 'min_1', 'min_5', 1); });
console.log('5 min schedule is running!');

const min_15_schedule = new schedule.RecurrenceRule();
min_15_schedule.minute = [0,15,30,45];
schedule.scheduleJob(min_15_schedule, ()=>{ make_data(15, 'min_5', 'min_15', 2); });
console.log('15 min schedule is running!');

const min_30_schedule = new schedule.RecurrenceRule();
min_30_schedule.minute = [0,30];
schedule.scheduleJob(min_30_schedule, ()=>{ make_data(30, 'min_15', 'min_30', 3); });
console.log('30 min schedule is running!');

const min_60_schedule = new schedule.RecurrenceRule();
min_60_schedule.minute = 0;
schedule.scheduleJob(min_60_schedule, ()=>{ make_data(60, 'min_30', 'min_60', 4); });
console.log('60 min schedule is running!');

const min_120_schedule = new schedule.RecurrenceRule();
min_120_schedule.minute = 0;
min_120_schedule.hour = [0,2,4,6,8,10,12,14,16,18,20,22];
schedule.scheduleJob(min_120_schedule, ()=>{ make_data(120, 'min_60', 'min_120', 5); });
console.log('120 min schedule is running!');

const min_240_schedule = new schedule.RecurrenceRule();
min_240_schedule.minute = 0;
min_240_schedule.hour = [0,4,8,12,16,20];
schedule.scheduleJob(min_240_schedule, ()=>{ make_data(240, 'min_120', 'min_240', 6); });
console.log('240 min schedule is running!');

const min_1440_schedule = new schedule.RecurrenceRule();
min_1440_schedule.minute = 0;
min_1440_schedule.hour = 0;
schedule.scheduleJob(min_1440_schedule, ()=>{ make_data(1440, 'min_240', 'min_1440', 7); });
console.log('1440 min schedule is running!');

const min_10080_schedule = new schedule.RecurrenceRule();
min_10080_schedule.minute = 0;
min_10080_schedule.hour = 0;
min_10080_schedule.dayOfWeek = 0;
schedule.scheduleJob(min_10080_schedule, ()=>{ make_data(10080, 'min_1440', 'min_10080', 8); });
console.log('10080 min schedule is running!');

const min_43200_schedule = new schedule.RecurrenceRule();
min_43200_schedule.minute = 0;
min_43200_schedule.hour = 0;
min_43200_schedule.date = 0;
schedule.scheduleJob(min_43200_schedule, ()=>{ make_data(43200, 'min_10080', 'min_43200', 9); });
console.log('43200 min schedule is running!');

/////////////////////////////////////////////////////////////////////////



////////////////////
// Error Handlers
////////////////////
/*
// catch 404 and forward to error handler
app.use((req, res, next)=>{
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
	app.use((err, req, res, next)=>{
		res.status( err.code || 500 )
		.json({
			status: 'error',
			message: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next)=>{
	res.status(err.status || 500)
	.json({
		status: 'error',
		message: err.message
	});
});*/


module.exports = app;
