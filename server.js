var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('recipedia', ['recipedia']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// List recipes on front page
app.get('/recipedia', function (req, res) {
	console.log("I received a GET request");

	db.recipedia.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	})
});

// Add recipe to db
app.post('/recipedia', function (req, res) {
	console.log(req.body);
	db.recipedia.insert(req.body, function (err, doc) {
		res.json(doc);
	});
});

// Update upvotes for Recipe
app.get('/recipedia/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.recipedia.findAndModify({query: { _id: mongojs.ObjectId(id)},
		update: {$inc: {upvotes: 1}},
		new: true}, function(err, doc) {
			res.json(doc);
		});
});


/**

app.delete('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({ _id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.get('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({ _id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc); 
	});
});

app.put('/contactlist/:id', function (req, res) {
	var id = req.params.id;
	console.log(req.body.name);
	db.contactlist.findAndModify({query: { _id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function (err, doc) {
			res.json(doc);
		});
}); */

app.listen(3000);
console.log("Server running on port 3000");