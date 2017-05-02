var express = require('express');
router = express.Router();
var db = require('../db');
router.get('/getuserItems', function(req, res) {
	var collection = db.getDb().collection('users');
	res.setHeader('Content-Type', 'application/json');
	collection.find().toArray(function(err, docs) {
		var info=[];
		for(doc of docs)
			info.push(doc);
		res.json(info);
	//   res.render('menu', {menu: docs})
})});
module.exports = router;