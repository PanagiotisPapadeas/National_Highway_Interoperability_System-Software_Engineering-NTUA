const express = require('express');
const router = express.Router();
const converter = require('json-2-csv');
var mysql = require('mysql');
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
var dateTime = date+' '+time;


function getpassespsData(req,res){
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"softeng2131"
	});

	var test = { 

	};
	test.Station = req.params.stationID;
	test.RequestTimestamp = dateTime;
	test.PeriodFrom = req.params.date_from;
	test.PeriodTo = req.params.date_to;
        var l = req.query.format;

	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
	let myquery2 ="SELECT station_name as St FROM stations where stationID ="+"'"+req.params.stationID+"'";
		con.query(myquery2, function (err, resul, fields){
			if (err) throw err;
			test.StationOperator = resul[0]["St"];
		});
		
	//test.RequestTimestamp = dateTime;
	//test.PeriodFrom = req.params.date_from;
	//test.PeriodTo = req.params.date_to;
        
	let myquery1 ="SELECT count(*) as Num FROM passes, tags WHERE passes.tagID = tags.tagID and stationID ="+"'"+req.params.stationID+"'"+" and timestamp >="+"'"+req.params.date_from+"'"+" and timestamp <="+"'"+req.params.date_to+"'";
		con.query(myquery1, function (err, resu, fields){
			if (err) throw err;
			test.NumberOfPasses = resu[0]["Num"];
		});
		let myquery="SELECT passID, stationID, timestamp, vehicleID, tag_provider, pass_type, amount FROM passes, tags WHERE passes.tagID = tags.tagID and stationID ="+"'"+req.params.stationID+"'"+" and timestamp >="+"'"+req.params.date_from+"'"+" and timestamp <="+"'"+req.params.date_to+"'";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;
			test.PassesList = result;
			if (l=="csv"){
			converter.json2csv(test, function(err, csv){
				if (err) throw err;
			        res.send(csv);
			});}
			else {res.send(test);}
		});
	});
}

router.get('/interoperability/api/PassesPerStation/:stationID/:date_from/:date_to',getpassespsData);
module.exports = router;
