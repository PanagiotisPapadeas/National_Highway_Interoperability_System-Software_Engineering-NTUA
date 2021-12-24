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

const health=require("./endpoints/check.js");
//const resetpasses=require("./endpoints/resetp.js");
//const resetstations=require("./endpoints/resets.js");
//const resetvehicles=require("./endpoints/resetv.js");
//const passesperstation=require("./endpoints/passesps.js");
//const passesanalysis=require("./endpoints/passesa.js");
//const passescost=require("./endpoints/passesc.js");
//const chargesby=require("./endpoints/chargesb.js");

//app.use('/',health);
//app.use('/',resetpasses);
//app.use('/',resetstations);
//app.use('/',resetvehicles);
//app.use('/',passesperstation);
//app.use('/',passesanalysis);
//app.use('/',passescost);
//app.use('/',chargesby);
