var express=require("express");
var http=require("http");
var path=require("path");
var db = require('./db');
var dbLink=require("./json/config.json");
var url = dbLink.devServer.url;
var bodyParser = require('body-parser');
var publicPath=path.resolve(__dirname,"public"); //Double Underscore Direct Name: Figures out Absolute Path of the Public Folder
												 //For My Public: The Absolute Path c:\users\username\Project2\public
//var mongoose = require('mongoose').createConnection('mongodb://localhost:27017/CABdb');
//var Schema = mongoose.Schema;
//var mon = mongoose.createConnection('mongodb://localhost:27017/CABdb');
var app=express();

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(require('./routers/signupServer'));
app.use(require('./routers/getUsers'));

db.connect(url, function(err) {
	if (err) {
		console.log('Unable to connect to Mongo.');
		process.exit(1)
	}
	else 
	{
		var listener=http.createServer(app).listen(process.env.PORT||27017);
		console.log('Server is listening at port '+listener.address().port);
	}
});

//Handle get request from the browser
app.get('/',function(req, res)
	{
		//req: Request from the Browser
		//res: Response from the Server to the Browser
		//res.send("<h2> Welcome to our first server!</h2>");
		console.log("A Website Request")
		res.sendFile(`${publicPath}/UserHomepage.html`);
	});

app.get('/events',function(req, res) {
		//req: Request from the Browser
		//res: Response from the Server to the Browser
		console.log("a request for Events!"); //Print Log on Server
		res.sendFile(`${publicPath}/Events.html`);
	});

app.get('/contact',function(req, res) {
		//req: Request from the Browser
		//res: Response from the Server to the Browser
		console.log("a request for contact info!"); //Print Log on Server
		res.sendFile(`${publicPath}/Contact.html`);
	});

app.get('/login',function(req, res) {
		//req: Request from the Browser
		//res: Response from the Server to the Browser
		console.log("a request to sign in!"); //Print Log on Server
		res.sendFile(`${publicPath}/login.html`);
	});

app.get('/pictures',function(req, res) {
		//req: Request from the Browser
		//res: Response from the Server to the Browser
		console.log("a request for Pictures!"); //Print Log on Server
		res.sendFile(`${publicPath}/Pictures.html`);
	});

app.get('/poll',function(req, res) {
		//req: Request from the Browser
		//res: Response from the Server to the Browser
		console.log("a request to vote!"); //Print Log on Server
		res.sendFile(`${publicPath}/Poll.html`);
	});

app.get('/signup', function (req, res) {
	console.log("Coming a signup request!");
	res.sendFile(`${publicPath}/signup.html`);
});

/*
mongoose.model('users', {username: String}, 'users');

app.get('/users', function(req, res) {
	console.log(mongoose.connection.readyState);
	mongoose.model("users").find(function(err, results) {
		res.send(results);
	});
});  

app.use( function(req, res, next){
		//Next: Is callback function after this function is done
		res.type("text/plain");
		res.status(404);
		res.send("404 Error: Not Found");
	});
*/