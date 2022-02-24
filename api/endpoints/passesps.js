const express = require('express');
const router = express.Router();
const converter = require('json-2-csv');
var mysql = require('mysql');

//GET method for passes per station
function getpassespsData(req,res){
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"softeng2131"
	});
        
	//JSON object to return
	var test = { 

	};
	test.Station = req.params.stationID;
	test.PeriodFrom = req.params.date_from;
	test.PeriodTo = req.params.date_to;
	//Json or csv
        var l = req.query.format;
	//status code
	var code;
	//index for passindex
	var i;

	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		//query for station operator
	let myquery2 ="SELECT station_name as St FROM stations where stationID ="+"'"+req.params.stationID+"'";
		con.query(myquery2, function (err, resul, fields){
			if (err) throw err;

			//get request timestamp
	                var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
			var dateTime = date+' '+time;
			test.RequestTimestamp = dateTime;

			try{
				test.StationOperator = resul[0]["St"];
			}
			catch(err) {
				test.StationOperator = "Not Registered";
			}
		});
	
                 
		//query to get number of results
	let myquery1 ="SELECT count(*) as Num FROM passes, tags WHERE passes.tagID = tags.tagID and stationID ="+"'"+req.params.stationID+"'"+" and timestamp >="+"'"+req.params.date_from+"'"+" and timestamp <="+"'"+req.params.date_to+"'";
		con.query(myquery1, function (err, resu, fields){
			if (err) throw err;
			test.NumberOfPasses = resu[0]["Num"];
			//check number to return suitable code
			if (resu[0]["Num"] == 0) code = 402;
		});
		//query for passes per station given stationID and dates
		let myquery="SELECT passID, stationID, timestamp as PassTimestamp, vehicleID, tag_provider as TagProvider, pass_type as PassType, amount as PassCharge FROM passes, tags WHERE passes.tagID = tags.tagID and stationID ="+"'"+req.params.stationID+"'"+" and timestamp >="+"'"+req.params.date_from+"'"+" and timestamp <="+"'"+req.params.date_to+"'"+"order by timestamp";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;
			test.PassesList = result;
			for (i=0; i<test.PassesList.length; i++)
				test.PassesList[i].PassIndex = i+1;
			if (l=="csv"){
			converter.json2csv(test, function(err, csv){
				if (err) throw err;
			        res.send(csv);
			});}
			else {
				if (code == 402) res.status(402).send(test);
				else res.send(test);}
		});
	});
}

router.get('/interoperability/api/PassesPerStation/:stationID/:date_from/:date_to',getpassespsData);
module.exports = router;
