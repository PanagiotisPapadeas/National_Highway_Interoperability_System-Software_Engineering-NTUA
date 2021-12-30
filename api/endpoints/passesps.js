const express = require('express');
const router = express.Router();
//const converter = require('json-2-csv');
var mysql = require('mysql');

function getpassespsData(req,res){
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database:"db_softeng_2131"
	});

	var test = { 

	};
	test.Station = req.params.stationID;
	test.PeriodFrom = req.params.date_from;
	test.PeriodTo = req.params.date_to;


	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		let myquery="SELECT passID, stationID, timestamp, vehicleID, tag_provider, pass_type, amount FROM passes, tags WHERE passes.tagID = tags.tagID and stationID ="+"'"+req.params.stationID+"'"+" and timestamp >="+"'"+req.params.date_from+"'"+" and timestamp <="+"'"+req.params.date_to+"'";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;
			test.PassesList = result;
			//converter.json2csv(test, function(err, csv){
			//	if (err) throw err;
			//        res.send(csv);
			//});
	                res.send(test);
		});
	});
}

router.get('/PassesPerStation/:stationID/:date_from/:date_to',getpassespsData);
module.exports = router;
