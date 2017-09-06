// Practice Node.js and MySQL app 
// John Stone
// 11/1/16


var express = require('express'); 
var app = express();

/******************/
// Set up Database
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'breakable',
	password: 'password',
	database: 'sql_injection'
});


connection.query('DROP TABLE IF EXISTS demo_table', function(err) {
	if(err) console.log("ERROR: ", err);
});

var create_table = 'CREATE TABLE demo_table ( name varchar(255), password varchar(255), email varchar(255))';

connection.query( create_table, function(err) {
	if (!err)
		console.log("demo_table successfully created");
	else 
		console.log("ERROR: ", err)
});

var populate_table = "INSERT INTO demo_table VALUES ('Joe', 'pa', 'joe@gmail.com'), ('Jeremey', 'abc123', 'jj999@yahoo.com'), ('Kyle', 'nsjcndl', 'kyle@gmial.com');"

connection.query( populate_table, function(err){
	if (!err)
		console.log("Table successfully populated");
	else 
		console.log("ERROR: ", err);
});

/****************/


//////
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extend: true }));

/*
connection.query('SELECT * from employee', function(err, rows, fields){
	if (!err) console.log('The solution is: ', rows); else 
		console.log('Error while performing Query.');
});
*/
	

/*************/
// Binding express app to port 3000
app.listen(3000, function(){
	console.log('Node server running @ http://162.210.88.93:3001');
});
/*************/


/**********/
// Set up file system
app.use('/node_modules', express.static(__dirname + '/node_modules'));

app.use('/style', express.static(__dirname + '/style'));
/********/



/*************/
// Get requests
app.get('/', function(req, res){
	res.sendFile('home.html', {'root': __dirname + '/templates'});
});

// SQL Injections
app.get('/vulnerable', function(req, res){
	res.sendFile('vulnerable.html', {'root': __dirname + '/templates'});
});

app.get('/prepared', function(req, res){
	res.sendFile('prepared.html', {'root': __dirname + '/templates'});
});

app.get('/loggedin', function(req, res){
	res.sendFile('loggedin.html', {'root': __dirname + '/templates'});
});

app.get('/vulnerable_fail', function(req, res){
	res.sendFile('vulnerable_fail.html', {'root': __dirname + '/templates'});
});

app.get('/prepared_fail', function(req, res){
	res.sendFile('prepared_fail.html', {'root': __dirname + '/templates'});
});

// Password Cracking
app.get('/vulnerable_pass', function(req, res){
	res.sendFile('vulnerable_pass.html', {'root': __dirname + '/templates'});
});

app.get('/vulnerable_pass_fail', function(req, res){
	res.sendFile('vulnerable_pass_fail.html', {'root': __dirname + '/templates'});
});

app.get('/captcha', function(req, res){
	res.sendFile('captcha.html', {'root': __dirname + '/templates'});
});

/// SSI

app.get('/test', function(req, res){
	res.sendFile('test.shtml', {'root': __dirname + '/templates'});
});





/*
app.get('/getDatabase', function(req, res){
	console.log("test getting db info");
	connection.query('SELECT * FROM demo_table', function(err, results) {
		var string = JSON.stringify(results);
		res.json(string);
	});
	console.log("sent json info");
});
*/
	

/*****************/

// Verify User function
// VULNERABLE
app.post('/vulnerable_verifyuser', function(req, res){
	console.log('checking user in database');
	console.log(req.body.name);
	var selectString = 'SELECT * FROM demo_table WHERE email="'+req.body.email+'" AND password="'+req.body.password+'" ';
	console.log(selectString);

	connection.query(selectString, function(err, results) {
		console.log(results);
		var string = JSON.stringify(results);
		
		console.log(string);
		if (string === '[{"COUNT(name)":1}]') {
			res.redirect('/loggedin');
		}
		if (string === '[{"COUNT(name)":0}]') {
			res.redirect('/showSignInPageretry');
		}
		if (string != '[]'){
			res.redirect('/loggedin');
		} else {
			res.redirect('/vulnerable_fail');
		}
	});
});


/*****************/

// Verify User function
// PREPARED STATEMENTS
app.post('/prepared_verifyuser', function(req, res){
	console.log('checking user in database');
	console.log(req.body.email);
	var selectString = 'SELECT * FROM demo_table WHERE email = ? AND password = ?';
	console.log(selectString);

	connection.query(selectString, [req.body.email, req.body.password], function(err, results) {
		console.log(results);
		var string = JSON.stringify(results);
		
		console.log(string);
		if (string === '[{"COUNT(name)":1}]') {
			res.redirect('/loggedin');
		}
		if (string === '[{"COUNT(name)":0}]') {
			res.redirect('/showSignInPageretry');
		}
		if (string != '[]'){
			res.redirect('/loggedin');
		} else {
			res.redirect('/vulnerable_fail');
		}
	});
});


// Password Vulnerable
app.post('/vulnerable_pass_verifyuser', function(req, res){
	console.log('checking user in database');
	console.log(req.body.name);
	var selectString = 'SELECT * FROM demo_table WHERE email="'+req.body.email+'" AND password="'+req.body.password+'" ';
	console.log(selectString);

	connection.query(selectString, function(err, results) {
		console.log(results);
		var string = JSON.stringify(results);
		
		console.log(string);
		if (string === '[{"COUNT(name)":1}]') {
			res.redirect('/loggedin');
		}
		if (string === '[{"COUNT(name)":0}]') {
			res.redirect('/showSignInPageretry');
		}
		if (string != '[]'){
			res.redirect('/loggedin');
		} else {
			res.redirect('/vulnerable_fail');
		}
	});
});


var count = 0;

// Password Vulnerable
app.post('/captcha_verifyuser', function(req, res){
	console.log('checking user in database');
	console.log(req.body.name);
	var selectString = 'SELECT * FROM demo_table WHERE email="'+req.body.email+'" AND password="'+req.body.password+'" ';
	console.log(selectString);

	connection.query(selectString, function(err, results) {
		console.log(results);
		var string = JSON.stringify(results);
		
		console.log(string);
		if (string === '[{"COUNT(name)":1}]') {
			res.redirect('/loggedin');
		}
		if (string === '[{"COUNT(name)":0}]') {
			res.redirect('/showSignInPageretry');
		}
		if (string != '[]'){
			count = 0;
			res.redirect('/loggedin');
		} else {
			count++;
			if (count > 3){
				res.redirect('/');
			} else {	
			 	res.redirect('/vulnerable_fail');
			}
		}
	});
});
