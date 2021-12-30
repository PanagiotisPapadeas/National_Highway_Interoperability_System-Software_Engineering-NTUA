const express = require('express');
const router = express.Router();
//const converter = require('json-2-csv');
var mysql = require('mysql');

function getpassescData(req,res){
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database:"db_softeng_2131"
	});

	var test = { 

	};
	test.op1_ID = req.params.op1_ID;
	test.op2_ID = req.params.op2_ID;
	test.PeriodFrom = req.params.date_from;
	test.PeriodTo = req.params.date_to;


	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		let myquery="SELECT count(*) as NumberOfPasses, sum(amount) as PassesCost from passes where operatorID1="+"'"+req.params.op1_ID+"'"+" and operatorID2="+"'"+req.params.op2_ID+"'"+" and timestamp >="+"'"+req.params.date_from+"'"+" and timestamp <="+"'"+req.params.date_to+"'";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;
			test.NumberOfPasses = result.NumberOfPasses;
			test.PassesCost = result.PassesCost;
			//converter.json2csv(test, function(err, csv){a
			//	if (err) throw err;
			//        res.send(csv);
			//});
	                res.send(test);
		});
	});
}

router.get('/PassesCost/:op1_ID/:op2_ID/:date_from/:date_to',getpassescData);
module.exports = router;
