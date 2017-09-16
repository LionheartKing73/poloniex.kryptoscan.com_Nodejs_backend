
import { MongoClient } from 'mongodb';

const url = "mongodb://localhost:27017/poloniexdb";

const pull_data = (mins, db_from, delay, callback)=>{
	let now_time = Math.floor(Date.now()/1000);
	let query = { 
					time_stamp: now_time-(60*mins)
				};
	setTimeout(()=>{
		MongoClient.connect(url, (err, db)=>{
			if(err) throw err;
			db.collection(db_from).findOne(query,(err, result)=>{
				if (err) throw err;
				if(result == null){
					callback({});
				}
				else{
					callback(result.body);
				}
			});
		});
	}, 1000*delay);		
}

const pull_data_init = (db_from, callback)=>{
	let option = {
		'sort': [['time_stamp','desc']]
	}
	MongoClient.connect(url, (err, db)=>{
		if(err) throw err;
		db.collection(db_from).findOne({}, option, (err, result)=>{
			if (err) throw err;
			if(result == null){
				callback({});
			}
			else{
				callback(result.body);
			}
		});
	});	
}

module.exports = {
	pull_data,
	pull_data_init
}