const express = require('express')
const app = express(); //instantiate an express app
const port = 9103;
const bodyparser = require('body-parser')

//middlewares
app.use(bodyparser.json())

//initialize port for node application to run
app.listen(port, () => {
	console.log(`Example app listening on port ${port}!`);
});

//get example
app.get('/',(req,res) =>{
	res.send("hello world")
})

//post example
app.post('/checkParser', (req, res) => {
	console.log("Using Body-parser: ", req.body.value)
	res.send({"body":req.body})
})

