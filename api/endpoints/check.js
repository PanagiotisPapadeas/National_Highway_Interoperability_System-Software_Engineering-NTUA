const express = require('express');
const router = express.Router();
var mysql = require('mysql');

function health(req,res){
	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database:""
	});

	con.connect(function(err) {
		if (err) throw(err);
		console.log("Connected!");
		res.status(200).send("Connected");
	});
}

router.get('/admin/healthcheck',health);
module.exports = router;
