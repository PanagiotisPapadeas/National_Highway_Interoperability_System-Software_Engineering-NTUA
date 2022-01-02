const express = require('express');
const router = express.Router();
var mysql = require('mysql');

function health(req,res){
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database: "softeng2131"
	});

	con.connect(function(err) {
		if (err) res.status(400).send("Not Connected");
		else {
			console.log("Connected!");
		res.status(200).send("Connected");
		}
	});
}

router.get('/interoperability/api/admin/healthcheck',health);
module.exports = router;
