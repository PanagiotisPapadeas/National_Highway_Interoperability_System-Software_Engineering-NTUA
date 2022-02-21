const express = require('express');
const router = express.Router();
const converter = require('json-2-csv');
var mysql = require('mysql');

//GET method for passes cost
function getpassescData(req,res){
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"softeng2131"
	});

	//JSON object to return
	var test = { 

	};
	test.op1_ID = req.params.op1_ID;
	test.op2_ID = req.params.op2_ID;
	test.PeriodFrom = req.params.date_from;
	test.PeriodTo = req.params.date_to;
	//Json or csv
        var l = req.query.format;
	//status code
        var code;

	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		//query to return cost given op1ID, op2ID and dates
		let myquery="SELECT count(*) as Num, sum(amount) as PassesC from passes where operatorID1="+"'"+req.params.op1_ID+"'"+" and operatorID2="+"'"+req.params.op2_ID+"'"+" and timestamp >="+"'"+req.params.date_from+"'"+" and timestamp <="+"'"+req.params.date_to+"'";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;

			//get request timestamp
	                var today = new Date();
			var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
			var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds();
			var dateTime = date+' '+time;
			test.RequestTimestamp = dateTime;
			test.NumberOfPasses = result[0]["Num"];
			//check number to return suitable code
			if (result[0]["Num"]==0) code = 402;
			if (test.op1_ID == test.op2_ID) test.PassesCost = 0;
			else test.PassesCost = result[0]["PassesC"];
			if (l=="csv"){
			converter.json2csv(test, function(err, csv){a
				if (err) throw err;
			        res.send(csv);
			});}
			else {
                                if (code==402) res.status(402).send(test);
				else res.send(test);}
		});
	});
}

router.get('/interoperability/api/PassesCost/:op1_ID/:op2_ID/:date_from/:date_to',getpassescData);
module.exports = router;
