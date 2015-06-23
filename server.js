var express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	Firebase = require('firebase'),
	app = express(),
	port = 8888;

var config = require('./config');
var accountSid = config.twilio.accountSid;
var authToken = config.twilio.authToken;
var twilio = require('twilio')(accountSid, authToken);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var ref = new Firebase('https://textsupport01.firebaseIO.com/numbers');

app.get('/support/resources/:resource_name', function(req, res){
	console.log(req.param('resource_name'))
	switch (req.param('resource_name')) {
		case 'terms-and-conditions':
			res.sendFile(__dirname+ '/public/FakeTermsandConditions.pdf');
			break; 
		case 'cease-and-desist':
			res.sendFile(__dirname + '/public/FakeCeaseandDesist.pdf');
			break;
			console.log('sent')
		case 'helpful-infographic':
			res.sendFile(__dirname + '/public/helpful-infographic.jpg');
			break;
		default:
			res.sendFile(__dirname + '/public/404.html')
	}
})

app.post('/support/messages/', function(req, res){
	var text = {
		body: req.body.message,
	    to: "+" + req.body.to,
	    from: "+13238157129",
	    date_sent: new Date().toString()
	}
	// twilio.sendMessage(text, function(err, message) {
	//     if (err) {
	//       console.error(err);
	//       return;
	//     } else console.log('no twilio send error');
	//     console.log('trying to save ', text, ' to firebase', req.body.to);
	//     ref.child('/' + req.body.to).push(text);
	//     process.stdout.write(message.sid);
	// })
		twilio.sendMessage(text, function(err, message) {
	    	if(!err){
	    		ref.child('/' + req.body.to).push(text);
	    		process.stdout.write(message.sid);
	    	} else{
	    		console.error(err);
	    		return;
	    	}
	})
	res.end()
})



// app.get('/support/resources/:resource_name', function(req, res){
// 	if(url.params.resource_name === )
// })


app.listen(port, function(){
	console.log("I'm listening on " + port);
})


// ref.child('/'+req.body.to).push(message);