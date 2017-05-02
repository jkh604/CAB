var express = require('express'), 
 router = express.Router();
 var db = require('../db');
 var ObjectId = require('mongodb').ObjectID;
 var bodyParser=require("body-Parser");
 router.use(bodyParser.urlencoded({extended: true}));
 router.use(bodyParser.json());
 router.post('/signupServer', function(req, res) {
 	username= req.body.username;
 	password = req.body.pwd;
 	var collection = db.getDb().collection("users");
 	collection.insert({"username": username, "password": password}, function(err, document) {
 		if (err !== null)
 			res.send(false);
 		else
 			res.send(true);
 	}
)});
module.exports = router;