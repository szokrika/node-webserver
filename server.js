var express = require('express');
var hbs = require('hbs');
var fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		console.log('Unable to write to server.log.');
	});
	next();
});
	
//if maintenance mode
// app.use((req, res) => {
// 	res.render('maintenance.hbs');
// });
//end maintenance mode

app.use(express.static(__dirname + '/public'));

//handlebar helpers
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

//routes
app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle : 'Home Page',
		welcomeMessage: 'Welcome to my website',
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle : 'About Page',
	});
});

app.listen(3000);
console.log('Server is listening to port 3000');