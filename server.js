var bodyParser = require('body-parser');
var ObjectID = require("bson-objectid");
var express = require('express');
var app = express();

var modifiers = ["private", "public", "protected", "static", "final"];

var isModifier = function(string){
	return modifiers.indexOf(string.trim()) > -1;
};

var convertString = function(string){
	var finalString = "";
	for(var i = 0; i < string.length; ++i){
		var currentChar = string[i];
		if(currentChar == currentChar.toUpperCase()){
			finalString +="_" + currentChar.toUpperCase();
		}
		else{
			finalString +=currentChar.toUpperCase();
		}
	}
	return finalString;
}

 app.use(bodyParser.json());
 app.use(bodyParser.text());
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

app.post("/attributes", function(req, res){
	var cleanedData = req.body.replace(/;/g, "");
	var cleanedData = cleanedData.replace(/\/+.*\n|\/\*+.*\n|\*+.*\n|\@+.*\n/g, "");
	var cleanedData = cleanedData.trim();
	var values = cleanedData.split(/\s+\n*/);

	for(var i = 0; i < values.length; ++i){
		if(isModifier(values[i])){
			values.splice(i,1);
			--i;
		}
	}

	var result = "public static interface Fields{\n";
	for(var i = 0; i < values.length; ++i ){
		if(i % 2 == 1){
			result += "\tString " + convertString(values[i]) + " = " + "\"" + values[i] + "\";\n"; 
			convertString(values[i]);			
		}
	}
	result += "}";
	res.send(result);
})

app.get("/", function(req,res){
	res.sendfile("webapp/index.html");
});

/* serves all the static files */
app.get(/^(.+)$/, function (req, res) {
    console.log('static file request : ' + req.params);
    res.sendfile(__dirname + "/webapp" + req.params[0]);
});


app.listen(8000, function(){
	console.log("Server runs on " + 8000);
});


