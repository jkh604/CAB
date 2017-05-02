var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var asset = require('assert');

var dbLink=require("../json/config.json");
var url = dbLink.devServer.url;

router.get('/getUsers', function(req, res, next) {
	var resultArray = [];
	mongo.connect(url, function(err, db)
	{
		assert.equal(null, err);
		var cursor = db.collection('users').find();
		cursor.forEach(function(doc, err) 
		{
			assert(null, err);
			resultArray.push(doc);
		}, function() {
			db.close();
			res.render('index', {items: resultArray})
		});
	});
});
module.exports = router;