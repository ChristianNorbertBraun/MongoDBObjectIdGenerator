var bodyParser = require('body-parser');
var ObjectID = require("bson-objectid");
var express = require('express');
var app = express();


 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({
     extended: true
 }));

app.post("/json",function(req,res){
	var searchIndex = req.query["search"];

	for(var i = 0; i < req.body.length; ++i){
		var current = req.body[i];
		current[searchIndex] = "XXXX" + ObjectID();
	}
	
	res.send(req.body);
});

app.get("/objectid",function(req,res){
	res.send(ObjectID());
});

app.get("/", function(req,res){
	res.sendfile("webapp/index.html");
});

/* serves all the static files */
app.get(/^(.+)$/, function (req, res) {
    console.log('static file request : ' + req.params);
    res.sendfile(__dirname + "/webapp" + req.params[0]);
});


app.listen(8080, function(){
	console.log("Server runs on " + 8080);
});