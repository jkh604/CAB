var http = require("http");
var server = http.createServer(function(req, res) {
	res.writeHead(200, {"content-Type":"text/plain"});
	res.end("Oh shit waddup");
})

app.get('/event' function(req, res)
{
	console.log("Someone wants to see the events!");
	res.send("A request for events");
});

app.listen(3000, function() {
	console.log("Server listening on port 3000");
});