'use strict';
var MongoClient = require('mongodb').MongoClient;
var CABdb=null;
var url = 'mongodb://localhost/CABdb';
var mongoose = require('mongoose');
var demoSchema = new mongoose.Schema({
    name:String
});
var hello = mongoose.model('CABdb', demoSchema);
mongoose.connect('localhost', 'test');


exports.connect = function(url, callback) {
	if (CABdb) 
		return callback();
	MongoClient.connect(url, function(err, db) {
		if (err) return callback(err);
			CABdb = db;
		callback();
	})
}

exports.close = function(callback) {
	if (CABdb) {
		CABdb.close(function(err, result)	{
			CABdb = null;
			callback(err)
		});
}};

exports.getDb = function() {
	return CABdb;
}

exports.showUser = function (req, res) {
    hello.find({},function (err, results) {
        res.render('showUser', { 'title':'Results', 'results':results, message:'' });
    });
};