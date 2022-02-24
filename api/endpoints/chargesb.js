const express = require('express');
const router = express.Router();
const converter = require('json-2-csv');
var mysql = require('mysql');

//GET method for charges by
function getchargesbyData(req,res){
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"softeng2131"
	});
        
	//JSON object to return
	var test = { 

	};
	test.op_ID = req.params.op_ID;
	test.PeriodFrom = req.params.date_from;
	test.PeriodTo = req.params.date_to;
	//Json or csv
        var l = req.query.format;

	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		//query to get charges by data given opID and dates
		let myquery="SELECT operatorID2 as VisitingOperator, count(*) as NumberOfPasses, sum(amount) as PassesCost FROM passes WHERE pass_type = 'visitor' and operatorID1="+"'"+req.params.op_ID+"'"+" and timestamp >="+"'"+req.params.date_from+"'"+" and timestamp <="+"'"+req.params.date_to+"'"+" group by operatorID2 order by operatorID2";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;

			//get request timestamp
	                var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
			var dateTime = date+' '+time;
			test.RequestTimestamp = dateTime;

			test.PPOList = result;
			if (l=="csv"){
			converter.json2csv(test, function(err, csv){
				if (err) throw err;
			        res.send(csv);
			});}
			else {res.send(test);}
		});
	});
}

router.get('/interoperability/api/ChargesBy/:op_ID/:date_from/:date_to',getchargesbyData);
module.exports = router;
