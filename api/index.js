const express = require('express')
const app = express(); //instantiate an express app
const port = 9103;
const bodyparser = require('body-parser')
var path = require('path');

// =============="npm i cors"=============
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000'
}))
//========================================

//middlewares
app.use(bodyparser.json())

//initialize port for node application to run
app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});

//GET base URL path
app.get('/interoperability/api/',(req,res) =>{
	res.sendFile(path.join(__dirname + '/index.html'));
});

//POST delete passes
app.post('/interoperability/api/admin/resetpasses',(req,res) =>{
        var mysql = require('mysql');

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"softeng2131"
	});
        
	var suc={
		"status" : "OK",
	}
	var fail={
		"status" : "failed",
	}
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		//query to delete values
		let myquery="DELETE FROM passes";
		con.query(myquery, function (err, result, fields){
			if (err) res.send(fail);
			else res.send(suc);
		});
	});
});

//POST reset stations
app.post('/interoperability/api/admin/resetstations',(req,res) =>{
        var mysql = require('mysql');

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"softeng2131"
	});
        
	var suc={
		"status" : "OK",
	}
	var fail={
		"status" : "failed",
	}
	var test = req.body
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		//query to delete values
		let myquery="DELETE FROM stations";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;
		});
		//res.send(test);
		//query to insert new values into stations
		let myquery1="INSERT INTO stations VALUES?";
		let values = [];
		for (let i=0; i<test.length; i++){
			values.push([test[i].stationID, test[i].station_name])
		}
		con.query(myquery1, [values], (err, result) =>{
			if (err) res.send(fail);
			else res.send(suc);
	});
	});
});

//POST reset vehicles
app.post('/interoperability/api/admin/resetvehicles',(req,res) =>{
        var mysql = require('mysql');

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "panoplos",
		database:"softeng2131"
	});
        
	var suc={
		"status" : "OK",
	}
	var fail={
		"status" : "failed",
	}
	var test = req.body
	con.connect(function(err) {
		if (err) throw err;
		console.log("Connected!");
		//query to delete values
		let myquery="DELETE FROM vehicles";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;
		});
		//res.send(test);
		//query to insert new values into vehicles
		let myquery1="INSERT INTO vehicles VALUES?";
		let values = [];
		for (let i=0; i<test.length; i++){
			values.push([test[i].vehicleID, test[i].license_year])
		}
		con.query(myquery1, [values], (err, result) =>{
			if (err) res.send(fail);
			else res.send(suc);
	});
	});
});


//path for endpoints scripts
const health=require("./endpoints/check.js");
const badhealth=require("./endpoints/badcheck.js");
const passesperstation=require("./endpoints/passesps.js");
const passesanalysis=require("./endpoints/passesa.js");
const passescost=require("./endpoints/passesc.js");
const chargesby=require("./endpoints/chargesb.js");

app.use('/',health);
app.use('/',badhealth);
app.use('/',passesperstation);
app.use('/',passesanalysis);
app.use('/',passescost);
app.use('/',chargesby);
