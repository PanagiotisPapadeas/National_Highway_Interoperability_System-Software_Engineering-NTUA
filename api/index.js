const express = require('express')
const app = express(); //instantiate an express app
const port = 9103;
//const bodyparser = require('body-parser')
var path = require('path');

//middlewares
//app.use(bodyparser.json())

//initialize port for node application to run
app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});

//get example
app.get('/interoperability/api/',(req,res) =>{
	res.sendFile(path.join(__dirname + '/index.html'));
});
app.post('/interoperability/api/admin/resetpasses',(req,res) =>{
        var mysql = require('mysql');

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database:"db_softeng_2131"
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
		let myquery="DELETE FROM passes";
		con.query(myquery, function (err, result, fields){
			if (err) res.send(fail);
			else res.send(suc);
		});
	});

});
app.post('/interoperability/api/admin/resetstations',(req,res) =>{
        var mysql = require('mysql');

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database:"db_softeng_2131"
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
		let myquery="DELETE FROM stations";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;
		});
		let myquery1="INSERT INTO stations VALUES?";
		let values = [];
		for (let i=0; i<test.length; i++){
			values.push([test[i].id, test[i].title, test[i].author, test[i].price])
		}
		con.query(myquery1, [values], (err, result) =>{
			if (err) res.send(fail);
			else res.send(suc);
	});
	});
});
app.post('/interoperability/api/admin/resetvehicles',(req,res) =>{
        var mysql = require('mysql');

	var con = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database:"db_softeng_2131"
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
		let myquery="DELETE FROM vehicles";
		con.query(myquery, function (err, result, fields){
			if (err) throw err;
		});
		let myquery1="INSERT INTO vehicles VALUES?";
		let values = [];
		for (let i=0; i<test.length; i++){
			values.push([test[i].id, test[i].title, test[i].author, test[i].price])
		}
		con.query(myquery1, [values], (err, result) =>{
			if (err) res.send(fail);
			else res.send(suc);
	});
	});
});



const health=require("./endpoints/check.js");
const passesperstation=require("./endpoints/passesps.js");
const passesanalysis=require("./endpoints/passesa.js");
const passescost=require("./endpoints/passesc.js");
const chargesby=require("./endpoints/chargesb.js");

app.use('/',health);
app.use('/',passesperstation);
app.use('/',passesanalysis);
app.use('/',passescost);
app.use('/',chargesby);
