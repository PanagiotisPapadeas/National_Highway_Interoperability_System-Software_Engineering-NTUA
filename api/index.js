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


