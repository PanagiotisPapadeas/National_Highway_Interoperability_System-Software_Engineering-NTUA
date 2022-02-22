const express = require('express');
const router = express.Router();
var mysql = require('mysql');

//GET method to check connectivity
function health(req,res){
	//connect to database
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database: "softeng2131"
	});
	var test = {
	        "status":"OK",
		"dbconnection":"database softeng2131 connected"
	}
	var test2 = {
		"status":"failed",
		"dbconnection":"database softeng2131 not connected"
	}
         
	//check if connection was successful
	con.connect(function(err) {
		if (err) {console.log("Not Connected!");
			res.status(400).send(test2);}
		else {
			console.log("Connected!");
		res.status(200).send(test);
		}
	});
}

router.get('/interoperability/api/admin/healthcheck',health);
module.exports = router;
