	// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
//const { json } = require("express");


// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
// Setup Server
const port = 8000;
const server = app.listen(port,listening);
function listening(){
	console.log('server is running');
	console.log(`running on locaolhost:$(port)`);
};
// posting rout
const data = [];
app.post('/addData', addData);
function addData(req,res){
	projectData['temp']= req.body.temp;
	projectData['date']= req.body.date;
	projectData['content'] = req.body.content;
	res.send(projectData);

};
// returns the projectData object
app.get('/addData', sendData);
function sendData (req, res) {
res.send(projectData)
};

