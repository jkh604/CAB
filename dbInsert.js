var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var dbLink=require("./json/config.json");
var url= dbLink.devServer.url;

MongoClient.connect(url, function(err, db) {
	//function(err, db) : call back funtion : after we connect the server this server runs
	assert.equal(null, err);
	//check whether there is error or not. asser keeps silence if equa() return true
	var collection=db.collection('Users');
	collection.insert(
		{email:"jkh604@yahoo.com", pwd:"Password!123"},
		function(err, result) {
			assert.equal(null, err);
			console.log("Success: "+result.insertedCount);
			db.close();
		});
});