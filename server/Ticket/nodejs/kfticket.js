var express = require('express');
var http = require('http');
var app = express();
app.use(express.cookieParser());
app.use(express.static(__dirname + '/../../..'));
app.get('/kfticket', function (req, res) {
    // Replace the VisStedet login information with your own login
	// Fetch a ticket from Kortforsyningen, using your organization's login
    http.get('http://kortforsyningen.kms.dk/service?request=GetTicket&login=VisStedet&password=VisStedet', function (response) {
        var str = ''
        response.on('data', function (chunk) {
            str += chunk;
        });
        response.on('end', function () {
            res.cookie('kfticket',str);
            res.send();
        });
    }).on('error', function (e) {
        console.log("Got error: " + e.message);
    });
});
app.listen(3000);
console.log('Listening on port 3000');